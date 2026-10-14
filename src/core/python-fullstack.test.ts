import { describe, expect, it } from "vitest";
import { preparedExams } from "../prepared_exams";
import { createAttempt, loadBank, sampleQuestions, validateQuestion } from "./index";

const preset = preparedExams.find((p) => p.id === "python-pg-fullstack")!;
const expected = {
  "Python": 12,
  "DDD, design i architektura": 10,
  "Frameworki i biblioteki Python": 8,
  "React i TypeScript": 6,
  "Bazy danych i technologie dodatkowe": 4,
};
function seededRandom(seed: number) {
  return () => ((seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0) / 2 ** 32);
}

describe("Python PG fullstack curriculum", () => {
  it("includes explained React/TypeScript, architecture and Python frameworks", async () => {
    const bank = await loadBank("python-fullstack");
    expect(bank.quiz_elements).toHaveLength(94);
    expect(new Set(bank.quiz_elements.map((q) => q.question)).size).toBe(94);
    for (const q of bank.quiz_elements) {
      expect(q.explanation!.length).toBeGreaterThan(20);
      expect(q.sources!.length).toBeGreaterThan(0);
      expect(Object.keys(expected)).toContain(q.section);
    }
    const frontend = bank.quiz_elements.filter((q) => q.section === "React i TypeScript");
    expect(frontend).toHaveLength(15);
    expect(frontend.every((q) => q.interview_sources?.length)).toBe(true);
    const sourced = frontend.filter((q) => q.family?.startsWith("python-fullstack-interview-ts-"));
    expect(sourced).toHaveLength(6);
    expect(sourced.every((q) => q.interview_sources!.length >= 2)).toBe(true);
    expect(Object.isFrozen(sourced[0].interview_sources)).toBe(true);
    expect(() => validateQuestion({ ...sourced[0], interview_sources: ["javascript:alert(1)"] })).toThrow();
    expect(bank.quiz_elements.some((q) => q.family?.startsWith("python-fullstack-new-"))).toBe(false);
    expect(frontend.some((q) => q.question.includes("TypeScript"))).toBe(true);
    expect(frontend.some((q) => q.question.includes("React"))).toBe(true);
    for (const subject of ["DDD", "FastAPI", "Django", "DRF", "Pydantic", "PostgreSQL", "Redis", "Elasticsearch"]) {
      expect(bank.quiz_elements.some((q) => q.question.includes(subject)), subject).toBe(true);
    }
  });

  it("preserves exact requested proportions and frontend priority on every draw", async () => {
    const bank = await loadBank("python-fullstack");
    const signatures = new Set<string>();
    for (let seed = 1; seed <= 200; seed++) {
      const qs = sampleQuestions(preset.config, [bank], seededRandom(seed));
      expect(qs).toHaveLength(40);
      expect(new Set(qs.map((q) => q.family)).size).toBe(40);
      for (const [section, count] of Object.entries(expected)) {
        expect(qs.filter((q) => q.section === section), `seed ${seed}: ${section}`).toHaveLength(count);
      }
      signatures.add(qs.map((q) => q.question).sort().join("\n"));
    }
    expect(signatures.size).toBe(200);
  });

  it("starts a thirty-minute forty-question exam with strict answer scoring", async () => {
    const attempt = await createAttempt(preset.config, preset.title, 1000, seededRandom(4));
    expect(attempt.deadline).toBe(1_801_000);
    expect(attempt.pages).toHaveLength(8);
    expect(attempt.questions).toHaveLength(40);
    expect(attempt.config.choiceScoring).toBe("strict");
    expect(attempt.config.wrongAnswerPenalty).toBe(0);
  });
});
