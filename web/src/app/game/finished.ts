import { Component, computed, inject } from '@angular/core';
import { GameService } from '../core/game.service';

@Component({
  selector: 'app-finished',
  template: `
    <div class="panel result">
      <h2>Endstand</h2>
      <ol>
        @for (player of ranking(); track player.id) {
          <li>
            <span>{{ player.name }}</span>
            <strong>{{ player.points }} Gold</strong>
          </li>
        }
      </ol>
    </div>
  `,
  styles: `
    :host {
      align-items: center;
      display: flex;
      height: 100%;
      justify-content: center;
    }
    .result {
      min-width: 40%;
      padding: 2rem;
    }
    h2 {
      color: var(--gold-strong);
      margin-bottom: 1rem;
      text-align: center;
    }
    li {
      font-size: 1.3em;
      margin-bottom: 0.5rem;
    }
    li span {
      margin-right: 1rem;
    }
  `,
})
export class Finished {
  private readonly game = inject(GameService);
  protected readonly ranking = computed(() =>
    [...(this.game.view()?.players ?? [])].sort((a, b) => b.points - a.points),
  );
}
