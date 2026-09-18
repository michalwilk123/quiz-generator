import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import quizConfig from "../quiz_config";
import { defaultConfig, encodeConfig, validateConfig } from "../core";
import type { ExamConfig } from "../core";

export default function SelectQuiz() {
  const [config, setConfig] = useState<ExamConfig>(() => defaultConfig("isp"));
  const [error, setError] = useState("");
  const [shareLink, setShareLink] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Configure exam";
  }, []);
  function update(patch: Partial<ExamConfig>) {
    setConfig((previous) => ({ ...previous, ...patch }));
    setError("");
    setShareLink("");
  }
  function weight(id: string, value: number) {
    update({
      subjects: [
        ...config.subjects.filter((subject) => subject.id !== id),
        ...(value > 0 ? [{ id, weight: value }] : []),
      ],
    });
  }
  function path() {
    return `/exam?config=${encodeConfig(validateConfig(config))}`;
  }
  function start(event: React.FormEvent) {
    event.preventDefault();
    try {
      navigate(path(), { state: { fresh: true } });
    } catch (e) {
      setError((e as Error).message);
    }
  }
  async function share() {
    try {
      const url = new URL(window.location.href);
      url.hash = path();
      setShareLink(url.href);
      try {
        await navigator.clipboard.writeText(url.href);
      } catch {
        /* The selectable URL also works without clipboard permission. */
      }
    } catch (e) {
      setError((e as Error).message);
    }
  }
  return (
    <div className="shell page-space">
      <h1>Configure your exam</h1>
      <p className="muted mt-2">
        Choose quizzes and how often their questions appear.
      </p>
      <form onSubmit={start} className="mt-8 space-y-8">
        <fieldset>
          <legend className="mb-3 font-semibold">Quiz mix</legend>
          <p className="muted mb-4 text-sm">
            Higher weights draw more questions. The mix is approximate.
          </p>
          <div className="space-y-4">
            {quizConfig.map((bank) => {
              const selected = config.subjects.find(
                (subject) => subject.id === bank.urlName,
              );
              return (
                <div key={bank.urlName} className="flex items-center gap-4">
                  <label className="check-label flex-1">
                    <input
                      type="checkbox"
                      checked={Boolean(selected)}
                      onChange={(event) =>
                        weight(bank.urlName, event.target.checked ? 1 : 0)
                      }
                    />
                    <span>{bank.name}</span>
                  </label>
                  {selected && (
                    <label className="field w-20 shrink-0 text-xs">
                      <span>Weight</span>
                      <input
                        aria-label={`${bank.name} weight`}
                        type="number"
                        min="1"
                        max="1000"
                        value={selected.weight}
                        onChange={(event) =>
                          weight(
                            bank.urlName,
                            Math.max(1, Number(event.target.value)),
                          )
                        }
                      />
                    </label>
                  )}
                </div>
              );
            })}
          </div>
        </fieldset>
        <div className="grid gap-6 sm:grid-cols-2">
          <label className="field">
            <span>Number of questions</span>
            <input
              required
              type="number"
              min="1"
              max="10000"
              value={config.questionCount === "all" ? "" : config.questionCount}
              onChange={(event) =>
                update({ questionCount: Number(event.target.value) })
              }
            />
          </label>
          <div>
            <label className="check-label">
              <input
                type="checkbox"
                checked={config.durationMinutes !== null}
                onChange={(event) =>
                  update({ durationMinutes: event.target.checked ? 10 : null })
                }
              />
              Time limit
            </label>
            {config.durationMinutes !== null ? (
              <label className="field mt-2">
                <span className="text-sm">Minutes (maximum 30)</span>
                <input
                  required
                  type="number"
                  min="1"
                  max="30"
                  value={config.durationMinutes}
                  onChange={(event) =>
                    update({ durationMinutes: Number(event.target.value) })
                  }
                />
              </label>
            ) : (
              <p className="muted text-sm">
                No timer. Finish when you’re ready.
              </p>
            )}
          </div>
        </div>
        <details>
          <summary className="py-3 font-semibold">More options</summary>
          <div className="mt-4 space-y-6">
            <label className="field">
              <span id="page-size-label">Questions per page</span>
              <select
                aria-labelledby="page-size-label"
                value={config.pageSize}
                onChange={(event) =>
                  update({
                    pageSize: (event.target.value === "auto" ||
                    event.target.value === "all"
                      ? event.target.value
                      : Number(event.target.value)) as ExamConfig["pageSize"],
                  })
                }
              >
                {["auto", 1, 5, 10, 20, "all"].map((value) => (
                  <option key={value} value={value}>
                    {value === "auto"
                      ? "Auto — fewer written questions per page"
                      : value === "all"
                        ? "All questions"
                        : value}
                  </option>
                ))}
              </select>
            </label>
            <label className="field">
              <span id="written-grading-label">Written-answer grading</span>
              <select
                aria-labelledby="written-grading-label"
                aria-describedby="written-grading-help"
                value={config.writtenGrading}
                onChange={(event) =>
                  update({
                    writtenGrading: event.target
                      .value as ExamConfig["writtenGrading"],
                  })
                }
              >
                <option value="automatic">Automatic text matching</option>
                <option value="manual">
                  Self-assessment against the model answer
                </option>
              </select>
              <span id="written-grading-help" className="muted text-sm">
                Text matching compares wording; it can misjudge a correct
                paraphrase.
              </span>
            </label>
            <label className="field">
              <span id="choice-scoring-label">Multiple-choice scoring</span>
              <select
                aria-labelledby="choice-scoring-label"
                value={config.choiceScoring}
                onChange={(event) =>
                  update({
                    choiceScoring: event.target
                      .value as ExamConfig["choiceScoring"],
                  })
                }
              >
                <option value="strict">All correct selections required</option>
                <option value="partial">Allow partial credit</option>
              </select>
            </label>
            <label className="field">
              <span id="penalty-label">
                Wrong-answer penalty (fraction of question points)
              </span>
              <input
                aria-labelledby="penalty-label"
                aria-describedby="penalty-help"
                type="number"
                min="0"
                max="1"
                step="0.1"
                value={config.wrongAnswerPenalty}
                onChange={(event) =>
                  update({ wrongAnswerPenalty: Number(event.target.value) })
                }
              />
              <span id="penalty-help" className="muted text-sm">
                0 means no penalty. Applies to choice questions; unanswered
                questions earn zero.
              </span>
            </label>
            <label className="check-label">
              <input
                type="checkbox"
                checked={config.useQuestionWeights}
                onChange={(event) =>
                  update({ useQuestionWeights: event.target.checked })
                }
              />
              Use question point values from the quiz files
            </label>
            <fieldset>
              <legend className="font-medium">Question types</legend>
              {(
                [
                  ["long_open", "Long written answers"],
                  ["short_open", "Short written answers"],
                  ["one_choice", "Single choice"],
                  ["multi_choice", "Multiple choice"],
                ] as const
              ).map(([type, label]) => (
                <label key={type} className="check-label">
                  <input
                    type="checkbox"
                    checked={config.questionTypes.includes(type)}
                    onChange={(event) =>
                      update({
                        questionTypes: event.target.checked
                          ? [...config.questionTypes, type]
                          : config.questionTypes.filter(
                              (value) => value !== type,
                            ),
                      })
                    }
                  />
                  {label}
                </label>
              ))}
            </fieldset>
          </div>
        </details>
        {error && (
          <p role="alert" className="text-red-300">
            {error}
          </p>
        )}
        <div className="flex flex-wrap gap-3">
          <button className="button" type="submit">
            Start exam
          </button>
          <button className="button secondary" type="button" onClick={share}>
            Copy exam link
          </button>
        </div>
        {shareLink && (
          <label className="field">
            <span className="text-sm" role="status">
              Exam link — save it for a fresh draw with these settings.
            </span>
            <input
              readOnly
              value={shareLink}
              onFocus={(event) => event.target.select()}
            />
          </label>
        )}
      </form>
      <p className="mt-8 text-sm">
        <Link to="/">Back to prepared exams</Link>
      </p>
    </div>
  );
}
