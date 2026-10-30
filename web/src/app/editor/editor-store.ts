import { Injectable, OnDestroy, computed, signal } from '@angular/core';
import { strFromU8, strToU8, unzipSync, zipSync } from 'fflate';
import {
  BOARD_CATEGORIES,
  MEDIA_FILE,
  type QuestionDef,
  type QuizData,
  TILE_POINTS,
  emptyQuiz,
  isBlank,
  mapMediaRefs,
  questionIssues,
  quizIssues,
} from '@quiz/shared';
import { loadDraft, saveDraft } from './draft-db';

const SAVE_DELAY_MS = 400;
const QUIZ_JSON = 'quiz.json';
const DOWNLOAD_RELEASE_MS = 60_000;

export type SaveState = 'saved' | 'saving' | 'failed';
export type TileState = 'blank' | 'open' | 'done';

@Injectable()
export class EditorStore implements OnDestroy {
  readonly quiz = signal<QuizData>(emptyQuiz());
  readonly files = signal<Record<string, Blob>>({});
  readonly selected = signal<{ category: number; row: number } | null>(null);
  readonly saveState = signal<SaveState>('saved');
  readonly notice = signal('');
  readonly loaded = signal(false);

  readonly hasFile = computed(() => {
    const files = this.files();
    return (ref: string) => (ref.startsWith('media/') ? ref in files : true);
  });
  readonly issues = computed(() => quizIssues(this.quiz(), this.hasFile()));
  readonly doneCount = computed(
    () =>
      this.quiz()
        .categories.flatMap((category) => category.questions)
        .filter((question) => this.tileState(question) === 'done').length,
  );
  readonly question = computed(() => {
    const selected = this.selected();
    return selected ? this.quiz().categories[selected.category]?.questions[selected.row] ?? null : null;
  });

  private readonly urls = new Map<string, string>();
  private saveTimer: ReturnType<typeof setTimeout> | undefined;

  async load(): Promise<void> {
    try {
      const draft = await loadDraft();
      if (draft) this.apply(draft.quiz, draft.files);
    } catch {
      this.saveState.set('failed');
    }
    this.loaded.set(true);
  }

  ngOnDestroy(): void {
    clearTimeout(this.saveTimer);
    this.urls.forEach((url) => URL.revokeObjectURL(url));
  }

  tileState(question: QuestionDef): TileState {
    if (isBlank(question)) return 'blank';
    return questionIssues(question, this.hasFile()).length ? 'open' : 'done';
  }

  /** Vorschau-Adresse für einen Dateiverweis. */
  url(ref: string): string {
    const blob = this.files()[ref];
    if (!blob) return ref;
    let url = this.urls.get(ref);
    if (!url) {
      url = URL.createObjectURL(blob);
      this.urls.set(ref, url);
    }
    return url;
  }

  updateQuiz(change: (quiz: QuizData) => void): void {
    this.quiz.update((quiz) => {
      const copy = structuredClone(quiz);
      change(copy);
      return copy;
    });
    this.scheduleSave();
  }

  updateQuestion(change: (question: QuestionDef) => void): void {
    const selected = this.selected();
    if (!selected) return;
    this.updateQuiz((quiz) => change(quiz.categories[selected.category]!.questions[selected.row]!));
  }

  /** Nimmt eine Datei auf und liefert den Verweis, oder null bei einem unpassenden Dateityp. */
  addFile(file: File): string | null {
    const extension = file.name.split('.').pop()?.toLowerCase() ?? '';
    const id = `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
    const ref = `media/${id}.${extension}`;
    if (!MEDIA_FILE.test(ref)) {
      this.notice.set(`"${file.name}" geht leider nicht. Erlaubt sind PNG, JPG, WEBP, GIF, MP3, OGG, WAV und M4A.`);
      return null;
    }
    this.notice.set('');
    this.files.update((files) => ({ ...files, [ref]: file }));
    return ref;
  }

  async download(): Promise<void> {
    const data = await this.pack();
    const link = document.createElement('a');
    link.href = URL.createObjectURL(new Blob([data.slice()], { type: 'application/zip' }));
    link.download = `${slug(this.quiz().title) || 'quiz'}.zip`;
    link.click();
    // Erst später freigeben, sonst bricht Firefox den Download ab.
    setTimeout(() => URL.revokeObjectURL(link.href), DOWNLOAD_RELEASE_MS);
  }

  async open(file: File): Promise<void> {
    try {
      const entries = unzipSync(new Uint8Array(await file.arrayBuffer()));
      const quiz = JSON.parse(strFromU8(entries[QUIZ_JSON]!)) as QuizData;
      if (quiz.categories?.length !== BOARD_CATEGORIES) throw new Error('Unerwarteter Aufbau');
      const files: Record<string, Blob> = {};
      for (const [name, data] of Object.entries(entries)) {
        if (MEDIA_FILE.test(name)) files[name] = new Blob([data.slice()]);
      }
      this.apply(quiz, files);
      this.notice.set('');
      this.scheduleSave();
    } catch {
      this.notice.set('Diese Datei ist kein Fragen-Paket.');
    }
  }

  reset(): void {
    this.apply(emptyQuiz(), {});
    this.scheduleSave();
  }

  private apply(quiz: QuizData, files: Record<string, Blob>): void {
    this.urls.forEach((url) => URL.revokeObjectURL(url));
    this.urls.clear();
    this.files.set(files);
    this.quiz.set(quiz);
    this.selected.set(null);
  }

  /** Packt nur Dateien ein, die noch verwendet werden. */
  private async pack(): Promise<Uint8Array> {
    const used = new Set<string>();
    mapMediaRefs(this.quiz(), (ref) => {
      if (ref.startsWith('media/')) used.add(ref);
      return ref;
    });

    const entries: Record<string, Uint8Array> = { [QUIZ_JSON]: strToU8(JSON.stringify(this.quiz())) };
    for (const ref of used) {
      const blob = this.files()[ref];
      if (blob) entries[ref] = new Uint8Array(await blob.arrayBuffer());
    }
    return zipSync(entries, { level: 0 });
  }

  private scheduleSave(): void {
    this.saveState.set('saving');
    clearTimeout(this.saveTimer);
    this.saveTimer = setTimeout(() => {
      saveDraft({ quiz: this.quiz(), files: this.files() })
        .then(() => this.saveState.set('saved'))
        .catch(() => this.saveState.set('failed'));
    }, SAVE_DELAY_MS);
  }
}

export function tileLabel(row: number): number {
  return TILE_POINTS[row] ?? 0;
}

function slug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/^-|-$/g, '');
}
