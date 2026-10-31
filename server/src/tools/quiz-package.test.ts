import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { strToU8, zipSync } from 'fflate';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { type QuizData, emptyQuiz } from '@quiz/shared';
import { CATALOG } from '../catalog.js';
import { PackageError, exportPackage, importPackage } from './quiz-package.js';

function completeQuiz(): QuizData {
  const quiz = emptyQuiz();
  quiz.title = 'Test';
  quiz.categories.forEach((category, c) => {
    category.name = `Kat ${c}`;
    category.image = 'media/cat.png';
    category.questions.forEach((question, r) => {
      question.prompt = `Frage ${c}-${r}`;
      question.answer = { text: 'Antwort' };
    });
  });
  return quiz;
}

const pack = (quiz: unknown, files: Record<string, Uint8Array> = { 'media/cat.png': new Uint8Array([1, 2, 3]) }) =>
  zipSync({ 'quiz.json': strToU8(JSON.stringify(quiz)), ...files });

describe('Fragen-Paket', () => {
  let root: string;
  let paths: { publicDir: string; quizFile: string };

  beforeEach(() => {
    root = mkdtempSync(join(tmpdir(), 'quiz-'));
    paths = { publicDir: join(root, 'public'), quizFile: join(root, 'quiz.json') };
    mkdirSync(join(paths.publicDir, 'assets/geo'), { recursive: true });
    writeFileSync(paths.quizFile, '{"alt":true}');
  });

  afterEach(() => rmSync(root, { recursive: true, force: true }));

  it('bindet ein vollständiges Paket ein', () => {
    const quiz = importPackage(pack(completeQuiz()), paths);
    expect(quiz.categories[0]!.image).toBe('assets/quiz/cat.png');
    expect(existsSync(join(paths.publicDir, 'assets/quiz/cat.png'))).toBe(true);
    expect(JSON.parse(readFileSync(paths.quizFile, 'utf8')).title).toBe('Test');
  });

  it('entfernt Medien des vorherigen Quiz', () => {
    importPackage(pack(completeQuiz()), paths);
    const next = completeQuiz();
    next.categories.forEach((category) => (category.image = 'media/neu.png'));
    importPackage(pack(next, { 'media/neu.png': new Uint8Array([9]) }), paths);
    expect(existsSync(join(paths.publicDir, 'assets/quiz/cat.png'))).toBe(false);
  });

  it('lässt das aktuelle Quiz bei Fehlern unangetastet', () => {
    const quiz = completeQuiz();
    quiz.categories[1]!.questions[2]!.prompt = '';
    quiz.categories[1]!.questions[3]!.answer = {};
    try {
      importPackage(pack(quiz), paths);
      expect.unreachable();
    } catch (error) {
      expect((error as PackageError).issues).toEqual(['Kat 1, 300: Der Fragetext fehlt.', 'Kat 1, 400: Die Lösung fehlt.']);
    }
    expect(readFileSync(paths.quizFile, 'utf8')).toBe('{"alt":true}');
  });

  it('meldet fehlende Dateien, Kartenziele und falsche YouTube-Links', () => {
    const quiz = completeQuiz();
    quiz.categories[0]!.questions[0] = { mode: 'map', prompt: 'Wo?', answer: {}, map: { image: 'assets/geo/fehlt.png', goal: null } };
    quiz.categories[0]!.questions[1]!.answer = { video: 'https://example.com/video' };
    expect(() => importPackage(pack(quiz), paths)).toThrow(PackageError);
    try {
      importPackage(pack(quiz), paths);
    } catch (error) {
      expect((error as PackageError).issues.join()).toMatch(/Ziel auf der Karte/);
      expect((error as PackageError).issues.join()).toMatch(/YouTube-Link/);
      expect((error as PackageError).issues.join()).toMatch(/Datei fehlt/);
    }
  });

  it('weist kaputte Pakete und fremde Dateien ab', () => {
    expect(() => importPackage(new Uint8Array([1, 2, 3]), paths)).toThrow('kein gültiges');
    expect(() => importPackage(pack({ categories: 'x' }), paths)).toThrow(PackageError);
    expect(() => importPackage(zipSync({ 'bild.png': new Uint8Array([1]) }), paths)).toThrow('kein gültiges');
  });

  it('schreibt niemals außerhalb des Medienordners', () => {
    expect(() => importPackage(pack(completeQuiz(), { '../../boese.js': new Uint8Array([1]) }), paths)).toThrow('Unerlaubte Datei');
    expect(() => importPackage(pack(completeQuiz(), { 'media/boese.html': new Uint8Array([1]) }), paths)).toThrow('Unerlaubte Datei');
  });

  it('verweigert Pfade aus dem Projekt heraus', () => {
    const quiz = completeQuiz();
    quiz.categories[0]!.image = 'assets/../../quiz.json';
    expect(() => importPackage(pack(quiz), paths)).toThrow(PackageError);
  });

  it('übersteht Export und erneuten Import ohne Verlust', () => {
    importPackage(pack(completeQuiz()), paths);
    const before = readFileSync(paths.quizFile, 'utf8');
    importPackage(exportPackage(paths), paths);
    expect(JSON.parse(readFileSync(paths.quizFile, 'utf8')).categories[0].name).toBe('Kat 0');
    expect(JSON.parse(readFileSync(paths.quizFile, 'utf8')).categories[4].questions[4]).toEqual(
      JSON.parse(before).categories[4].questions[4],
    );
  });

  it('behält die Schreibspalte beim Einbinden', () => {
    const quiz = completeQuiz();
    quiz.categories[0]!.questions[0] = { mode: 'whiteboard', prompt: 'Mal!', answer: { text: 'A' }, boardImage: 'media/cat.png', boardNotes: true };
    expect(importPackage(pack(quiz), paths).categories[0]!.questions[0]).toMatchObject({ boardNotes: true, boardImage: 'assets/quiz/cat.png' });
  });

  it('kommt mit dem echten Quiz zurecht', () => {
    expect(CATALOG.flatMap((category) => category.questions)).toHaveLength(25);
  });
});
