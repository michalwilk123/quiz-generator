import type { Attempt, Answer } from "./attempt";
import type { Question } from "./banks";
import type { ExamConfig } from "./config";
export function normalizeText(text: string): string {
  return text
    .normalize("NFKC")
    .toLowerCase()
    .replace(/\s+/gu, " ")
    .trim()
    .replace(/[.,]+$/u, "")
    .trim();
}
// Sørensen–Dice character bigrams preserve the original text-similarity approach.
// This measures wording overlap, not whether a paraphrase is factually correct.
export function textSimilarity(a: string, b: string): number {
  if (a === b) return 1;
  a = a.replace(/\s/g, "");
  b = b.replace(/\s/g, "");
  if (a.length < 2 || b.length < 2) return 0;
  const counts = new Map<string, number>();
  for (let i = 0; i < a.length - 1; i++) {
    const pair = a.slice(i, i + 2);
    counts.set(pair, (counts.get(pair) ?? 0) + 1);
  }
  let matches = 0;
  for (let i = 0; i < b.length - 1; i++) {
    const pair = b.slice(i, i + 2),
      count = counts.get(pair) ?? 0;
    if (count) {
      matches++;
      counts.set(pair, count - 1);
    }
  }
  return (2 * matches) / (a.length + b.length - 2);
}
export function gradeQuestion(
  question: Question,
  answer: Answer,
  config: ExamConfig,
  manualGrade: number | null = null,
): number | null {
  if (question.type.endsWith("_open")) {
    if (config.writtenGrading === "manual") return manualGrade;
    const actual = normalizeText(typeof answer === "string" ? answer : ""),
      expected = normalizeText(question.correct_answer ?? "");
    if (!actual) return 0;
    if (actual === expected) return 1;
    if (question.type === "short_open") return 0;
    const similarity = textSimilarity(actual, expected);
    return similarity < 0.4
      ? 0
      : similarity > 0.85
        ? 1
        : Math.round(similarity * 100) / 100;
  }
  if (question.type === "one_choice")
    return !answer
      ? 0
      : answer === question.correct_answer
        ? 1
        : 0 - config.wrongAnswerPenalty;
  const selected = Array.isArray(answer) ? [...new Set(answer)] : [];
  if (!selected.length) return 0;
  const correct = question.correct_answers!;
  const hits = selected.filter((a) => correct.includes(a)).length;
  const misses = selected.length - hits;
  if (config.choiceScoring === "strict")
    return hits === correct.length && misses === 0
      ? 1
      : 0 - config.wrongAnswerPenalty;
  // Without a configured penalty, incorrect selections offset correct selections but never produce negative points.
  return (
    Math.max(0, (hits - misses) / correct.length) -
    (misses ? config.wrongAnswerPenalty : 0)
  );
}
export interface QuestionScore {
  earned: number;
  possible: number;
  fraction: number | null;
}
export interface AttemptScore {
  earned: number;
  possible: number;
  pending: number;
  percentage: number | null;
  questions: QuestionScore[];
}
export function scoreAttempt(attempt: Attempt): AttemptScore {
  const questions = attempt.questions.map((q, i) => {
    const possible = attempt.config.useQuestionWeights ? (q.scale ?? 1) : 1;
    const fraction =
      attempt.status === "submitted"
        ? gradeQuestion(
            q,
            attempt.answers[i],
            attempt.config,
            attempt.manualGrades[i],
          )
        : null;
    return { possible, fraction, earned: (fraction ?? 0) * possible };
  });
  const earned = questions.reduce((sum, q) => sum + q.earned, 0),
    possible = questions.reduce((sum, q) => sum + q.possible, 0);
  const pending = questions.filter((q) => q.fraction === null).length;
  return {
    earned,
    possible,
    pending,
    percentage: pending ? null : (100 * earned) / possible,
    questions,
  };
}
