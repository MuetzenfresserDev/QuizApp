export const YT_ENDED = 0;
export const YT_PLAYING = 1;
export const YT_BUFFERING = 3;

export interface YtPlayer {
  playVideo(): void;
  pauseVideo(): void;
  stopVideo(): void;
  loadVideoById(videoId: string): void;
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

export function loadYoutubeApi(): Promise<void> {
  youtubeApi ??= new Promise((resolve) => {
    window.onYouTubeIframeAPIReady = resolve;
    const script = document.createElement('script');
    script.src = 'https://www.youtube.com/iframe_api';
    document.head.append(script);
  });
  return youtubeApi;
}
