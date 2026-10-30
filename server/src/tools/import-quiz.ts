import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { PackageError, importPackage, projectPaths } from './quiz-package.js';

const file = process.argv[2];
if (!file) {
  console.error('Aufruf: npm run import-quiz <paket.zip>');
  process.exit(1);
}

try {
  const quiz = importPackage(readFileSync(resolve(file)), projectPaths(process.cwd()));
  const count = quiz.categories.reduce((sum, category) => sum + category.questions.length, 0);
  console.log(`"${quiz.title}" eingebunden: ${quiz.categories.length} Kategorien, ${count} Fragen.`);
} catch (error) {
  if (!(error instanceof PackageError)) throw error;
  console.error(error.message);
  for (const issue of error.issues) console.error(`  - ${issue}`);
  process.exit(1);
}
