import { Component, ElementRef, OnDestroy, OnInit, computed, effect, inject, input, signal, viewChild } from '@angular/core';
import { type MediaKind, type MediaTarget, youtubeId } from '@quiz/shared';
import { GameService } from '../core/game.service';
import { Expandable } from './expandable';

/** Abweichung, ab der ein Client auf die Admin-Position nachspringt. */
const MAX_DRIFT_SEC = 1.5;
const SYNC_INTERVAL_MS = 2000;
const YT_PLAYING = 1;
const YT_BUFFERING = 3;

interface YtPlayer {
  playVideo(): void;
  pauseVideo(): void;
  seekTo(seconds: number, allowSeekAhead: boolean): void;
  getCurrentTime(): number;
  getDuration(): number;
  getPlayerState(): number;
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
          <button class="big-toggle" (click)="expand.toggle()">{{ expand.big() ? 'Klein' : 'Groß' }}</button>
        </div>
      </div>
    } @else {
      <audio #audio [src]="src()" preload="auto"></audio>
    }
    @if (game.isAdmin()) {
      <div class="controls">
        @if (playing()) {
          <button (click)="game.act({ type: 'mediaPause' })">Pause</button>
        } @else {
          <button class="primary" (click)="play(position())">{{ kind() === 'video' ? 'Video' : 'Audio' }} abspielen</button>
        }
        <button (click)="play(0)">Von vorne</button>
        <input
          type="range"
          min="0"
          aria-label="Position"
          [max]="duration()"
          [value]="position()"
          [disabled]="!active()"
          (change)="seek($event)"
        />
        <span>{{ time(position()) }} / {{ time(duration()) }}</span>
      </div>
    } @else if (kind() === 'audio') {
      <p class="muted">{{ playing() ? 'Audio läuft ...' : 'Audio wartet auf den Host' }}</p>
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
    .shield {
      height: 100%;
      inset: 0;
      position: absolute;
      width: 100%;
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

  readonly src = input.required<string>();
  readonly kind = input.required<MediaKind>();
  readonly target = input.required<MediaTarget>();

  protected readonly position = signal(0);
  protected readonly duration = signal(0);

  private readonly playback = computed(() => {
    const playback = this.game.run()?.playback;
    return playback?.target === this.target() && playback.kind === this.kind() ? playback : null;
  });
  protected readonly active = computed(() => this.playback() !== null);
  protected readonly playing = computed(() => this.playback()?.playing ?? false);

  private youtube: YtPlayer | null = null;
  private youtubeReady = false;
  private playRequested = false;
  private timer: ReturnType<typeof setInterval> | undefined;

  constructor() {
    effect(() => {
      this.game.soundRetry();
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
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
    this.youtube?.destroy();
    this.audioRef()?.nativeElement.pause();
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
    const wanted = playback ? this.wantedPosition() : 0;
    if (this.kind() === 'video') this.syncYoutube(wanted);
    else this.syncAudio(wanted);
  }

  private wantedPosition(): number {
    const playback = this.playback()!;
    if (!playback.playing) return playback.positionSec;
    return playback.positionSec + (this.game.serverNow() - playback.updatedAt) / 1000;
  }

  /** Nach dem Ende bleibt das Medium stehen, statt über die Länge hinaus zu springen. */
  private limit(position: number): number {
    return this.duration() > 0 ? Math.min(position, this.duration()) : position;
  }

  private syncYoutube(wanted: number): void {
    const player = this.youtube;
    if (!player || !this.youtubeReady) return;
    this.duration.set(Math.round(player.getDuration()));
    this.position.set(this.playback() ? player.getCurrentTime() : 0);

    if (!this.active()) {
      if (player.getPlayerState() === YT_PLAYING) player.pauseVideo();
      return;
    }
    if (Math.abs(player.getCurrentTime() - this.limit(wanted)) > MAX_DRIFT_SEC) player.seekTo(this.limit(wanted), true);
    if (!this.playing()) {
      player.pauseVideo();
      return;
    }
    // YouTube meldet blockiertes Autoplay nicht als Fehler, der Player bleibt nur stehen.
    const started = [YT_PLAYING, YT_BUFFERING].includes(player.getPlayerState());
    if (!started && this.playRequested) this.game.soundBlocked.set(true);
    this.playRequested = !started;
    player.playVideo();
  }

  private syncAudio(wanted: number): void {
    const audio = this.audioRef()?.nativeElement;
    if (!audio) return;
    if (Number.isFinite(audio.duration)) this.duration.set(Math.round(audio.duration));
    this.position.set(audio.currentTime);

    if (!this.active()) {
      audio.pause();
      return;
    }
    if (Math.abs(audio.currentTime - this.limit(wanted)) > MAX_DRIFT_SEC) audio.currentTime = this.limit(wanted);
    if (!this.playing()) audio.pause();
    else if (audio.paused && !audio.ended) audio.play().catch(() => this.game.soundBlocked.set(true));
  }
}
