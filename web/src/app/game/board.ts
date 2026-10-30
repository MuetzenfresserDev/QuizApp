import { Component, inject } from '@angular/core';
import { GameService } from '../core/game.service';

@Component({
  selector: 'app-board',
  template: `
    @if (game.view(); as view) {
      @for (category of view.categories; track category.name; let c = $index) {
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
      gap: 1.5vw;
      grid-template-columns: repeat(5, minmax(0, 1fr));
      height: 100%;
      margin: 0 auto;
      max-width: 70vw;
    }
    .column {
      display: flex;
      flex-direction: column;
      gap: 0.8vh;
      min-height: 0;
    }
    .column > img {
      align-self: center;
      height: 8vh;
      object-fit: contain;
    }
    h3 {
      font-size: 1.1em;
      text-align: center;
      white-space: nowrap;
    }
    .tile {
      background: var(--teal);
      border: 3px solid #000;
      flex: 1;
      font-size: 2em;
      font-weight: bold;
      min-height: 0;
      padding: 0;
    }
    .tile:disabled {
      opacity: 1;
    }
    .tile.used {
      background: #2b261d;
      color: var(--muted);
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
