import { resolve } from 'node:path';
import { exportPackage, projectPaths, writeFileWithDirs } from './quiz-package.js';

const target = resolve(process.argv[2] ?? 'quiz-paket.zip');
writeFileWithDirs(target, exportPackage(projectPaths(process.cwd())));
console.log(`Paket geschrieben: ${target}`);
