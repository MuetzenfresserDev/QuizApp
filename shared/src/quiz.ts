import { type MediaSet, type Point, type QuestionMode, TILE_POINTS, youtubeId } from './protocol';

/**
 * Ein Quiz, wie es der Server spielt und wie es im Paket liegt.
 *
 * - whiteboard deckt auch Schätz-, Fehler-, Multiple-Choice- und Voiceline-Fragen ab.
 * - map.goal ist in Pixeln der 850x592 großen Karte angegeben.
 * - imposter: Der Spieler auf diesem Platz (0-3) bekommt ein anderes Whiteboard-Bild.
 */
export interface QuestionDef {
  mode: QuestionMode;
  prompt: string;
  bonus?: boolean;
  options?: string[];
  media?: MediaSet;
  answer: MediaSet;
  boardImage?: string;
  imposter?: { slot: number; boardImage: string };
  map?: { image: string; goal: Point | null };
}

export interface CategoryDef {
  name: string;
  image: string;
  questions: QuestionDef[];
}

export interface QuizData {
  title: string;
  categories: CategoryDef[];
}

export const BOARD_CATEGORIES = 5;
export const MEDIA_FILE = /^media\/[\w-]+\.(png|jpe?g|webp|gif|mp3|ogg|wav|m4a)$/i;
/** Diese Ordner gehören zur App und wandern nicht ins Paket. */
export const BUILT_IN_ASSETS = ['assets/geo/', 'assets/katPictures/'];
export const DEFAULT_MAP = 'assets/geo/karte_der_Kolonie_remake.png';

export function emptyQuestion(): QuestionDef {
  return { mode: 'buzzer', prompt: '', media: {}, answer: {} };
}

export function emptyQuiz(): QuizData {
  return {
    title: '',
    categories: Array.from({ length: BOARD_CATEGORIES }, (_, index) => ({
      name: '',
      image: `assets/katPictures/Kat ${index + 1}.png`,
      questions: TILE_POINTS.map(emptyQuestion),
    })),
  };
}

/** Noch gar nicht angefasst, also keine Fehlermeldungen wert. */
export function isBlank(question: QuestionDef): boolean {
  const { prompt, media = {}, answer } = question;
  return !prompt.trim() && !hasMedia(media) && !hasMedia(answer) && !question.map?.goal;
}

export function hasMedia(set: MediaSet): boolean {
  return !!(set.text?.trim() || set.image || set.video || set.audio);
}

/** Ruft fn für jeden Verweis auf eine Datei auf und ersetzt ihn durch das Ergebnis. */
export function mapMediaRefs(quiz: QuizData, fn: (ref: string) => string): QuizData {
  const set = (media: MediaSet = {}): MediaSet => ({
    ...media,
    ...(media.image ? { image: fn(media.image) } : {}),
    ...(media.audio ? { audio: fn(media.audio) } : {}),
  });
  return {
    ...quiz,
    categories: quiz.categories.map((category) => ({
      ...category,
      image: fn(category.image),
      questions: category.questions.map((question) => ({
        ...question,
        media: set(question.media),
        answer: set(question.answer),
        ...(question.boardImage ? { boardImage: fn(question.boardImage) } : {}),
        ...(question.imposter ? { imposter: { ...question.imposter, boardImage: fn(question.imposter.boardImage) } } : {}),
        ...(question.map ? { map: { ...question.map, image: fn(question.map.image) } } : {}),
      })),
    })),
  };
}

/** Was an dieser Frage noch fehlt, in Worten für den Admin. */
export function questionIssues(question: QuestionDef, hasFile: (ref: string) => boolean): string[] {
  const issues: string[] = [];
  const { media = {}, answer } = question;

  if (!question.prompt.trim()) issues.push('Der Fragetext fehlt.');
  if (question.mode === 'map') {
    if (!question.map?.image) issues.push('Es ist keine Karte ausgewählt.');
    if (!question.map?.goal) issues.push('Das Ziel auf der Karte fehlt.');
  } else if (!hasMedia(answer)) {
    issues.push('Die Lösung fehlt.');
  }
  if (question.imposter && !question.imposter.boardImage) issues.push('Das Imposter-Bild fehlt.');

  for (const url of [media.video, answer.video]) {
    if (url && !youtubeId(url)) issues.push(`"${url}" ist kein gültiger YouTube-Link.`);
  }
  const refs = [media.image, media.audio, answer.image, answer.audio, question.boardImage, question.imposter?.boardImage, question.map?.image];
  if (refs.some((ref) => ref && !hasFile(ref))) issues.push('Eine Datei fehlt im Paket.');
  return issues;
}

/** Alle offenen Punkte des Quiz; leer bedeutet: bereit zum Einbinden. */
export function quizIssues(quiz: QuizData, hasFile: (ref: string) => boolean): string[] {
  const issues: string[] = [];
  if (quiz.categories.length !== BOARD_CATEGORIES) issues.push(`Das Quiz braucht ${BOARD_CATEGORIES} Kategorien.`);

  quiz.categories.forEach((category, index) => {
    const name = category.name.trim() || `Kategorie ${index + 1}`;
    if (!category.name.trim()) issues.push(`${name}: Der Name fehlt.`);
    if (!hasFile(category.image)) issues.push(`${name}: Das Kategoriebild fehlt.`);
    if (category.questions.length !== TILE_POINTS.length) issues.push(`${name}: Es müssen ${TILE_POINTS.length} Fragen sein.`);
    category.questions.forEach((question, row) => {
      for (const issue of questionIssues(question, hasFile)) issues.push(`${name}, ${TILE_POINTS[row]}: ${issue}`);
    });
  });
  return issues;
}
