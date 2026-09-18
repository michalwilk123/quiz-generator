import type { Attempt, Question } from "../core";

type Props = {
  question: Question;
  index: number;
  answer: string | string[];
  locked: boolean;
  revealed: boolean;
  grade: { earned: number; possible: number; fraction: number | null };
  manual: boolean;
  onAnswer: (answer: string | string[]) => void;
  onGrade: (fraction: number) => void;
  manualGrade: Attempt["manualGrades"][number];
};
export default function QuestionCardGenerator({
  question,
  index,
  answer,
  locked,
  revealed,
  grade,
  manual,
  onAnswer,
  onGrade,
  manualGrade,
}: Props) {
  const choice =
    question.type === "one_choice" || question.type === "multi_choice";
  const model =
    question.correct_answers ??
    (question.correct_answer ? [question.correct_answer] : []);
  return (
    <section className="question" aria-labelledby={`question-${index}`}>
      <h2 id={`question-${index}`} className="question-title">
        <span className="muted mr-2">{index + 1}.</span>
        {question.question}
      </h2>
      <div className="mt-4">
        {choice ? (
          <fieldset
            disabled={locked}
            aria-labelledby={`question-${index}`}
            className="space-y-1"
          >
            {question.answers?.map((option, optionIndex) => (
              <label key={optionIndex} className="choice">
                <input
                  type={question.type === "multi_choice" ? "checkbox" : "radio"}
                  name={`answer-${index}`}
                  checked={
                    Array.isArray(answer)
                      ? answer.includes(option)
                      : answer === option
                  }
                  onChange={(event) =>
                    onAnswer(
                      question.type === "one_choice"
                        ? option
                        : event.target.checked
                          ? [...(Array.isArray(answer) ? answer : []), option]
                          : (Array.isArray(answer) ? answer : []).filter(
                              (value) => value !== option,
                            ),
                    )
                  }
                />
                <span className="whitespace-pre-wrap break-words">
                  {option}
                </span>
              </label>
            ))}
          </fieldset>
        ) : question.type === "long_open" ? (
          <textarea
            aria-labelledby={`question-${index}`}
            placeholder="Your answer"
            rows={5}
            disabled={locked}
            value={typeof answer === "string" ? answer : ""}
            onChange={(event) => onAnswer(event.target.value)}
          />
        ) : (
          <input
            aria-labelledby={`question-${index}`}
            placeholder="Your answer"
            disabled={locked}
            value={typeof answer === "string" ? answer : ""}
            onChange={(event) => onAnswer(event.target.value)}
          />
        )}
      </div>
      {revealed && (
        <div className="feedback mt-5 result-enter">
          <p
            className={
              grade.fraction === 1
                ? "text-teal-200"
                : grade.fraction === null
                  ? "text-slate-300"
                  : grade.fraction > 0
                    ? "text-amber-200"
                    : "text-red-300"
            }
          >
            {grade.fraction === null
              ? "Awaiting your assessment"
              : `${grade.fraction === 1 ? "Correct" : grade.fraction > 0 ? "Partially correct" : "Incorrect"} · ${Number(grade.earned.toFixed(2))} / ${grade.possible}`}
          </p>
          <p className="muted mt-3 text-sm">
            {choice ? "Correct answer" : "Model answer"}
          </p>
          <p>{model.join("\n")}</p>
          {manual && !choice && (
            <label className="field mt-4">
              <span id={`assessment-label-${index}`} className="text-sm">
                Assess your answer
              </span>
              <select
                aria-labelledby={`assessment-label-${index}`}
                value={manualGrade ?? ""}
                onChange={(event) => onGrade(Number(event.target.value))}
              >
                <option value="" disabled>
                  Choose a grade
                </option>
                <option value="0">Incorrect — 0 points</option>
                <option value="0.5">Partially correct — half points</option>
                <option value="1">Correct — full points</option>
              </select>
            </label>
          )}
        </div>
      )}
    </section>
  );
}
