import { Component, ElementRef, OnDestroy, OnInit, inject } from '@angular/core';
import { YT_ENDED, type YtPlayer, loadYoutubeApi } from '../core/youtube';

const VIDEO_IDS = [
  'mT7NNpyci1Q',
  'tnNYCCjIOdI',
  'npac3zDujhY',
  '6SX39jh7F4U',
  'O_zCQhspCFM',
  '62u7-ikNGRY',
  'eYJBuZDD3Rg',
  '1v4hgY-bjEU',
];

/** Stummer Hintergrund: spielt zufällige Videos und wechselt am Ende direkt zum nächsten. */
@Component({
  selector: 'app-background-video',
  template: '',
  styles: `
    :host {
      height: 56.25vw;
      left: 50%;
      min-height: 100vh;
      min-width: 177.78vh;
      opacity: 0.75;
      pointer-events: none;
      position: fixed;
      top: 50%;
      /* Vergrößert, damit YouTubes Titelzeile außerhalb des Bildes liegt. */
      transform: translate(-50%, -50%) scale(1.25);
      width: 100vw;
      z-index: -1;
    }
    :host ::ng-deep iframe {
      border: 0;
      height: 100%;
      width: 100%;
    }
  `,
})
export class BackgroundVideo implements OnInit, OnDestroy {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private player: YtPlayer | null = null;
  private current = '';
  /** Verschwindet ein Video von YouTube, läuft die Show mit den übrigen weiter. */
  private available = [...VIDEO_IDS];
  private destroyed = false;

  async ngOnInit(): Promise<void> {
    await loadYoutubeApi();
    if (this.destroyed) return;

    const element = document.createElement('div');
    element.id = 'background-video';
    this.host.nativeElement.append(element);
    this.current = this.pick();
    this.player = new window.YT!.Player(element, {
      videoId: this.current,
      playerVars: { autoplay: 1, controls: 0, disablekb: 1, fs: 0, iv_load_policy: 3, mute: 1, playsinline: 1, rel: 0, vq: 'hd1080' },
      events: {
        onReady: () => {
          this.player?.mute();
          this.player?.playVideo();
        },
        onStateChange: (event: { data: number }) => {
          if (event.data === YT_ENDED) this.next();
        },
        onError: () => this.skip(),
      },
    });
  }

  ngOnDestroy(): void {
    this.destroyed = true;
    this.player?.destroy();
  }

  private pick(): string {
    const others = this.available.filter((id) => id !== this.current);
    const pool = others.length ? others : this.available;
    return pool[Math.floor(Math.random() * pool.length)] ?? '';
  }

  private next(): void {
    this.current = this.pick();
    if (this.current) this.player?.loadVideoById(this.current);
  }

  private skip(): void {
    this.available = this.available.filter((id) => id !== this.current);
    this.next();
  }
}
