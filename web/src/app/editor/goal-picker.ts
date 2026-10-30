import { Component, computed, inject } from '@angular/core';
import { DEFAULT_MAP, MAP_HEIGHT, MAP_WIDTH } from '@quiz/shared';
import { EditorStore } from './editor-store';
import { MediaField } from './media-field';

const MAPS = [
  { label: 'Karte der Kolonie (Remake)', file: DEFAULT_MAP },
  { label: 'Altes Lager (Remake)', file: 'assets/geo/altes_lager_remake.png' },
  { label: 'Minental (Gothic 1)', file: 'assets/geo/g1MinentalSmall.png' },
  { label: 'Minental ohne Orkgebiet', file: 'assets/geo/g1ohneorksgebiet.png' },
  { label: 'Minental (Gothic 2)', file: 'assets/geo/minentalSmall.jpg' },
  { label: 'Khorinis', file: 'assets/geo/khorinisSmall.jpg' },
  { label: 'Khorinis Stadt', file: 'assets/geo/khorinis_city.jpg' },
  { label: 'Jharkendar', file: 'assets/geo/MapJharkendar.png' },
  { label: 'Gothic 3 (ganz)', file: 'assets/geo/g3Full.jpg' },
  { label: 'Gothic 3 (Hälfte)', file: 'assets/geo/G3MapHalb.png' },
];

/** Zeigt die Karte im selben Ausschnitt wie im Spiel, das Ziel sitzt dort also exakt gleich. */
@Component({
  selector: 'app-goal-picker',
  imports: [MediaField],
  template: `
    @if (map(); as map) {
      <label>
        Karte
        <select [value]="isBuiltIn() ? map.image : ''" (change)="chooseMap($any($event.target).value)">
          @if (!isBuiltIn()) {
            <option value="">Eigene Karte</option>
          }
          @for (entry of maps; track entry.file) {
            <option [value]="entry.file">{{ entry.label }}</option>
          }
        </select>
      </label>
      <app-media-field label="Oder eigene Karte hochladen" [value]="isBuiltIn() ? undefined : map.image" (changed)="ownMap($event)" />

      <p class="hint">{{ map.goal ? 'Ziel gesetzt. Klick auf die Karte, um es zu versetzen.' : 'Klick auf die Karte, um das Ziel zu setzen.' }}</p>
      <button type="button" class="map" aria-label="Ziel auf der Karte setzen" (click)="setGoal($event)">
        <img [src]="store.url(map.image)" alt="" draggable="false" />
        @if (map.goal; as goal) {
          <span class="goal" [style.left.%]="(goal.x / width) * 100" [style.top.%]="(goal.y / height) * 100"></span>
        }
      </button>
    }
  `,
  styles: `
    :host {
      display: grid;
      gap: 0.5rem;
    }
    label {
      color: var(--muted);
      display: grid;
      gap: 0.25rem;
    }
    .hint {
      color: var(--gold-strong);
    }
    .map {
      aspect-ratio: 850 / 592;
      background: none;
      border: 1px solid var(--line);
      cursor: crosshair;
      overflow: hidden;
      padding: 0;
      position: relative;
      width: 100%;
    }
    .map:hover {
      filter: none !important;
    }
    img {
      display: block;
      height: 100%;
      object-fit: cover;
      user-select: none;
      width: 100%;
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
  `,
})
export class GoalPicker {
  protected readonly store = inject(EditorStore);
  protected readonly maps = MAPS;
  protected readonly width = MAP_WIDTH;
  protected readonly height = MAP_HEIGHT;

  protected readonly map = computed(() => this.store.question()?.map ?? null);
  protected readonly isBuiltIn = computed(() => MAPS.some((entry) => entry.file === this.map()?.image));

  protected chooseMap(image: string): void {
    if (image) this.setImage(image);
  }

  protected ownMap(ref: string | undefined): void {
    this.setImage(ref ?? DEFAULT_MAP);
  }

  protected setGoal(event: MouseEvent): void {
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    const goal = {
      x: Math.round(((event.clientX - rect.left) / rect.width) * MAP_WIDTH),
      y: Math.round(((event.clientY - rect.top) / rect.height) * MAP_HEIGHT),
    };
    this.store.updateQuestion((question) => (question.map!.goal = goal));
  }

  /** Eine andere Karte macht das alte Ziel wertlos. */
  private setImage(image: string): void {
    this.store.updateQuestion((question) => (question.map = { image, goal: null }));
  }
}
