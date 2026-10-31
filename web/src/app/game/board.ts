import { Component, inject } from '@angular/core';
import { GameService } from '../core/game.service';

@Component({
  selector: 'app-board',
  template: `
    @if (game.view(); as view) {
      @for (category of view.categories; track $index; let c = $index) {
        <div class="column">
          <img [src]="category.image" alt="" />
          <h3>{{ category.name }}</h3>
          @for (tile of category.tiles; track $index; let r = $index) {
            <button
              class="tile"
              [class.used]="tile.used"
              [class.last]="view.lastTile?.category === c && view.lastTile?.row === r"
              [disabled]="!game.isAdmin()"
              (click)="game.act({ type: 'openQuestion', category: c, row: r })"
            >
              @if (tile.bonus) {
                <img src="assets/bonus/joker.png" alt="Bonus" />
              } @else {
                {{ tile.value }}
              }
            </button>
          }
        </div>
      }
    }
  `,
  styles: `
    :host {
      display: grid;
      gap: 0.9vw;
      grid-template-columns: repeat(5, minmax(0, 1fr));
      height: 96%;
      margin: 1vh auto 0;
      max-width: 50vw;
    }
    .column {
      display: flex;
      flex-direction: column;
      gap: 0.8vh;
      min-height: 0;
    }
    .column > img {
      align-self: center;
      filter: drop-shadow(0 4px 10px rgba(0, 0, 0, 0.7));
      height: 9.25vh;
      object-fit: contain;
    }
    h3 {
      font-size: 0.8em;
      letter-spacing: 0.03em;
      overflow: hidden;
      text-align: center;
      text-overflow: ellipsis;
      text-shadow: 0 2px 6px #000;
      white-space: nowrap;
    }
    .tile {
      animation: pop-in 0.35s ease-out backwards;
      backdrop-filter: blur(6px);
      background: linear-gradient(170deg, rgba(58, 42, 22, 0.88), rgba(22, 16, 10, 0.92));
      border: 1px solid var(--line-strong);
      border-radius: 10px;
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.45);
      color: var(--gold-strong);
      flex: 1;
      font-family: var(--font-display);
      font-size: 1.6em;
      font-weight: 700;
      min-height: 0;
      padding: 0;
    }
    .tile:hover:not(:disabled):not(.used) {
      background: linear-gradient(170deg, rgba(92, 66, 30, 0.92), rgba(34, 24, 12, 0.95));
      border-color: var(--gold-strong);
      box-shadow: 0 0 22px rgba(255, 201, 110, 0.45);
      transform: translateY(-2px) scale(1.03);
    }
    .tile:disabled {
      opacity: 1;
    }
    /* Fast durchsichtig, damit das Hintergrundvideo durchscheint. */
    .tile.used {
      backdrop-filter: none;
      background: rgba(20, 16, 10, 0.1);
      border-color: rgba(255, 255, 255, 0.1);
      box-shadow: none;
      color: rgba(246, 239, 226, 0.32);
    }
    .tile.last {
      border-color: var(--gold-strong);
    }
    .tile img {
      height: 80%;
      max-height: 6vh;
    }
  `,
})
export class Board {
  protected readonly game = inject(GameService);
}
