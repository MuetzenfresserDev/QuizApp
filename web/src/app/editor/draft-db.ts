import type { QuizData } from '@quiz/shared';

export interface Draft {
  quiz: QuizData;
  files: Record<string, Blob>;
}

const DB_NAME = 'quiz-editor';
const STORE = 'draft';
const KEY = 'current';

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => request.result.createObjectStore(STORE);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function run<T>(mode: IDBTransactionMode, work: (store: IDBObjectStore) => IDBRequest<T>): Promise<T> {
  return openDb().then(
    (db) =>
      new Promise((resolve, reject) => {
        const request = work(db.transaction(STORE, mode).objectStore(STORE));
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      }),
  );
}

/** IndexedDB, weil localStorage für Bilder und Audio viel zu klein ist. */
export const loadDraft = (): Promise<Draft | undefined> => run('readonly', (store) => store.get(KEY));

export const saveDraft = (draft: Draft): Promise<IDBValidKey> => run('readwrite', (store) => store.put(draft, KEY));
