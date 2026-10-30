import { Component, ElementRef, OnDestroy, OnInit, computed, effect, inject, input, signal, viewChild } from '@angular/core';
import { type MediaKind, type MediaTarget, type Playback, youtubeId } from '@quiz/shared';
import { GameService } from '../core/game.service';
import { Expandable } from './expandable';

/** Abweichung, ab der ein Client auf die Admin-Position nachspringt. */
const MAX_DRIFT_SEC = 1.5;
const SYNC_INTERVAL_MS = 500;
/** So viel soll vor dem gemeinsamen Start vorgeladen sein. */
const BUFFER_SEC = 8;
/** Lokales Limit; es liegt unter dem des Servers, damit der Client sich noch sauber zurückmeldet. */
const PREPARE_LIMIT_MS = 7000;
const END_MARGIN_SEC = 0.3;
const WAVE_AMPLITUDE = 3;
const YT_ENDED = 0;
const YT_PLAYING = 1;
const YT_BUFFERING = 3;

interface YtPlayer {
  playVideo(): void;
  pauseVideo(): void;
  stopVideo(): void;
  seekTo(seconds: number, allowSeekAhead: boolean): void;
  mute(): void;
  unMute(): void;
  isMuted(): boolean;
  getCurrentTime(): number;
  getDuration(): number;
  getPlayerState(): number;
  getVideoLoadedFraction(): number;
  destroy(): void;
}

declare global {
  interface Window {
    YT?: { Player: new (element: HTMLElement, options: object) => YtPlayer };
    onYouTubeIframeAPIReady?: () => void;
  }
}

let youtubeApi: Promise<void> | null = null;

function loadYoutubeApi(): Promise<void> {
  youtubeApi ??= new Promise((resolve) => {
    window.onYouTubeIframeAPIReady = resolve;
    const script = document.createElement('script');
    script.src = 'https://www.youtube.com/iframe_api';
    document.head.append(script);
  });
  return youtubeApi;
}

/**
 * Spielt ein Medium synchron bei allen Teilnehmern ab. Niemand bedient den Player direkt:
 * Der Admin schickt Befehle an den Server, und alle Clients folgen dem Playback-Zustand.
 * Vor dem Start puffern alle stumm hinter dem Platzhalter und melden sich beim Server.
 */
@Component({
  selector: 'app-media-player',
  hostDirectives: [Expandable],
  template: `
    @if (kind() === 'video') {
      <div class="area">
        <div class="video">
          <div #youtube></div>
          <div class="shield"></div>
          @if (covered()) {
            <div class="cover">
              @if (preparing()) {
                <span class="spinner"></span>
                <span>Video lädt bei allen ...</span>
              } @else {
                Video
              }
            </div>
          }
          <button class="big-toggle" (click)="expand.toggle()">{{ expand.big() ? 'Klein' : 'Groß' }}</button>
        </div>
      </div>
    } @else {
      <audio #audio [src]="src()" preload="auto"></audio>
      <div class="wave">
        <canvas #wave></canvas>
        @if (preparing()) {
          <div class="wave-state">
            <span class="spinner"></span>
            <span>Audio lädt ...</span>
          </div>
        }
      </div>
    }
    @if (game.isAdmin()) {
      <div class="controls">
        @if (preparing()) {
          <button disabled>Lädt {{ playback()?.readyCount }}/{{ playback()?.expectedCount }}</button>
        } @else if (playing()) {
          <button (click)="game.act({ type: 'mediaPause' })">Pause</button>
        } @else {
          <button class="primary" (click)="play(active() ? position() : 0)">{{ kind() === 'video' ? 'Video' : 'Audio' }} abspielen</button>
        }
        <button [disabled]="preparing()" (click)="play(0)">Von vorne</button>
        <input
          type="range"
          min="0"
          aria-label="Position"
          [max]="duration()"
          [value]="position()"
          [disabled]="!active() || preparing()"
          (change)="seek($event)"
        />
        <span>{{ time(position()) }} / {{ time(duration()) }}</span>
      </div>
    }
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      gap: 0.3rem;
      height: 100%;
      min-height: 0;
      min-width: 0;
    }
    .area {
      container-type: size;
      flex: 1;
      min-height: 0;
    }
    .video {
      aspect-ratio: 16 / 9;
      background: #000;
      margin: 0 auto;
      position: relative;
      width: min(100cqw, 100cqh * 16 / 9);
    }
    .video ::ng-deep iframe,
    .shield,
    .cover {
      height: 100%;
      inset: 0;
      position: absolute;
      width: 100%;
    }
    /* Der Player bleibt dahinter in voller Größe, sonst wählt YouTube eine schlechte Qualität. */
    .cover {
      align-items: center;
      background: #0b0906;
      border: 1px solid var(--line);
      color: var(--gold-strong);
      display: flex;
      font-size: 1.4em;
      gap: 0.6rem;
      justify-content: center;
    }
    .wave {
      background: #0b0906;
      border: 1px solid var(--line);
      flex: 1;
      min-height: 0;
      position: relative;
    }
    .wave canvas {
      height: 100%;
      inset: 0;
      position: absolute;
      width: 100%;
    }
    .wave-state {
      align-items: center;
      color: var(--gold-strong);
      display: flex;
      font-size: 1.4em;
      gap: 0.6rem;
      inset: 0;
      justify-content: center;
      position: absolute;
    }
    .controls {
      align-items: center;
      display: flex;
      flex: none;
      gap: 0.4rem;
    }
    .controls input {
      flex: 1;
      padding: 0;
    }
    .controls span {
      white-space: nowrap;
    }
  `,
})
export class MediaPlayer implements OnInit, OnDestroy {
  protected readonly game = inject(GameService);
  protected readonly expand = inject(Expandable);
  private readonly youtubeRef = viewChild<ElementRef<HTMLElement>>('youtube');
  private readonly audioRef = viewChild<ElementRef<HTMLAudioElement>>('audio');
  private readonly waveRef = viewChild<ElementRef<HTMLCanvasElement>>('wave');

  readonly src = input.required<string>();
  readonly kind = input.required<MediaKind>();
  readonly target = input.required<MediaTarget>();

  protected readonly position = signal(0);
  protected readonly duration = signal(0);

  protected readonly playback = computed(() => {
    const playback = this.game.run()?.playback;
    return playback?.target === this.target() && playback.kind === this.kind() ? playback : null;
  });
  protected readonly active = computed(() => this.playback() !== null);
  protected readonly preparing = computed(() => this.playback()?.preparing ?? false);
  protected readonly playing = computed(() => this.playback()?.playing ?? false);
  protected readonly covered = computed(() => !this.active() || this.preparing());

  private youtube: YtPlayer | null = null;
  private youtubeReady = false;
  private stopped = true;
  private preparedId: string | null = null;
  private prepareTimer: ReturnType<typeof setInterval> | undefined;
  private endedId: string | null = null;
  private timer: ReturnType<typeof setInterval> | undefined;
  private audioContext: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private waveFrame = 0;

  constructor() {
    effect(() => {
      this.playback();
      this.sync();
    });

    effect(() => {
      const host = this.youtubeRef()?.nativeElement;
      if (host && !this.youtube) void this.createYoutube(host);
    });
  }

  ngOnInit(): void {
    this.timer = setInterval(() => this.sync(), SYNC_INTERVAL_MS);
    this.waveFrame = requestAnimationFrame(() => this.drawWave());
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
    clearInterval(this.prepareTimer);
    cancelAnimationFrame(this.waveFrame);
    this.youtube?.destroy();
    this.audioRef()?.nativeElement.pause();
    void this.audioContext?.close();
  }

  protected play(positionSec: number): void {
    this.game.act({ type: 'mediaPlay', target: this.target(), kind: this.kind(), positionSec });
  }

  protected seek(event: Event): void {
    const positionSec = Number((event.target as HTMLInputElement).value);
    this.game.act({ type: 'mediaSeek', positionSec });
  }

  protected time(seconds: number): string {
    const total = Math.floor(seconds);
    return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, '0')}`;
  }

  private async createYoutube(host: HTMLElement): Promise<void> {
    await loadYoutubeApi();
    const element = document.createElement('div');
    host.append(element);
    this.youtube = new window.YT!.Player(element, {
      videoId: youtubeId(this.src()),
      playerVars: { controls: 0, disablekb: 1, fs: 0, rel: 0, playsinline: 1 },
      events: {
        onReady: () => {
          this.youtubeReady = true;
          this.sync();
        },
      },
    });
  }

  /** Bringt den lokalen Player auf den Stand des Servers. */
  private sync(): void {
    const playback = this.playback();
    if (this.kind() === 'video') this.syncYoutube(playback);
    else this.syncAudio(playback);
  }

  private wantedPosition(playback: Playback): number {
    if (!playback.playing) return playback.positionSec;
    return playback.positionSec + (this.game.serverNow() - playback.updatedAt) / 1000;
  }

  private atEnd(position: number): boolean {
    return this.duration() > 0 && position >= this.duration() - END_MARGIN_SEC;
  }

  /** Nur der Admin meldet das Ende, damit es genau einmal beim Server ankommt. */
  private finish(playback: Playback): void {
    if (!this.game.isAdmin() || this.endedId === playback.id) return;
    this.endedId = playback.id;
    this.game.act({ type: 'mediaEnded' });
  }

  private cancelPrepare(): void {
    clearInterval(this.prepareTimer);
    this.prepareTimer = undefined;
  }

  private syncYoutube(playback: Playback | null): void {
    const player = this.youtube;
    if (!player || !this.youtubeReady) return;
    this.duration.set(Math.round(player.getDuration()));

    if (!playback) {
      this.cancelPrepare();
      this.position.set(0);
      if (!this.stopped) player.stopVideo();
      this.stopped = true;
      return;
    }
    this.stopped = false;

    if (playback.preparing) {
      this.prepareYoutube(player, playback);
      return;
    }
    this.cancelPrepare();
    if (player.isMuted()) player.unMute();

    const wanted = this.wantedPosition(playback);
    const state = player.getPlayerState();
    this.position.set(player.getCurrentTime());

    if (state === YT_ENDED || this.atEnd(wanted)) {
      player.pauseVideo();
      this.finish(playback);
      return;
    }
    if (state !== YT_BUFFERING && Math.abs(player.getCurrentTime() - wanted) > MAX_DRIFT_SEC) {
      player.seekTo(wanted, true);
    }
    if (playback.playing) player.playVideo();
    else player.pauseVideo();
  }

  /** Spielt stumm an, bis genug geladen ist, und springt dann zur Startposition zurück. */
  private prepareYoutube(player: YtPlayer, playback: Playback): void {
    if (this.preparedId === playback.id) return;
    this.cancelPrepare();
    this.preparedId = playback.id;
    const startedAt = Date.now();
    const start = playback.positionSec;

    player.mute();
    player.seekTo(start, true);
    player.playVideo();

    this.prepareTimer = setInterval(() => {
      const duration = player.getDuration();
      const loaded = player.getVideoLoadedFraction() * duration - start;
      const needed = Math.min(BUFFER_SEC, duration - start - 1);
      const buffered = player.getPlayerState() === YT_PLAYING && loaded >= needed;
      if (!buffered && Date.now() - startedAt < PREPARE_LIMIT_MS) return;

      this.cancelPrepare();
      player.pauseVideo();
      player.seekTo(start, true);
      player.unMute();
      this.game.mediaReady(playback.id);
    }, 250);
  }

  private syncAudio(playback: Playback | null): void {
    const audio = this.audioRef()?.nativeElement;
    if (!audio) return;
    if (Number.isFinite(audio.duration)) this.duration.set(Math.round(audio.duration));
    this.position.set(audio.currentTime);

    if (!playback) {
      this.cancelPrepare();
      audio.pause();
      if (audio.currentTime > 0) audio.currentTime = 0;
      this.position.set(0);
      return;
    }
    if (playback.preparing) {
      this.prepareAudio(audio, playback);
      return;
    }
    this.cancelPrepare();

    const wanted = this.wantedPosition(playback);
    if (audio.ended || this.atEnd(wanted)) {
      audio.pause();
      this.finish(playback);
      return;
    }
    if (Math.abs(audio.currentTime - wanted) > MAX_DRIFT_SEC) audio.currentTime = wanted;
    if (!playback.playing) {
      audio.pause();
      return;
    }
    this.connectAnalyser(audio);
    // Bleibt ohne Nutzerklick blockiert und klappt beim nächsten Durchlauf nach einem Klick.
    if (this.audioContext?.state === 'suspended') void this.audioContext.resume();
    if (audio.paused) audio.play().catch(() => undefined);
  }

  /** Leitet das Audio durch einen Analyser; das geht pro Element nur einmal. */
  private connectAnalyser(audio: HTMLAudioElement): void {
    if (this.audioContext) return;
    this.audioContext = new AudioContext();
    this.analyser = this.audioContext.createAnalyser();
    this.analyser.fftSize = 2048;
    this.audioContext.createMediaElementSource(audio).connect(this.analyser);
    this.analyser.connect(this.audioContext.destination);
  }

  private drawWave(): void {
    this.waveFrame = requestAnimationFrame(() => this.drawWave());
    const canvas = this.waveRef()?.nativeElement;
    if (!canvas) return;
    const ratio = window.devicePixelRatio || 1;
    const width = Math.round(canvas.clientWidth * ratio);
    const height = Math.round(canvas.clientHeight * ratio);
    if (canvas.width !== width) canvas.width = width;
    if (canvas.height !== height) canvas.height = height;

    const samples = new Uint8Array(this.analyser?.frequencyBinCount ?? 2);
    samples.fill(128);
    if (this.playing()) this.analyser?.getByteTimeDomainData(samples);

    const context = canvas.getContext('2d')!;
    context.clearRect(0, 0, width, height);
    context.lineCap = 'round';
    context.lineJoin = 'round';
    context.lineWidth = 3 * ratio;
    context.strokeStyle = '#f5cf7a';
    context.beginPath();
    samples.forEach((sample, index) => {
      const x = (index / (samples.length - 1)) * width;
      const y = height / 2 + ((sample - 128) / 128) * (height / 2) * WAVE_AMPLITUDE;
      if (index === 0) context.moveTo(x, y);
      else context.lineTo(x, y);
    });
    context.stroke();
  }

  private prepareAudio(audio: HTMLAudioElement, playback: Playback): void {
    if (this.preparedId === playback.id) return;
    this.cancelPrepare();
    this.preparedId = playback.id;
    const startedAt = Date.now();
    audio.pause();
    audio.currentTime = playback.positionSec;
    this.connectAnalyser(audio);

    this.prepareTimer = setInterval(() => {
      const buffered = audio.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA;
      if (!buffered && Date.now() - startedAt < PREPARE_LIMIT_MS) return;
      this.cancelPrepare();
      this.game.mediaReady(playback.id);
    }, 100);
  }
}
