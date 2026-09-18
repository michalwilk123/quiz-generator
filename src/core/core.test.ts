import { describe, it, expect } from "vitest";
import quizConfig from "../quiz_config";
import {
  defaultConfig,
  encodeConfig,
  decodeConfig,
  decodeLegacyConfig,
  validateConfig,
  loadBank,
  sampleQuestions,
  paginateQuestions,
  createAttempt,
  updateAnswer,
  expireAttempt,
  submitAttempt,
  setManualGrade,
  saveAttempt,
  restoreAttempt,
  gradeQuestion,
  scoreAttempt,
  type Question,
  type QuestionBank,
} from "./index";
const question = (
  text: string,
  type: Question["type"] = "long_open",
): Question => ({
  question: text,
  type,
  correct_answer: "A model answer",
  scale: 10,
});
const bank = (prefix: string, count: number): QuestionBank => ({
  name: prefix,
  quiz_elements: Array.from({ length: count }, (_, i) =>
    question(`${prefix}${i}`),
  ),
});
function memoryStorage() {
  let value: string | null = null;
  return {
    getItem: () => value,
    setItem: (_key: string, next: string) => {
      value = next;
    },
  };
}
describe("configuration links", () => {
  it("round trips full configuration without tying links to bank size", () => {
    const c = {
      ...defaultConfig(),
      subjects: [
        { id: "isp", weight: 3 },
        { id: "zsbd", weight: 2 },
      ],
      durationMinutes: 30,
      pageSize: 5 as const,
      choiceScoring: "partial" as const,
      wrongAnswerPenalty: 0.5,
      writtenGrading: "manual" as const,
      useQuestionWeights: true,
    };
    expect(decodeConfig(encodeConfig(c))).toEqual(c);
    expect(encodeConfig(c)).toMatch(/^[\w-]+$/);
  });
  it("rejects malformed links and invalid deadlines", () => {
    expect(() => decodeConfig("%%%")).toThrow();
    expect(() =>
      validateConfig({ ...defaultConfig(), durationMinutes: 31 }),
    ).toThrow();
    expect(() =>
      validateConfig({
        ...defaultConfig(),
        subjects: [{ id: "isp", weight: 0 }],
      }),
    ).toThrow();
  });
  it("imports legacy filters, weights, partial scoring and explicitly explains timer changes", () => {
    const { config, warnings } = decodeLegacyConfig(
      "isp",
      new URLSearchParams("conf=3&conf=5&qtype=1&amount=15"),
    );
    expect(config).toMatchObject({
      questionCount: 15,
      questionTypes: ["long_open"],
      choiceScoring: "partial",
      useQuestionWeights: true,
      durationMinutes: null,
    });
    expect(warnings.some((w) => w.includes("elapsed-time"))).toBe(true);
  });
});
describe("banks, sampling and pagination", () => {
  it("loads all existing banks without mutating shared data", async () => {
    for (const { urlName: id } of quizConfig) {
      const b = await loadBank(id);
      expect(b.quiz_elements.length).toBeGreaterThan(0);
      expect(Object.isFrozen(b.quiz_elements[0])).toBe(true);
    }
    await expect(loadBank("missing")).rejects.toThrow("no longer available");
  });
  it("reallocates exhausted weights, samples uniquely, and preserves sources", () => {
    const banks = [bank("a", 1), bank("b", 3)];
    const before = JSON.stringify(banks);
    const config = {
      ...defaultConfig(),
      subjects: [
        { id: "a", weight: 999 },
        { id: "b", weight: 1 },
      ],
      questionCount: 4,
    };
    const selected = sampleQuestions(config, banks, () => 0);
    expect(new Set(selected.map((q) => q.question)).size).toBe(4);
    expect(JSON.stringify(banks)).toBe(before);
    expect(() =>
      sampleQuestions({ ...config, questionCount: 5 }, banks),
    ).toThrow("Only 4");
  });
  it("respects filters and uses less space for open questions in auto mode", () => {
    const qs = [...bank("long", 5).quiz_elements];
    expect(paginateQuestions(qs, "auto").map((p) => p.length)).toEqual([
      2, 2, 1,
    ]);
    expect(paginateQuestions(qs, 1).length).toBe(5);
    expect(paginateQuestions(qs, "all").length).toBe(1);
    expect(() =>
      sampleQuestions({ ...defaultConfig(), questionTypes: ["one_choice"] }, [
        bank("a", 5),
      ]),
    ).toThrow("Only 0");
  });
});
describe("attempt deadline, restore and frozen answers", () => {
  it("rejects a late answer even before the timer display has ticked", async () => {
    const initial = await createAttempt(
      { ...defaultConfig(), durationMinutes: 1 },
      "Test",
      1000,
    );
    const answered = updateAnswer(initial, 0, "before", 60999);
    const expired = updateAnswer(answered, 0, "too late", 61000);
    expect(expired.status).toBe("expired");
    expect(expired.answers[0]).toBe("before");
    expect(initial.answers[0]).toBe("");
    expect(scoreAttempt(expired).percentage).toBeNull();
    const store = memoryStorage();
    saveAttempt(answered, store);
    const restored = restoreAttempt(store, 100000)!;
    expect(restored.status).toBe("expired");
    expect(restored.deadline).toBe(61000);
    expect(scoreAttempt(restored).percentage).toBeNull();
    expect(submitAttempt(restored, 100001).status).toBe("submitted");
  });
  it("preserves a snapshot, locks submitted answers and allows self-assessment only after submission", async () => {
    const a = await createAttempt(
      { ...defaultConfig(), writtenGrading: "manual" },
      "Test",
      1000,
    );
    expect(expireAttempt(a, 99999999)).toBe(a);
    expect(setManualGrade(a, 0, 1)).toBe(a);
    const done = submitAttempt(updateAnswer(a, 0, "My answer"));
    expect(updateAnswer(done, 0, "changed")).toBe(done);
    const assessed = setManualGrade(done, 0, 0.5);
    expect(assessed.answers[0]).toBe("My answer");
    expect(assessed.manualGrades[0]).toBe(0.5);
    expect(scoreAttempt(assessed).pending).toBe(4);
    const store = memoryStorage();
    saveAttempt(assessed, store);
    expect(restoreAttempt(store)).toEqual(assessed);
    store.setItem("", JSON.stringify({ ...assessed, answers: [] }));
    expect(() => restoreAttempt(store)).toThrow("could not be restored");
  });
});
describe("grading", () => {
  const multi: Question = {
    question: "Choose",
    type: "multi_choice",
    answers: ["a", "b", "c"],
    correct_answers: ["a", "b"],
  };
  it("defaults to exact choice selection and no penalty", () => {
    const c = defaultConfig();
    expect(gradeQuestion(multi, ["a"], c)).toBe(0);
    expect(gradeQuestion(multi, ["a", "b"], c)).toBe(1);
    expect(gradeQuestion(multi, ["a", "b", "c"], c)).toBe(0);
  });
  it("supports real fractional credit, configured penalties, and no penalty for blanks", () => {
    const c = {
      ...defaultConfig(),
      choiceScoring: "partial" as const,
      wrongAnswerPenalty: 0.25,
    };
    expect(gradeQuestion(multi, ["a"], c)).toBe(0.5);
    expect(gradeQuestion(multi, ["c"], c)).toBe(-0.25);
    expect(gradeQuestion(multi, [], c)).toBe(0);
  });
  it("normalizes whitespace, case, Unicode and trailing punctuation without losing decimals", () => {
    expect(
      gradeQuestion(
        question("q", "short_open"),
        "  A\nMODEL answer.  ",
        defaultConfig(),
      ),
    ).toBe(1);
    expect(
      gradeQuestion(
        { ...question("q", "short_open"), correct_answer: "1.5" },
        "15",
        defaultConfig(),
      ),
    ).toBe(0);
    const grade = gradeQuestion(
      {
        ...question("q"),
        correct_answer: "This is an example of a model answer",
      },
      "This is an example of something",
      defaultConfig(),
    )!;
    expect(grade).toBeGreaterThan(0);
    expect(grade).toBeLessThan(1);
  });
  it("uses question weights only when requested and withholds final percentage until manual grades complete", async () => {
    const a = submitAttempt(
      await createAttempt(
        { ...defaultConfig(), writtenGrading: "manual" },
        "Test",
        0,
      ),
    );
    let graded = a;
    for (let i = 0; i < a.questions.length; i++)
      graded = setManualGrade(graded, i, 1);
    expect(scoreAttempt(graded)).toMatchObject({
      earned: 5,
      possible: 5,
      percentage: 100,
      pending: 0,
    });
    expect(
      scoreAttempt({
        ...graded,
        config: { ...graded.config, useQuestionWeights: true },
      }).possible,
    ).toBe(graded.questions.reduce((n, q) => n + (q.scale ?? 1), 0));
  });
});
