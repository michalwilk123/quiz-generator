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
    document.title = "Konfiguracja testu";
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
      <h1>Skonfiguruj test</h1>
      <p className="muted mt-2">Wybierz quizy i proporcje losowanych pytań.</p>
      <form onSubmit={start} className="mt-8 space-y-8">
        <fieldset>
          <legend className="mb-3 font-semibold">Wybór quizów</legend>
          <p className="muted mb-4 text-sm">
            Większa waga oznacza częstsze losowanie pytań z danego quizu.
            Proporcje są przybliżone.
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
                      <span>Waga</span>
                      <input
                        aria-label={`${bank.name} — waga`}
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
            <span>Liczba pytań</span>
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
              Limit czasu
            </label>
            {config.durationMinutes !== null ? (
              <label className="field mt-2">
                <span className="text-sm">Minuty (maksymalnie 30)</span>
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
                Bez timera. Zakończ, kiedy będziesz gotowy.
              </p>
            )}
          </div>
        </div>
        <details>
          <summary className="py-3 font-semibold">Więcej opcji</summary>
          <div className="mt-4 space-y-6">
            <label className="field">
              <span id="page-size-label">Pytań na stronie</span>
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
                      ? "Automatycznie — mniej pytań opisowych na stronie"
                      : value === "all"
                        ? "Wszystkie pytania"
                        : value}
                  </option>
                ))}
              </select>
            </label>
            <label className="field">
              <span id="written-grading-label">Ocena odpowiedzi pisemnych</span>
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
                <option value="automatic">
                  Automatyczne porównanie tekstu
                </option>
                <option value="manual">
                  Samoocena na podstawie wzorcowej odpowiedzi
                </option>
              </select>
              <span id="written-grading-help" className="muted text-sm">
                Porównanie tekstu ocenia podobieństwo słów. Poprawna odpowiedź
                sformułowana inaczej może zostać oceniona błędnie.
              </span>
            </label>
            <label className="field">
              <span id="choice-scoring-label">
                Ocena pytań wielokrotnego wyboru
              </span>
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
                <option value="strict">
                  Wymagany pełny zestaw poprawnych odpowiedzi
                </option>
                <option value="partial">Przyznawaj punkty częściowe</option>
              </select>
            </label>
            <label className="field">
              <span id="penalty-label">
                Kara za błędną odpowiedź (część punktów za pytanie)
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
                0 oznacza brak kary. Dotyczy pytań wyboru; brak odpowiedzi daje
                zero punktów.
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
              Uwzględniaj wagi punktowe zapisane w pytaniach
            </label>
            <fieldset>
              <legend className="font-medium">Rodzaje pytań</legend>
              {(
                [
                  ["long_open", "Długie odpowiedzi opisowe"],
                  ["short_open", "Krótkie odpowiedzi pisemne"],
                  ["one_choice", "Jednokrotny wybór"],
                  ["multi_choice", "Wielokrotny wybór"],
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
            Rozpocznij test
          </button>
          <button className="button secondary" type="button" onClick={share}>
            Kopiuj link do testu
          </button>
        </div>
        {shareLink && (
          <label className="field">
            <span className="text-sm" role="status">
              Link do testu — zapisz go, aby losować kolejne zestawy z tymi
              ustawieniami.
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
        <Link to="/">Wróć do gotowych testów</Link>
      </p>
    </div>
  );
}
