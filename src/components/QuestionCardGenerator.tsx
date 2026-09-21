import type { Answer, Attempt, Question } from "../core";
import QuestionText from "./QuestionText";

type Props = {
  question: Question;
  index: number;
  answer: Answer;
  allowUnknown: boolean;
  locked: boolean;
  revealed: boolean;
  grade: { earned: number; possible: number; fraction: number | null };
  manual: boolean;
  onAnswer: (answer: Answer) => void;
  onGrade: (fraction: number) => void;
  manualGrade: Attempt["manualGrades"][number];
};
export default function QuestionCardGenerator({
  question,
  index,
  answer,
  allowUnknown,
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
      <h2 className="muted mb-2 text-sm">Pytanie {index + 1}</h2>
      <div id={`question-${index}`} className="question-title">
        <QuestionText text={question.question} />
      </div>
      {choice && (
        <p className="muted mt-3 text-sm">
          {question.type === "multi_choice"
            ? "Zaznacz wszystkie poprawne odpowiedzi."
            : "Wybierz jedną odpowiedź."}
        </p>
      )}
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
            placeholder="Twoja odpowiedź"
            rows={5}
            disabled={locked}
            value={typeof answer === "string" ? answer : ""}
            onChange={(event) => onAnswer(event.target.value)}
          />
        ) : (
          <input
            aria-labelledby={`question-${index}`}
            placeholder="Twoja odpowiedź"
            disabled={locked}
            value={typeof answer === "string" ? answer : ""}
            onChange={(event) => onAnswer(event.target.value)}
          />
        )}
      </div>
      {allowUnknown && (
        <label className="choice mt-3">
          <input
            type="checkbox"
            checked={answer === null}
            disabled={locked}
            onChange={(event) => onAnswer(
              event.target.checked ? null : question.type === "multi_choice" ? [] : "",
            )}
          />
          <span>Nie wiem</span>
        </label>
      )}
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
            {answer === null
              ? `Nie wiem · 0 / ${grade.possible}`
              : grade.fraction === null
              ? "Czeka na Twoją ocenę"
              : `${grade.fraction === 1 ? "Poprawna" : grade.fraction > 0 ? "Częściowo poprawna" : "Niepoprawna"} · ${Number(grade.earned.toFixed(2))} / ${grade.possible}`}
          </p>
          <p className="muted mt-3 text-sm">
            {choice ? "Poprawna odpowiedź" : "Wzorcowa odpowiedź"}
          </p>
          <QuestionText text={model.join("\n")} />
          {question.explanation && (
            <div className="mt-4">
              <QuestionText text={question.explanation} />
            </div>
          )}
          {question.sources?.length ? (
            <details className="mt-4 text-sm">
              <summary>Dokumentacja</summary>
              <ul className="mt-2 space-y-2">
                {question.sources.map((source) => (
                  <li key={source}>
                    <a href={source} target="_blank" rel="noreferrer">
                      {new URL(source).hostname} —{" "}
                      {new URL(source).pathname
                        .split("/")
                        .filter(Boolean)
                        .at(-1) ?? "źródło"}
                    </a>
                  </li>
                ))}
              </ul>
            </details>
          ) : null}
          {manual && !choice && answer !== null && (
            <label className="field mt-4">
              <span id={`assessment-label-${index}`} className="text-sm">
                Oceń swoją odpowiedź
              </span>
              <select
                aria-labelledby={`assessment-label-${index}`}
                value={manualGrade ?? ""}
                onChange={(event) => onGrade(Number(event.target.value))}
              >
                <option value="" disabled>
                  Wybierz ocenę
                </option>
                <option value="0">Niepoprawna — 0 punktów</option>
                <option value="0.5">Częściowo poprawna — połowa punktów</option>
                <option value="1">Poprawna — pełne punkty</option>
              </select>
            </label>
          )}
        </div>
      )}
    </section>
  );
}
