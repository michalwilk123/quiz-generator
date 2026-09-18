import quizConfig from "../quiz_config";
import { QUESTION_TYPES, type ExamConfig, type QuestionType } from "./config";
export interface Question {
  question: string;
  type: QuestionType;
  answers?: string[];
  correct_answers?: string[];
  correct_answer?: string;
  scale?: number;
  explanation?: string;
  sources?: string[];
  section?: string;
  family?: string;
  origin?: "report" | "variant";
}
export interface QuestionBank {
  name: string;
  quiz_elements: Question[];
}
const files = import.meta.glob<{ default: QuestionBank }>("../quizes/*.json");
const cache = new Map<string, Promise<QuestionBank>>();
export function validateQuestion(value: unknown): Question {
  const q = value as Question;
  if (
    [q?.explanation, q?.section, q?.family].some(
      (value) =>
        value !== undefined && (typeof value !== "string" || !value.trim()),
    ) ||
    (q?.sources !== undefined &&
      (!Array.isArray(q.sources) ||
        q.sources.some((url) => {
          if (typeof url !== "string") return true;
          try {
            return new URL(url).protocol !== "https:";
          } catch {
            return true;
          }
        })))
  )
    throw new Error("Pytanie ma nieprawidłowe objaśnienie, dział lub źródło.");
  if (
    !q ||
    typeof q.question !== "string" ||
    !q.question.trim() ||
    !QUESTION_TYPES.includes(q.type) ||
    (q.scale !== undefined && (!Number.isFinite(q.scale) || q.scale <= 0))
  )
    throw new Error("Pytanie ma nieprawidłową treść, typ lub liczbę punktów.");
  if (q.type === "one_choice" || q.type === "multi_choice") {
    if (
      !Array.isArray(q.answers) ||
      q.answers.length < 2 ||
      q.answers.some((a) => typeof a !== "string") ||
      new Set(q.answers).size !== q.answers.length
    )
      throw new Error("Pytanie wyboru ma nieprawidłowe opcje.");
    if (
      q.type === "one_choice" &&
      (typeof q.correct_answer !== "string" ||
        !q.answers.includes(q.correct_answer))
    )
      throw new Error("Pytanie wyboru ma nieprawidłowy klucz odpowiedzi.");
    if (
      q.type === "multi_choice" &&
      (!Array.isArray(q.correct_answers) ||
        !q.correct_answers.length ||
        q.correct_answers.some((a) => !q.answers!.includes(a)) ||
        new Set(q.correct_answers).size !== q.correct_answers.length)
    )
      throw new Error("Pytanie wyboru ma nieprawidłowy klucz odpowiedzi.");
  } else if (typeof q.correct_answer !== "string")
    throw new Error("Pytanie pisemne nie ma wzorcowej odpowiedzi.");
  return q;
}
export async function loadBank(id: string): Promise<QuestionBank> {
  const definition = quizConfig.find((q) => q.urlName === id);
  if (!definition)
    throw new Error(
      `Quiz „${id}” nie jest dostępny. Zaktualizuj konfigurację.`,
    );
  if (!cache.has(id))
    cache.set(
      id,
      (async () => {
        const module = await files[`../quizes/${definition.filename}`]();
        const bank = structuredClone(module.default);
        if (typeof bank.name !== "string" || !Array.isArray(bank.quiz_elements))
          throw new Error(`Quiz „${id}” ma nieprawidłowy format.`);
        for (const q of bank.quiz_elements) {
          validateQuestion(q);
          if (q.answers) Object.freeze(q.answers);
          if (q.correct_answers) Object.freeze(q.correct_answers);
          if (q.sources) Object.freeze(q.sources);
          Object.freeze(q);
        }
        Object.freeze(bank.quiz_elements);
        return Object.freeze(bank);
      })(),
    );
  return cache.get(id)!;
}
export function sampleQuestions(
  config: ExamConfig,
  banks: QuestionBank[],
  random = Math.random,
): Question[] {
  const pools = banks.map((b) =>
    b.quiz_elements.filter((q) => config.questionTypes.includes(q.type)),
  );
  const available = pools.reduce((total, pool) => total + pool.length, 0);
  const count =
    config.questionCount === "all" ? available : config.questionCount;
  if (!available || count > available)
    throw new Error(
      `Dostępne pytania pasujące do ustawień: ${available}. Zmniejsz liczbę pytań lub wybierz więcej quizów albo rodzajów pytań.`,
    );
  const selected: Question[] = [];
  const usedFamilies = new Set<string>();
  const sectionCounts = new Map<string, number>();
  for (let n = 0; n < count; n++) {
    const totalWeight = pools.reduce(
      (total, pool, i) => total + (pool.length ? config.subjects[i].weight : 0),
      0,
    );
    let roll = random() * totalWeight;
    let bankIndex = pools.findIndex(
      (pool, i) => pool.length > 0 && (roll -= config.subjects[i].weight) < 0,
    );
    if (bankIndex < 0)
      bankIndex = pools.findLastIndex((pool) => pool.length > 0);
    const pool = pools[bankIndex];
    // Prefer a new concept and the least represented section within the drawn bank.
    // Existing banks without this optional metadata retain uniform sampling.
    const indexes = pool.map((_, index) => index);
    const fresh = indexes.filter(
      (index) =>
        !pool[index].family ||
        !usedFamilies.has(`${bankIndex}:${pool[index].family}`),
    );
    const candidates = fresh.length ? fresh : indexes;
    const sectionCount = (index: number) =>
      sectionCounts.get(`${bankIndex}:${pool[index].section ?? ""}`) ?? 0;
    const leastUsed = Math.min(...candidates.map(sectionCount));
    const balanced = candidates.filter(
      (index) => sectionCount(index) === leastUsed,
    );
    const index =
      balanced[
        Math.min(balanced.length - 1, Math.floor(random() * balanced.length))
      ];
    selected.push(pool[index]);
    if (pool[index].family)
      usedFamilies.add(`${bankIndex}:${pool[index].family}`);
    const sectionKey = `${bankIndex}:${pool[index].section ?? ""}`;
    sectionCounts.set(sectionKey, (sectionCounts.get(sectionKey) ?? 0) + 1);
    pool[index] = pool[pool.length - 1];
    pool.pop();
  }
  for (let i = selected.length - 1; i > 0; i--) {
    const j = Math.min(i, Math.floor(random() * (i + 1)));
    [selected[i], selected[j]] = [selected[j], selected[i]];
  }
  const questions = structuredClone(selected);
  for (const question of questions) {
    // Answer keys store option text, so reordering does not change grading.
    if (!question.answers) continue;
    for (let i = question.answers.length - 1; i > 0; i--) {
      const j = Math.min(i, Math.floor(random() * (i + 1)));
      [question.answers[i], question.answers[j]] = [
        question.answers[j],
        question.answers[i],
      ];
    }
  }
  return questions;
}
export function paginateQuestions(
  questions: Question[],
  pageSize: ExamConfig["pageSize"],
): number[][] {
  const pages: number[][] = [];
  let page: number[] = [],
    used = 0;
  questions.forEach((q, index) => {
    const cost =
      pageSize === "auto"
        ? q.type === "long_open"
          ? 5
          : q.type === "short_open"
            ? 2
            : 1
        : 1;
    const capacity =
      pageSize === "all" ? Infinity : pageSize === "auto" ? 10 : pageSize;
    if (page.length && used + cost > capacity) {
      pages.push(page);
      page = [];
      used = 0;
    }
    page.push(index);
    used += cost;
  });
  if (page.length) pages.push(page);
  return pages;
}
