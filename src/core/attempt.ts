import { defaultConfig, validateConfig, type ExamConfig } from "./config";
import {
  loadBank,
  paginateQuestions,
  sampleQuestions,
  validateQuestion,
  type Question,
} from "./banks";
export type Answer = string | string[];
export interface Attempt {
  version: 1;
  id: string;
  title: string;
  config: ExamConfig;
  questions: Question[];
  answers: Answer[];
  manualGrades: (number | null)[];
  pages: number[][];
  startedAt: number;
  deadline: number | null;
  status: "active" | "expired" | "submitted";
  submittedAt: number | null;
}
export async function createAttempt(
  config: ExamConfig = defaultConfig(),
  title = "Practice exam",
  now: number | undefined = undefined,
  random = Math.random,
): Promise<Attempt> {
  const settings = validateConfig(config);
  const banks = await Promise.all(settings.subjects.map((s) => loadBank(s.id)));
  const questions = sampleQuestions(settings, banks, random);
  const startedAt = now ?? Date.now();
  return {
    version: 1,
    id: crypto.randomUUID(),
    title,
    config: settings,
    questions,
    answers: questions.map((q) => (q.type === "multi_choice" ? [] : "")),
    manualGrades: questions.map(() => null),
    pages: paginateQuestions(questions, settings.pageSize),
    startedAt,
    deadline:
      settings.durationMinutes === null
        ? null
        : startedAt + settings.durationMinutes * 60000,
    status: "active",
    submittedAt: null,
  };
}
export function expireAttempt(attempt: Attempt, now = Date.now()): Attempt {
  return attempt.status === "active" &&
    attempt.deadline !== null &&
    now >= attempt.deadline
    ? { ...attempt, status: "expired" }
    : attempt;
}
function validAnswer(question: Question, answer: unknown): answer is Answer {
  if (question.type === "multi_choice")
    return (
      Array.isArray(answer) &&
      answer.every(
        (a) => typeof a === "string" && question.answers!.includes(a),
      ) &&
      new Set(answer).size === answer.length
    );
  return (
    typeof answer === "string" &&
    (question.type !== "one_choice" ||
      answer === "" ||
      question.answers!.includes(answer))
  );
}
export function updateAnswer(
  attempt: Attempt,
  index: number,
  answer: Answer,
  now = Date.now(),
): Attempt {
  const current = expireAttempt(attempt, now);
  if (current.status !== "active") return current;
  const question = current.questions[index];
  if (!question || !validAnswer(question, answer)) return current;
  const answers = current.answers.slice();
  answers[index] = Array.isArray(answer) ? [...answer] : answer;
  return { ...current, answers };
}
export function submitAttempt(attempt: Attempt, now = Date.now()): Attempt {
  return attempt.status === "submitted"
    ? attempt
    : { ...attempt, status: "submitted", submittedAt: now };
}
export function setManualGrade(
  attempt: Attempt,
  index: number,
  fraction: number,
): Attempt {
  const q = attempt.questions[index];
  if (
    attempt.status !== "submitted" ||
    attempt.config.writtenGrading !== "manual" ||
    !q ||
    !q.type.endsWith("_open") ||
    !Number.isFinite(fraction) ||
    fraction < 0 ||
    fraction > 1
  )
    return attempt;
  const manualGrades = [...attempt.manualGrades];
  manualGrades[index] = fraction;
  return { ...attempt, manualGrades };
}
export const ATTEMPT_STORAGE_KEY = "quiz-generator.attempt.v1";
export function saveAttempt(
  attempt: Attempt,
  storage: Pick<Storage, "setItem"> = localStorage,
): void {
  storage.setItem(ATTEMPT_STORAGE_KEY, JSON.stringify(attempt));
}
export function restoreAttempt(
  storage: Pick<Storage, "getItem"> = localStorage,
  now = Date.now(),
): Attempt | null {
  const serialized = storage.getItem(ATTEMPT_STORAGE_KEY);
  if (!serialized) return null;
  try {
    const a = JSON.parse(serialized) as Attempt;
    if (
      !a ||
      a.version !== 1 ||
      typeof a.id !== "string" ||
      typeof a.title !== "string" ||
      !Number.isFinite(a.startedAt) ||
      !["active", "expired", "submitted"].includes(a.status)
    )
      throw new Error();
    validateConfig(a.config);
    if (
      !Array.isArray(a.questions) ||
      !a.questions.length ||
      !Array.isArray(a.answers) ||
      !Array.isArray(a.manualGrades) ||
      a.answers.length !== a.questions.length ||
      a.manualGrades.length !== a.questions.length
    )
      throw new Error();
    a.questions.forEach((q, i) => {
      validateQuestion(q);
      if (!validAnswer(q, a.answers[i])) throw new Error();
    });
    if (
      a.manualGrades.some(
        (g) => g !== null && (!Number.isFinite(g) || g < 0 || g > 1),
      )
    )
      throw new Error();
    const expectedDeadline =
      a.config.durationMinutes === null
        ? null
        : a.startedAt + a.config.durationMinutes * 60000;
    if (
      a.deadline !== expectedDeadline ||
      (a.status === "submitted"
        ? !Number.isFinite(a.submittedAt)
        : a.submittedAt !== null)
    )
      throw new Error();
    if (
      !Array.isArray(a.pages) ||
      a.pages.some((p) => !Array.isArray(p) || !p.length) ||
      JSON.stringify(a.pages.flat()) !==
        JSON.stringify(a.questions.map((_, i) => i))
    )
      throw new Error();
    return expireAttempt(a, now);
  } catch {
    throw new Error(
      "Saved progress could not be restored. Start a new attempt.",
    );
  }
}
