import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { basename, dirname, extname, join } from 'node:path';
import { strFromU8, strToU8, unzipSync, zipSync } from 'fflate';
import { BUILT_IN_ASSETS, MEDIA_FILE, type QuizData, mapMediaRefs, quizIssues } from '@quiz/shared';

const QUIZ_JSON = 'quiz.json';
const IMPORTED_ASSETS = 'assets/quiz';

export class PackageError extends Error {
  constructor(
    message: string,
    readonly issues: string[] = [],
  ) {
    super(message);
  }
}

interface Paths {
  publicDir: string;
  quizFile: string;
}

export function projectPaths(root: string): Paths {
  return { publicDir: join(root, 'web/public'), quizFile: join(root, 'server/src/quiz.json') };
}

function assetExists(ref: string, paths: Paths): boolean {
  if (ref.includes('..')) return false;
  return ref.startsWith('assets/') && existsSync(join(paths.publicDir, ref));
}

function parsePackage(zip: Uint8Array): { quiz: QuizData; files: Record<string, Uint8Array> } {
  let entries: Record<string, Uint8Array>;
  let quiz: QuizData;
  try {
    entries = unzipSync(zip);
    quiz = JSON.parse(strFromU8(entries[QUIZ_JSON]!)) as QuizData;
  } catch {
    throw new PackageError('Das ist kein gültiges Fragen-Paket.');
  }

  const files: Record<string, Uint8Array> = {};
  for (const [name, data] of Object.entries(entries)) {
    if (name === QUIZ_JSON || name.endsWith('/')) continue;
    if (!MEDIA_FILE.test(name)) throw new PackageError(`Unerlaubte Datei im Paket: ${name}`);
    files[name] = data;
  }
  return { quiz, files };
}

/** Prüft ein Paket und ersetzt damit das aktuelle Quiz. */
export function importPackage(zip: Uint8Array, paths: Paths): QuizData {
  const { quiz, files } = parsePackage(zip);

  const hasFile = (ref: string) => ref in files || /^https?:\/\//.test(ref) || assetExists(ref, paths);
  let issues: string[];
  try {
    issues = quizIssues(quiz, hasFile);
  } catch {
    throw new PackageError('Das ist kein gültiges Fragen-Paket.');
  }
  if (issues.length) throw new PackageError('Das Paket ist noch nicht vollständig.', issues);

  const target = join(paths.publicDir, IMPORTED_ASSETS);
  rmSync(target, { recursive: true, force: true });
  mkdirSync(target, { recursive: true });
  for (const [name, data] of Object.entries(files)) writeFileSync(join(target, basename(name)), data);

  const imported = mapMediaRefs(quiz, (ref) => (ref.startsWith('media/') ? `${IMPORTED_ASSETS}/${basename(ref)}` : ref));
  writeFileSync(paths.quizFile, `${JSON.stringify(imported, null, 2)}\n`);
  return imported;
}

/** Packt das aktuelle Quiz, damit es im Editor als Vorlage geöffnet werden kann. */
export function exportPackage(paths: Paths): Uint8Array {
  const quiz = JSON.parse(readFileSync(paths.quizFile, 'utf8')) as QuizData;
  const files: Record<string, Uint8Array> = {};
  const names = new Map<string, string>();

  const packaged = mapMediaRefs(quiz, (ref) => {
    if (!ref.startsWith('assets/') || BUILT_IN_ASSETS.some((prefix) => ref.startsWith(prefix))) return ref;
    let name = names.get(ref);
    if (!name) {
      name = `media/file-${names.size + 1}${extname(ref).toLowerCase()}`;
      names.set(ref, name);
      files[name] = readFileSync(join(paths.publicDir, ref));
    }
    return name;
  });

  return zipSync({ [QUIZ_JSON]: strToU8(JSON.stringify(packaged, null, 2)), ...files }, { level: 0 });
}

export function writeFileWithDirs(path: string, data: Uint8Array): void {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, data);
}
