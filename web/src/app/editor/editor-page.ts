import { Component, OnInit, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TILE_POINTS } from '@quiz/shared';
import { EditorStore, tileLabel } from './editor-store';
import { QuestionForm } from './question-form';

@Component({
  selector: 'app-editor-page',
  imports: [QuestionForm, RouterLink],
  providers: [EditorStore],
  template: `
    <header class="top">
      <div>
        <a routerLink="/">Zurück</a>
        <h1>Fragen-Editor</h1>
      </div>
      <label class="title">
        Name des Quiz
        <input [value]="store.quiz().title" (input)="setTitle($any($event.target).value)" />
      </label>
      <span class="save" role="status">{{ saveLabel() }}</span>
      <div class="actions">
        <label class="button">
          Paket öffnen
          <input type="file" accept=".zip" (change)="open($event)" />
        </label>
        <button type="button" class="quiet" (click)="reset()">Neu beginnen</button>
        <button type="button" class="primary" (click)="download()">Paket herunterladen</button>
      </div>
    </header>

    @if (store.notice()) {
      <p class="notice" role="alert">{{ store.notice() }}</p>
    }

    <p class="progress">
      <strong>{{ store.doneCount() }} von {{ total }}</strong> Fragen fertig.
      Alles wird automatisch in diesem Browser gespeichert. Wenn alles fertig ist, lade das Paket herunter und schicke es weiter.
    </p>

    <main>
      <section class="board" aria-label="Spielbrett">
        @for (category of store.quiz().categories; track $index; let c = $index) {
          <div class="column">
            <label class="picture">
              <img [src]="store.url(category.image)" alt="" />
              <span>Bild ändern</span>
              <input type="file" accept=".png,.jpg,.jpeg,.webp,.gif" (change)="setPicture(c, $event)" />
            </label>
            <input class="name" [attr.aria-label]="'Name der Kategorie ' + (c + 1)" placeholder="Kategoriename" [value]="category.name" (input)="setName(c, $any($event.target).value)" />
            @for (question of category.questions; track $index; let r = $index) {
              <button
                type="button"
                class="tile"
                [class]="store.tileState(question)"
                [class.selected]="store.selected()?.category === c && store.selected()?.row === r"
                (click)="store.selected.set({ category: c, row: r })"
              >
                <strong>{{ label(r) }}</strong>
                <span>{{ question.prompt }}</span>
              </button>
            }
          </div>
        }
      </section>

      <section class="panel form">
        <app-question-form />
      </section>
    </main>

    @if (store.issues().length) {
      <details class="issues">
        <summary>Noch offen ({{ store.issues().length }})</summary>
        <ul>
          @for (issue of store.issues(); track issue) {
            <li>{{ issue }}</li>
          }
        </ul>
      </details>
    }
  `,
  styles: `
    :host {
      display: block;
      margin: 0 auto;
      max-width: 1500px;
      padding: 16px;
    }
    a {
      color: var(--gold-strong);
    }
    .top {
      align-items: end;
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      margin-bottom: 0.8rem;
    }
    h1 {
      background: var(--gold-gradient);
      background-clip: text;
      color: transparent;
      font-size: 1.8em;
    }
    .title {
      color: var(--muted);
      display: grid;
      flex: 1;
      gap: 0.25rem;
      min-width: 12rem;
    }
    .save {
      color: var(--muted);
      white-space: nowrap;
    }
    .actions {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }
    .button {
      background: var(--surface-raised);
      border: 1px solid var(--line);
      border-radius: var(--radius);
      cursor: pointer;
      padding: 0.4em 0.9em;
    }
    .button:focus-within {
      outline: 2px solid var(--gold-strong);
    }
    .button input,
    .picture input {
      height: 1px;
      opacity: 0;
      position: absolute;
      width: 1px;
    }
    .notice {
      background: var(--danger);
      border-radius: var(--radius);
      margin-bottom: 0.8rem;
      padding: 0.5rem 0.8rem;
    }
    .progress {
      margin-bottom: 1rem;
    }
    main {
      align-items: start;
      display: grid;
      gap: 1rem;
      grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
    }
    @media (max-width: 1000px) {
      main {
        grid-template-columns: minmax(0, 1fr);
      }
    }
    .board {
      display: grid;
      gap: 0.5rem;
      grid-template-columns: repeat(5, minmax(0, 1fr));
      position: sticky;
      top: 1rem;
    }
    .column {
      display: grid;
      gap: 0.4rem;
    }
    .picture {
      cursor: pointer;
      display: block;
      text-align: center;
    }
    .picture:focus-within img {
      outline: 2px solid var(--gold-strong);
    }
    .picture span {
      color: var(--gold-strong);
      display: block;
      font-size: 0.8em;
      text-decoration: underline;
    }
    .picture img {
      height: 4rem;
      max-width: 100%;
      object-fit: contain;
    }
    .name {
      padding: 0.3em 0.4em;
      text-align: center;
    }
    .tile {
      align-content: start;
      background: var(--surface-raised);
      border: 2px solid transparent;
      display: grid;
      gap: 0.15rem;
      height: 5em;
      overflow: hidden;
      padding: 0.3rem;
    }
    .tile span {
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      color: var(--muted);
      display: -webkit-box;
      font-size: 0.75em;
      font-weight: 500;
      line-height: 1.25;
      overflow: hidden;
    }
    .tile.open {
      background: rgba(214, 150, 40, 0.3);
    }
    .tile.done {
      background: rgba(68, 158, 92, 0.32);
    }
    .tile.selected {
      border-color: var(--gold-strong);
    }
    .form {
      padding: 1rem;
    }
    .issues {
      margin-top: 1rem;
    }
    .issues ul {
      columns: 2;
    }
    @media (max-width: 700px) {
      .board {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
      .issues ul {
        columns: 1;
      }
    }
  `,
})
export class EditorPage implements OnInit {
  protected readonly store = inject(EditorStore);
  protected readonly total = TILE_POINTS.length * 5;
  protected readonly label = tileLabel;

  protected readonly saveLabel = computed(() => {
    const state = this.store.saveState();
    if (state === 'failed') return 'Speichern fehlgeschlagen!';
    return state === 'saving' ? 'Speichert ...' : 'Alles gespeichert';
  });

  ngOnInit(): void {
    void this.store.load();
  }

  protected setTitle(title: string): void {
    this.store.updateQuiz((quiz) => (quiz.title = title));
  }

  protected setName(category: number, name: string): void {
    this.store.updateQuiz((quiz) => (quiz.categories[category]!.name = name));
  }

  protected setPicture(category: number, event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    const ref = file && this.store.addFile(file);
    if (ref) this.store.updateQuiz((quiz) => (quiz.categories[category]!.image = ref));
    input.value = '';
  }

  protected async open(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    input.value = '';
    if (file && confirm('Das ersetzt den aktuellen Entwurf. Fortfahren?')) await this.store.open(file);
  }

  protected reset(): void {
    if (confirm('Wirklich alles löschen und neu beginnen?')) this.store.reset();
  }

  protected async download(): Promise<void> {
    const open = this.store.issues().length;
    const ok = open === 0 || confirm(`Es sind noch ${open} Punkte offen. Das Paket lässt sich so noch nicht ins Spiel einbinden, du kannst damit aber später weiterarbeiten. Trotzdem herunterladen?`);
    if (ok) await this.store.download();
  }
}
