import { describe, expect, it } from "vitest";
import { preparedExams } from "../prepared_exams";
import {
  createAttempt,
  gradeQuestion,
  loadBank,
  sampleQuestions,
} from "./index";

function seededRandom(seed: number) {
  return () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 2 ** 32;
  };
}

describe("polski bank pytań Python", () => {
  it("retains all 66 source concepts, six design tasks and explained variations", async () => {
    const bank = await loadBank("python");
    const originals = bank.quiz_elements.filter((q) => q.origin === "report");
    expect(originals).toHaveLength(66);
    expect(new Set(originals.map((q) => q.family))).toEqual(
      new Set(
        Array.from(
          { length: 66 },
          (_, i) => `python-${String(i + 1).padStart(2, "0")}`,
        ),
      ),
    );
    expect(originals.filter((q) => q.type === "long_open")).toHaveLength(6);
    expect(bank.quiz_elements.length).toBeGreaterThan(190);
    for (const question of bank.quiz_elements) {
      expect(question.explanation?.length).toBeGreaterThan(20);
      expect(question.sources?.length).toBeGreaterThan(0);
      expect(question.section).toBeTruthy();
      expect(question.family).toMatch(/^python-\d{2,3}$/);
      expect((question.question.match(/```/g) ?? []).length % 2).toBe(0);
    }
  });

  it("gives a short varied session and a longer timed session without repeated concepts", async () => {
    const bank = await loadBank("python");
    const study = preparedExams.find((p) => p.id === "python-nauka")!;
    const exam = preparedExams.find((p) => p.id === "python-weryfikacja")!;
    expect(study.config).toMatchObject({
      questionCount: 6,
      durationMinutes: null,
    });
    expect(exam.config).toMatchObject({
      questionCount: 30,
      durationMinutes: 20,
      choiceScoring: "strict",
    });
    for (let seed = 1; seed <= 10; seed++) {
      const short = sampleQuestions(study.config, [bank], seededRandom(seed));
      expect(new Set(short.map((q) => q.section)).size).toBe(6);
      const timed = sampleQuestions(exam.config, [bank], seededRandom(seed));
      expect(new Set(timed.map((q) => q.family)).size).toBe(30);
      expect(timed.every((q) => q.type !== "long_open")).toBe(true);
      expect(new Set(timed.map((q) => q.section))).toEqual(
        new Set(
          bank.quiz_elements
            .filter((q) => exam.config.questionTypes.includes(q.type))
            .map((q) => q.section),
        ),
      );
    }
  });

  it("shuffles choices while preserving correct grading and the immutable bank", async () => {
    const bank = await loadBank("python");
    const before = JSON.stringify(bank);
    const preset = preparedExams.find((p) => p.id === "python-weryfikacja")!;
    const attempt = await createAttempt(
      preset.config,
      preset.title,
      1000,
      seededRandom(7),
    );
    expect(attempt.deadline).toBe(1_201_000);
    let reordered = false;
    for (const question of attempt.questions) {
      const original = bank.quiz_elements.find(
        (q) => q.question === question.question,
      )!;
      if (question.answers) {
        expect(new Set(question.answers)).toEqual(new Set(original.answers));
        if (
          JSON.stringify(question.answers) !== JSON.stringify(original.answers)
        )
          reordered = true;
      }
      const answer = question.correct_answers ?? question.correct_answer!;
      expect(gradeQuestion(question, answer, attempt.config)).toBe(1);
    }
    expect(reordered).toBe(true);
    expect(JSON.stringify(bank)).toBe(before);
  });
});

describe("Python 2 — zakres zaproszenia", () => {
  it("covers the invitation with explained fundamentals at three difficulty levels", async () => {
    const bank = await loadBank("python2");
    expect(bank.quiz_elements).toHaveLength(288);
    expect(bank.quiz_elements.filter((q) => q.section?.startsWith("Python —"))).toHaveLength(144);
    expect(bank.quiz_elements.filter((q) => q.type === "long_open")).toHaveLength(6);
    expect(new Set(bank.quiz_elements.map((q) => q.question)).size).toBe(288);
    expect(new Set(bank.quiz_elements.map((q) => q.family)).size).toBe(288);
    for (const [level, count] of [["easy", 96], ["medium", 144], ["hard", 48]] as const) {
      expect(bank.quiz_elements.filter((q) => q.difficulty === level)).toHaveLength(count);
    }
    for (const question of bank.quiz_elements) {
      expect(question.explanation?.length).toBeGreaterThan(20);
      expect(question.sources?.length).toBeGreaterThan(0);
      expect(question.section).toBeTruthy();
      expect(question.section).not.toMatch(/Terraform|React|AWS/);
      expect((question.question.match(/```/g) ?? []).length % 2).toBe(0);
    }
  });

  it("copies both preset settings and draws a varied, Python-focused exam", async () => {
    const bank = await loadBank("python2");
    for (const id of ["python-nauka", "python-weryfikacja"]) {
      const original = preparedExams.find((p) => p.id === id)!;
      const copy = preparedExams.find((p) => p.id === `${id}2`)!;
      expect({ ...copy.config, subjects: original.config.subjects }).toEqual(original.config);
      expect(copy.config.subjects).toEqual([{ id: "python2", weight: 1 }]);
      expect(copy.title).toContain("2");
      for (let seed = 1; seed <= 10; seed++) {
        const questions = sampleQuestions(copy.config, [bank], seededRandom(seed));
        expect(questions).toHaveLength(original.config.questionCount as number);
        expect(new Set(questions.map((q) => q.family)).size).toBe(questions.length);
        if (id === "python-weryfikacja") {
          expect(questions.filter((q) => q.section?.startsWith("Python —")).length).toBeGreaterThanOrEqual(12);
          expect(new Set(questions.map((q) => q.section))).toEqual(
            new Set(bank.quiz_elements.filter((q) => copy.config.questionTypes.includes(q.type)).map((q) => q.section)),
          );
        }
      }
    }
  });
});
