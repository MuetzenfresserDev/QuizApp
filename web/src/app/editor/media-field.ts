import { Component, inject, input, output, signal } from '@angular/core';
import { EditorStore } from './editor-store';

const ACCEPT = {
  image: '.png,.jpg,.jpeg,.webp,.gif',
  audio: '.mp3,.ogg,.wav,.m4a',
};

/** Eine Datei auswählen oder hineinziehen, mit Vorschau. */
@Component({
  selector: 'app-media-field',
  template: `
    <span class="label">{{ label() }}</span>
    @if (value(); as value) {
      <div class="preview">
        @if (kind() === 'image') {
          <img [src]="store.url(value)" alt="Vorschau" />
        } @else {
          <audio controls [src]="store.url(value)"></audio>
        }
        <button type="button" class="quiet" (click)="changed.emit(undefined)">Entfernen</button>
      </div>
    } @else {
      <label class="drop" [class.over]="over()" (dragover)="allow($event)" (dragleave)="over.set(false)" (drop)="drop($event)">
        <input type="file" [accept]="accept()" (change)="pick($event)" />
        <span>{{ kind() === 'image' ? 'Bild' : 'Audio' }} hierher ziehen oder klicken</span>
      </label>
    }
  `,
  styles: `
    :host {
      display: grid;
      gap: 0.25rem;
    }
    .label {
      color: var(--muted);
    }
    .drop {
      border: 2px dashed var(--line);
      border-radius: var(--radius);
      cursor: pointer;
      display: block;
      padding: 0.7rem;
      text-align: center;
    }
    .drop.over,
    .drop:hover {
      border-color: var(--gold-strong);
    }
    .drop:focus-within {
      outline: 2px solid var(--gold-strong);
    }
    input {
      height: 1px;
      opacity: 0;
      position: absolute;
      width: 1px;
    }
    .preview {
      align-items: center;
      display: flex;
      gap: 0.6rem;
    }
    img {
      border-radius: 4px;
      max-height: 7rem;
      max-width: 60%;
    }
    audio {
      flex: 1;
      min-width: 0;
    }
  `,
})
export class MediaField {
  protected readonly store = inject(EditorStore);

  readonly label = input.required<string>();
  readonly kind = input<'image' | 'audio'>('image');
  readonly value = input<string | undefined>();
  readonly changed = output<string | undefined>();

  protected readonly over = signal(false);

  protected accept(): string {
    return ACCEPT[this.kind()];
  }

  protected allow(event: DragEvent): void {
    event.preventDefault();
    this.over.set(true);
  }

  protected drop(event: DragEvent): void {
    event.preventDefault();
    this.over.set(false);
    this.take(event.dataTransfer?.files[0]);
  }

  protected pick(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.take(input.files?.[0]);
    input.value = '';
  }

  private take(file: File | undefined): void {
    const ref = file && this.store.addFile(file);
    if (ref) this.changed.emit(ref);
  }
}
