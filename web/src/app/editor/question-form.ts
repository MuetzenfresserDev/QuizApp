import { Component, computed, inject } from '@angular/core';
import { DEFAULT_MAP, type MediaSet, type QuestionDef, type QuestionMode, TILE_POINTS, emptyQuestion, questionIssues, youtubeId } from '@quiz/shared';
import { EditorStore } from './editor-store';
import { GoalPicker } from './goal-picker';
import { MediaField } from './media-field';

const MODES: { mode: QuestionMode; label: string; hint: string }[] = [
  { mode: 'buzzer', label: 'Buzzer', hint: 'Wer zuerst drückt, darf antworten.' },
  { mode: 'whiteboard', label: 'Whiteboard', hint: 'Alle schreiben oder malen ihre Antwort.' },
  { mode: 'map', label: 'Karte', hint: 'Alle suchen einen Ort auf der Karte.' },
];

@Component({
  selector: 'app-question-form',
  imports: [GoalPicker, MediaField],
  template: `
    @if (question(); as question) {
      <header>
        <h2>{{ title() }}</h2>
        <button type="button" class="quiet" (click)="store.selected.set(null)">Schließen</button>
      </header>

      <fieldset class="modes">
        <legend>Art der Frage</legend>
        @for (entry of modes; track entry.mode) {
          <label [class.on]="question.mode === entry.mode">
            <input type="radio" name="mode" [checked]="question.mode === entry.mode" (change)="setMode(entry.mode)" />
            <strong>{{ entry.label }}</strong>
            <small>{{ entry.hint }}</small>
          </label>
        }
      </fieldset>

      <label class="field">
        Fragetext
        <textarea rows="3" [value]="question.prompt" (input)="change('prompt', value($event))"></textarea>
      </label>

      <label class="check">
        <input type="checkbox" [checked]="!!question.bonus" (change)="setBonus($any($event.target).checked)" />
        Bonusfrage (spielt beim Öffnen einen Sound)
      </label>

      <section>
        <h3>{{ question.mode === 'map' ? 'Was wird gesucht?' : 'Das sehen die Spieler zur Frage (optional)' }}</h3>
        <app-media-field [label]="question.mode === 'map' ? 'Bild vom gesuchten Ort' : 'Bild'" [value]="question.media?.image" (changed)="setMedia('media', 'image', $event)" />
        @if (question.mode !== 'map') {
          <label class="field">
            YouTube-Link
            <input [value]="question.media?.video ?? ''" (input)="setMedia('media', 'video', value($event))" />
          </label>
          @if (badLink(question.media?.video)) {
            <p class="problem">Das ist kein YouTube-Link.</p>
          }
          <app-media-field label="Audio (zum Beispiel eine Voiceline)" kind="audio" [value]="question.media?.audio" (changed)="setMedia('media', 'audio', $event)" />
        }
      </section>

      @if (question.mode === 'map') {
        <section>
          <h3>Wo ist der Ort?</h3>
          <app-goal-picker />
        </section>
      } @else {
        <section>
          <h3>Lösung (mindestens eins davon)</h3>
          <label class="field">
            Antwort als Text
            <textarea rows="2" [value]="question.answer.text ?? ''" (input)="setMedia('answer', 'text', value($event))"></textarea>
          </label>
          <app-media-field label="Bild" [value]="question.answer.image" (changed)="setMedia('answer', 'image', $event)" />
          <label class="field">
            YouTube-Link
            <input [value]="question.answer.video ?? ''" (input)="setMedia('answer', 'video', value($event))" />
          </label>
          @if (badLink(question.answer.video)) {
            <p class="problem">Das ist kein YouTube-Link.</p>
          }
          <app-media-field label="Audio" kind="audio" [value]="question.answer.audio" (changed)="setMedia('answer', 'audio', $event)" />
        </section>
      }

      @if (question.mode === 'whiteboard') {
        <details>
          <summary>Weitere Optionen</summary>
          <app-media-field label="Bild im Whiteboard (darauf können die Spieler malen)" [value]="question.boardImage" (changed)="setBoardImage($event)" />
          <label class="check">
            <input type="checkbox" [checked]="!!question.boardNotes" (change)="setBoardNotes($any($event.target).checked)" />
            Platz zum Schreiben lassen (das Bild steht links, rechts bleibt eine freie Spalte)
          </label>
          <label class="field">
            Antwortmöglichkeiten (eine pro Zeile)
            <textarea rows="4" [value]="options()" (input)="setOptions(value($event))"></textarea>
          </label>
          <label class="check">
            <input type="checkbox" [checked]="!!question.imposter" (change)="setImposter($any($event.target).checked)" />
            Imposter: Ein Spieler bekommt ein anderes Bild
          </label>
          @if (question.imposter; as imposter) {
            <label class="field">
              Wer ist der Imposter?
              <select [value]="imposter.slot" (change)="setImposterSlot($any($event.target).value)">
                @for (slot of [0, 1, 2, 3]; track slot) {
                  <option [value]="slot">Spieler {{ slot + 1 }}</option>
                }
              </select>
            </label>
            <app-media-field label="Bild für den Imposter" [value]="imposter.boardImage || undefined" (changed)="setImposterImage($event)" />
          }
        </details>
      }

      <footer>
        @if (issues().length) {
          <ul class="problem">
            @for (issue of issues(); track issue) {
              <li>{{ issue }}</li>
            }
          </ul>
        } @else {
          <p class="ok">Diese Frage ist fertig.</p>
        }
        <div class="actions">
          <button type="button" class="quiet" (click)="clear()">Frage leeren</button>
          <button type="button" class="primary" (click)="next()">Nächste Frage</button>
        </div>
      </footer>
    } @else {
      <p class="muted">Wähle links eine Kachel aus, um die Frage zu bearbeiten.</p>
    }
  `,
  styles: `
    :host {
      display: grid;
      gap: 1rem;
    }
    header,
    .actions {
      align-items: center;
      display: flex;
      gap: 0.5rem;
      justify-content: space-between;
    }
    h2 {
      color: var(--gold-strong);
    }
    h3 {
      font-size: 1em;
    }
    fieldset {
      border: 0;
      display: grid;
      gap: 0.4rem;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      margin: 0;
      padding: 0;
    }
    legend {
      color: var(--muted);
      margin-bottom: 0.25rem;
      padding: 0;
    }
    .modes label {
      border: 1px solid var(--line);
      border-radius: var(--radius);
      cursor: pointer;
      display: grid;
      gap: 0.15rem;
      padding: 0.5rem;
    }
    .modes label.on {
      border-color: var(--gold-strong);
      box-shadow: 0 0 0 1px var(--gold-strong);
    }
    .modes label:focus-within {
      outline: 2px solid var(--gold-strong);
    }
    .modes input {
      height: 1px;
      opacity: 0;
      position: absolute;
      width: 1px;
    }
    small {
      color: var(--muted);
    }
    .field {
      color: var(--muted);
      display: grid;
      gap: 0.25rem;
    }
    .check {
      align-items: center;
      display: flex;
      gap: 0.5rem;
    }
    .check input {
      width: auto;
    }
    section,
    details {
      border-top: 1px solid var(--line);
      display: grid;
      gap: 0.6rem;
      padding-top: 0.8rem;
    }
    summary {
      cursor: pointer;
      margin-bottom: 0.4rem;
    }
    footer {
      border-top: 1px solid var(--line);
      display: grid;
      gap: 0.6rem;
      padding-top: 0.8rem;
    }
    .problem {
      color: #ff9a8a;
      margin: 0;
    }
    ul.problem {
      padding-left: 1.2rem;
    }
    .ok {
      color: #8fd49c;
    }
  `,
})
export class QuestionForm {
  protected readonly store = inject(EditorStore);
  protected readonly modes = MODES;
  protected readonly question = this.store.question;

  protected readonly title = computed(() => {
    const selected = this.store.selected();
    if (!selected) return '';
    const category = this.store.quiz().categories[selected.category]!;
    return `${category.name || `Kategorie ${selected.category + 1}`}, ${TILE_POINTS[selected.row]} Gold`;
  });

  protected readonly issues = computed(() => {
    const question = this.question();
    return question ? questionIssues(question, this.store.hasFile()) : [];
  });

  protected readonly options = computed(() => this.question()?.options?.join('\n') ?? '');

  protected value(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

  protected badLink(url: string | undefined): boolean {
    return !!url && !youtubeId(url);
  }

  protected change(field: 'prompt', value: string): void {
    this.store.updateQuestion((question) => (question[field] = value));
  }

  protected setMode(mode: QuestionMode): void {
    this.store.updateQuestion((question) => {
      question.mode = mode;
      if (mode === 'map') question.map ??= { image: DEFAULT_MAP, goal: null };
    });
  }

  protected setBonus(bonus: boolean): void {
    this.store.updateQuestion((question) => {
      if (bonus) question.bonus = true;
      else delete question.bonus;
    });
  }

  protected setMedia(target: 'media' | 'answer', field: keyof MediaSet, value: string | undefined): void {
    this.store.updateQuestion((question) => {
      const set: MediaSet = (question[target] ??= {});
      if (value) set[field] = value;
      else delete set[field];
    });
  }

  protected setBoardImage(ref: string | undefined): void {
    this.store.updateQuestion((question) => {
      if (ref) question.boardImage = ref;
      else delete question.boardImage;
    });
  }

  protected setBoardNotes(active: boolean): void {
    this.store.updateQuestion((question) => {
      if (active) question.boardNotes = true;
      else delete question.boardNotes;
    });
  }

  protected setOptions(text: string): void {
    this.store.updateQuestion((question) => {
      const options = text.split('\n');
      if (text.trim()) question.options = options;
      else delete question.options;
    });
  }

  protected setImposter(active: boolean): void {
    this.store.updateQuestion((question) => {
      if (active) question.imposter = { slot: 0, boardImage: '' };
      else delete question.imposter;
    });
  }

  protected setImposterSlot(slot: string): void {
    this.store.updateQuestion((question) => (question.imposter!.slot = Number(slot)));
  }

  protected setImposterImage(ref: string | undefined): void {
    this.store.updateQuestion((question) => (question.imposter!.boardImage = ref ?? ''));
  }

  protected clear(): void {
    if (!confirm('Diese Frage wirklich leeren?')) return;
    const selected = this.store.selected()!;
    this.store.updateQuiz((quiz) => {
      const fresh: QuestionDef = emptyQuestion();
      quiz.categories[selected.category]!.questions[selected.row] = fresh;
    });
  }

  protected next(): void {
    const selected = this.store.selected();
    if (!selected) return;
    const count = this.store.quiz().categories.length;
    const row = (selected.row + 1) % TILE_POINTS.length;
    const category = row === 0 ? (selected.category + 1) % count : selected.category;
    this.store.selected.set({ category, row });
    window.scrollTo({ top: 0 });
  }
}
