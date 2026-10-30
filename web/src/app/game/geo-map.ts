import { Component, computed, inject } from '@angular/core';
import { MAP_HEIGHT, MAP_WIDTH, type Point } from '@quiz/shared';
import { GameService } from '../core/game.service';
import { Expandable } from './expandable';

interface Marker extends Point {
  id: string;
  name: string;
  icon: string;
  distance: number | null;
}

@Component({
  selector: 'app-geo-map',
  hostDirectives: [Expandable],
  template: `
    @if (map(); as map) {
      <div class="area">
        <button class="big-toggle" (click)="expand.toggle()">{{ expand.big() ? 'Klein' : 'Groß' }}</button>
        <div class="map" [class.pickable]="canPick()" (click)="pick($event)">
        <img [src]="map.image" alt="Karte" draggable="false" />
        <svg [attr.viewBox]="'0 0 ' + width + ' ' + height" aria-hidden="true">
          @if (map.goal; as goal) {
            @for (marker of markers(); track marker.id) {
              <line class="outline" pathLength="1" [attr.x1]="marker.x * width" [attr.y1]="marker.y * height" [attr.x2]="goal.x * width" [attr.y2]="goal.y * height" />
              <line class="main" pathLength="1" [attr.x1]="marker.x * width" [attr.y1]="marker.y * height" [attr.x2]="goal.x * width" [attr.y2]="goal.y * height" />
            }
          }
        </svg>
        @if (map.myPick && !map.picks) {
          <img class="marker" src="assets/geo/nameless.png" alt="Dein Tipp" [style.left.%]="map.myPick.x * 100" [style.top.%]="map.myPick.y * 100" />
        }
        @for (marker of markers(); track marker.id) {
          <img class="marker" [src]="'assets/geo/' + marker.icon" alt="" [style.left.%]="marker.x * 100" [style.top.%]="marker.y * 100" />
          <span class="label" [style.left.%]="marker.x * 100" [style.top.%]="marker.y * 100">{{ marker.name }}</span>
        }
        @if (map.goal; as goal) {
          <span class="goal" [style.left.%]="goal.x * 100" [style.top.%]="goal.y * 100"></span>
        }
      </div>
      </div>

      @if (map.distances) {
        <ol class="distances">
          @for (marker of ranked(); track marker.id) {
            <li>{{ marker.name }}: {{ marker.distance }} Pixel</li>
          }
        </ol>
      } @else {
        <p class="muted">{{ map.submittedIds.length }} von {{ game.view()?.players?.length }} Spielern haben getippt</p>
      }
    }
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      gap: 0.3rem;
      height: 100%;
      min-height: 0;
    }
    .area {
      container-type: size;
      flex: 1;
      min-height: 0;
      position: relative;
    }
    .map {
      aspect-ratio: 850 / 592;
      border-radius: 6px;
      margin: 0 auto;
      overflow: hidden;
      position: relative;
      width: min(100cqw, 100cqh * 850 / 592);
    }
    .map.pickable {
      cursor: crosshair;
    }
    .map > img:first-child {
      height: 100%;
      object-fit: cover;
      user-select: none;
      width: 100%;
    }
    svg {
      height: 100%;
      inset: 0;
      pointer-events: none;
      position: absolute;
      width: 100%;
    }
    line {
      animation: draw 1.2s ease-out forwards;
      stroke-dasharray: 1;
      stroke-dashoffset: 1;
      stroke-linecap: round;
    }
    .outline {
      stroke: rgba(20, 16, 10, 0.55);
      stroke-width: 9;
    }
    .main {
      stroke: #fff3d6;
      stroke-width: 4.5;
    }
    @keyframes draw {
      to {
        stroke-dashoffset: 0;
      }
    }
    @media (prefers-reduced-motion: reduce) {
      line {
        animation: none;
        stroke-dashoffset: 0;
      }
    }
    .marker,
    .label {
      transition:
        left 0.35s ease,
        top 0.35s ease;
    }
    .marker {
      border: 2px solid #fff;
      border-radius: 50%;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.5);
      height: 2.2em;
      pointer-events: none;
      position: absolute;
      transform: translate(-50%, -50%);
      width: 2.2em;
    }
    .label {
      background: rgba(255, 255, 255, 0.88);
      border-radius: 6px;
      color: #131313;
      font-size: 0.95em;
      font-weight: bold;
      padding: 0 0.4em;
      pointer-events: none;
      position: absolute;
      transform: translate(-50%, 1.2em);
      white-space: nowrap;
    }
    .goal {
      height: 30px;
      pointer-events: none;
      position: absolute;
      transform: translate(-50%, -50%);
      width: 30px;
    }
    .goal::before,
    .goal::after {
      background: #d43b2f;
      border: 1.5px solid #3a0e0a;
      border-radius: 3px;
      content: '';
      height: 6px;
      left: 50%;
      position: absolute;
      top: 50%;
      width: 34px;
    }
    .goal::before {
      transform: translate(-50%, -50%) rotate(45deg);
    }
    .goal::after {
      transform: translate(-50%, -50%) rotate(-45deg);
    }
    .distances {
      font-size: 1.2em;
      display: flex;
      flex: none;
      flex-wrap: wrap;
      gap: 0 2rem;
      justify-content: center;
      list-style: inside decimal;
      margin: 0;
      padding: 0;
    }
    p {
      flex: none;
      text-align: center;
    }
  `,
})
export class GeoMap {
  protected readonly game = inject(GameService);
  protected readonly expand = inject(Expandable);
  protected readonly width = MAP_WIDTH;
  protected readonly height = MAP_HEIGHT;

  protected readonly map = computed(() => this.game.run()?.map ?? null);
  protected readonly canPick = computed(() => !this.game.isAdmin() && !this.map()?.goal);

  protected readonly markers = computed<Marker[]>(() => {
    const map = this.map();
    const players = this.game.view()?.players ?? [];
    if (!map?.picks) return [];
    return players.flatMap((player) => {
      const pick = map.picks![player.id];
      if (!pick) return [];
      return [{ ...pick, id: player.id, name: player.name, icon: player.icon, distance: map.distances?.[player.id] ?? null }];
    });
  });

  protected readonly ranked = computed(() =>
    [...this.markers()].sort((a, b) => (a.distance ?? 0) - (b.distance ?? 0)),
  );

  protected pick(event: MouseEvent): void {
    if (!this.canPick()) return;
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    this.game.mapPick({
      x: (event.clientX - rect.left) / rect.width,
      y: (event.clientY - rect.top) / rect.height,
    });
  }
}
