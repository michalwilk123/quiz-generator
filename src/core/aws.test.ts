import { describe, expect, it } from "vitest";
import { preparedExams } from "../prepared_exams";
import { createAttempt, decodeConfig, encodeConfig, expireAttempt, gradeQuestion, loadBank, restoreAttempt, sampleQuestions, saveAttempt, scoreAttempt, submitAttempt, updateAnswer } from "./index";

const domains = {
  "Cloud Concepts": 12,
  "Security and Compliance": 15,
  "Cloud Technology and Services": 17,
  "Billing, Pricing, and Support": 6,
};
const demo = preparedExams.find((p) => p.id === "aws-clf-c02-demo")!;
const study = preparedExams.find((p) => p.id === "aws-clf-c02-study")!;
function random(seed: number) {
  return () => ((seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0) / 2 ** 32);
}

describe("AWS CLF-C02 practice", () => {
  it("has original, sourced choice questions with explicit selection counts", async () => {
    const bank = await loadBank("aws-clf-c02");
    expect(bank.quiz_elements).toHaveLength(250);
    expect(new Set(bank.quiz_elements.map((q) => q.question)).size).toBe(250);
    expect(new Set(bank.quiz_elements.map((q) => q.section))).toEqual(new Set(Object.keys(domains)));
    expect(bank.quiz_elements.filter((q) => q.type === "multi_choice").length).toBeGreaterThanOrEqual(40);
    for (const q of bank.quiz_elements) {
      expect(q.explanation!.length).toBeGreaterThan(100);
      expect(q.sources!.length).toBeGreaterThan(0);
      expect(q.sources!.every((url) => ["aws.amazon.com", "docs.aws.amazon.com"].includes(new URL(url).hostname))).toBe(true);
      expect(q.family).toBeTruthy();
      expect(q.difficulty).toMatch(/^(easy|medium|hard)$/);
      expect(q.answers).toHaveLength(q.type === "one_choice" ? 4 : 5);
      if (q.type === "multi_choice") {
        expect(q.correct_answers!.length).toBeGreaterThanOrEqual(2);
        expect(q.correct_answers!.length).toBeLessThanOrEqual(3);
        expect(q.question).toContain(q.correct_answers!.length === 2 ? "Select TWO" : "Select THREE");
      } else expect(q.type).toBe("one_choice");
    }
  });

  it("keeps exact scored-domain proportions across fresh demo selections", async () => {
    const bank = await loadBank("aws-clf-c02");
    const signatures = new Set<string>();
    for (let seed = 1; seed <= 100; seed++) {
      const qs = sampleQuestions(demo.config, [bank], random(seed));
      expect(qs).toHaveLength(50);
      expect(new Set(qs.map((q) => q.question)).size).toBe(50);
      for (const [domain, count] of Object.entries(domains)) {
        expect(qs.filter((q) => q.section === domain), `seed ${seed}, ${domain}`).toHaveLength(count);
      }
      signatures.add(qs.map((q) => q.question).sort().join("\n"));
    }
    expect(signatures.size).toBe(100);
  });

  it("round trips the 90-minute exam, restores its deadline, and scores every question", async () => {
    expect(decodeConfig(encodeConfig(demo.config))).toEqual(demo.config);
    let attempt = await createAttempt(demo.config, demo.title, 1000, random(3));
    expect(attempt.deadline).toBe(1000 + 90 * 60_000);
    expect(attempt.pages).toHaveLength(50);
    let serialized = "";
    const storage = {
      getItem: () => serialized,
      setItem: (_key: string, value: string) => { serialized = value; },
    };
    saveAttempt(attempt, storage);
    expect(restoreAttempt(storage, 1001)?.deadline).toBe(attempt.deadline);
    for (const [i, q] of attempt.questions.entries()) {
      const key = q.correct_answers ?? q.correct_answer!;
      attempt = updateAnswer(attempt, i, key, 1001);
      if (q.type === "multi_choice") {
        expect(gradeQuestion(q, [q.correct_answers![0]], demo.config)).toBe(0);
        expect(gradeQuestion(q, q.answers!, demo.config)).toBe(0);
      }
    }
    expect(scoreAttempt(submitAttempt(attempt, 1002))).toMatchObject({ earned: 50, possible: 50, percentage: 100 });
    expect(expireAttempt(attempt, attempt.deadline! - 1).status).toBe("active");
    expect(updateAnswer(attempt, 0, "", attempt.deadline!).status).toBe("expired");
  });

  it("offers untimed learning with all domains, sources and explicit unknown answers", async () => {
    const attempt = await createAttempt(study.config, study.title, 1000, random(5));
    expect(attempt.questions).toHaveLength(20);
    expect(attempt.deadline).toBeNull();
    expect(new Set(attempt.questions.map((q) => q.section))).toEqual(new Set(Object.keys(domains)));
    expect(updateAnswer(attempt, 0, null, 1001).answers[0]).toBeNull();
    expect(demo.config.allowUnknownAnswer).toBeUndefined();
    expect(study.config.choiceScoring).toBe("strict");
    expect(demo.config.wrongAnswerPenalty).toBe(0);
  });
});
