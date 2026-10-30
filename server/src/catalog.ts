import type { CategoryDef, QuizData } from '@quiz/shared';
import quiz from './quiz.json';

export type { CategoryDef, QuestionDef } from '@quiz/shared';

/**
 * Das aktuelle Quiz. Es liegt nur auf dem Server, damit Lösungen nicht im Client-Bundle landen.
 * quiz.json wird nicht von Hand gepflegt, sondern mit "npm run import-quiz" ersetzt.
 */
export const CATALOG: CategoryDef[] = (quiz as QuizData).categories;
