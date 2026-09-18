import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import {
  createAttempt,
  decodeConfig,
  decodeLegacyConfig,
  encodeConfig,
  expireAttempt,
  restoreAttempt,
  saveAttempt,
  scoreAttempt,
  setManualGrade,
  submitAttempt,
  updateAnswer,
} from "../core";
import type { Attempt, ExamConfig } from "../core";
import { preparedExams } from "../prepared_exams";
import QuestionCardGenerator from "./QuestionCardGenerator";

export default function Quiz() {
  const { id, quiz } = useParams();
  const location = useLocation();
  const [attempt, setAttempt] = useState<Attempt | null>(null);
  const [error, setError] = useState("");
  const [warning, setWarning] = useState("");
  const [page, setPage] = useState(0);
  const [now, setNow] = useState(Date.now());
  const [celebrate, setCelebrate] = useState(false);
  const celebrated = useRef(false);
  const initialized = useRef("");
  useEffect(() => {
    const route = location.key;
    const routeHash = window.location.hash;
    if (initialized.current === route) return;
    initialized.current = route;
    setError("");
    setWarning("");
    let config: ExamConfig;
    let title = "Practice exam";
    try {
      const params = new URLSearchParams(location.search);
      if (id) {
        const preset = preparedExams.find((exam) => exam.id === id);
        if (!preset) throw Error("This prepared exam could not be found.");
        config = preset.config;
        title = preset.title;
      } else if (quiz) {
        const legacy = decodeLegacyConfig(quiz, params);
        config = legacy.config;
        setWarning(legacy.warnings.join(" "));
      } else {
        const encoded = params.get("config");
        if (!encoded)
          throw Error("This exam link is missing its configuration.");
        config = decodeConfig(encoded);
      }
      let saved: Attempt | null = null;
      try {
        saved = restoreAttempt();
      } catch {
        setWarning(
          "Saved progress could not be restored. Starting a fresh attempt.",
        );
      }
      const fresh = Boolean(location.state?.fresh);
      if (
        !fresh &&
        saved &&
        (saved.status !== "submitted" ||
          location.state?.attemptId === saved.id) &&
        encodeConfig(saved.config) === encodeConfig(config)
      ) {
        window.history.replaceState(
          { ...window.history.state, usr: { attemptId: saved.id } },
          "",
        );
        setAttempt(saved);
        setPage(0);
      } else {
        setAttempt(null);
        createAttempt(config, title)
          .then((next) => {
            if (
              initialized.current !== route ||
              window.location.hash !== routeHash
            )
              return;
            window.history.replaceState(
              { ...window.history.state, usr: { attemptId: next.id } },
              "",
            );
            setAttempt(next);
            setPage(0);
          })
          .catch((e) => {
            if (
              initialized.current === route &&
              window.location.hash === routeHash
            )
              setError((e as Error).message);
          });
      }
    } catch (e) {
      setError((e as Error).message);
    }
  }, [id, quiz, location.key, location.search, location.state]);
  useEffect(() => {
    if (!attempt) return;
    document.title = `${attempt.title} · Quiz Generator`;
    try {
      saveAttempt(attempt);
    } catch {
      setWarning(
        "Progress could not be saved on this device. Keep this page open until you finish.",
      );
    }
  }, [attempt]);
  useEffect(() => {
    const tick = () => {
      const time = Date.now();
      setNow(time);
      setAttempt((previous) =>
        previous ? expireAttempt(previous, time) : previous,
      );
    };
    const interval = window.setInterval(tick, 1000);
    window.addEventListener("focus", tick);
    document.addEventListener("visibilitychange", tick);
    return () => {
      clearInterval(interval);
      window.removeEventListener("focus", tick);
      document.removeEventListener("visibilitychange", tick);
    };
  }, []);
  const score = attempt ? scoreAttempt(attempt) : null;
  useEffect(() => {
    if (
      attempt?.status === "submitted" &&
      score?.percentage === 100 &&
      !score.pending &&
      !celebrated.current
    ) {
      celebrated.current = true;
      setCelebrate(true);
      const timeout = window.setTimeout(() => setCelebrate(false), 3500);
      return () => clearTimeout(timeout);
    }
  }, [attempt?.status, score?.percentage, score?.pending]);
  function move(next: number) {
    setPage(next);
    window.scrollTo({ top: 0 });
  }
  async function retry() {
    if (!attempt) return;
    try {
      const next = await createAttempt(attempt.config, attempt.title);
      celebrated.current = false;
      setCelebrate(false);
      window.history.replaceState(
        { ...window.history.state, usr: { attemptId: next.id } },
        "",
      );
      setAttempt(next);
      move(0);
    } catch (e) {
      setError((e as Error).message);
    }
  }
  function finish() {
    setAttempt((previous) => (previous ? submitAttempt(previous) : previous));
    move(0);
  }
  if (error)
    return (
      <div className="shell page-space">
        <h1>Unable to open exam</h1>
        <p role="alert" className="mt-4">
          {error}
        </p>
        <p className="mt-6">
          <Link to="/configure">Adjust the configuration</Link>
          <span className="mx-3">·</span>
          <Link to="/">Back to exams</Link>
        </p>
      </div>
    );
  if (!attempt || !score)
    return (
      <div className="shell page-space" role="status">
        Loading questions…
      </div>
    );
  const revealed = attempt.status === "submitted";
  const expired =
    attempt.status === "expired" ||
    (attempt.deadline !== null && now >= attempt.deadline);
  const locked = revealed || expired;
  const seconds =
    attempt.deadline === null
      ? null
      : Math.max(
          0,
          Math.ceil(
            (attempt.deadline -
              (revealed ? (attempt.submittedAt ?? now) : now)) /
              1000,
          ),
        );
  const answered = attempt.answers.filter((answer) =>
    Array.isArray(answer) ? answer.length > 0 : answer.trim().length > 0,
  ).length;
  const indices = attempt.pages[Math.min(page, attempt.pages.length - 1)] ?? [];
  return (
    <>
      <div className="exam-toolbar">
        <div className="shell flex min-h-16 items-center justify-between gap-3 py-2">
          <div className="min-w-0">
            <p className="text-sm">
              {revealed
                ? "Review answers"
                : `${answered} / ${attempt.questions.length} answered`}
            </p>
            <p className="muted text-xs">
              Page {page + 1} of {attempt.pages.length}
            </p>
          </div>
          {seconds !== null && (
            <span
              className={`timer ${seconds < 60 && !revealed ? "urgent" : ""}`}
              role="timer"
              aria-label={`${Math.floor(seconds / 60)} minutes ${seconds % 60} seconds remaining`}
            >
              {Math.floor(seconds / 60)}:{String(seconds % 60).padStart(2, "0")}
            </span>
          )}
          {!revealed && (
            <button className="button text-sm" onClick={finish}>
              {expired ? "View results" : "Finish exam"}
            </button>
          )}
          {revealed && (
            <button className="button text-sm" onClick={retry}>
              Try again
            </button>
          )}
        </div>
      </div>
      <div className="shell pb-12 pt-7">
        <h1>{attempt.title}</h1>
        {warning && (
          <p role="status" className="mt-4 text-amber-200 text-sm">
            {warning}
          </p>
        )}
        {expired && !revealed && (
          <p role="status" className="mt-5 text-amber-200">
            Time is up. Your answers are locked. Open results when you’re ready.
          </p>
        )}
        {revealed && (
          <section className="result-enter mt-6" aria-label="Exam results">
            <h2 className="text-2xl">
              {score.pending
                ? `${Number(score.earned.toFixed(2))} points so far`
                : `${Number(score.earned.toFixed(2))} / ${score.possible} points · ${Math.round(score.percentage ?? 0)}%`}
            </h2>
            <p className="muted mt-2">
              {score.pending
                ? `${score.pending} written ${score.pending === 1 ? "answer needs" : "answers need"} your assessment below.`
                : score.percentage === 100
                  ? "Every question correct. Well done!"
                  : "Review your answers below, then try a fresh set of questions."}
            </p>
            {attempt.config.writtenGrading === "automatic" &&
              attempt.questions.some((question) =>
                question.type.endsWith("open"),
              ) && (
                <p className="muted mt-2 text-sm">
                  Written answers are scored by text similarity, which can
                  misjudge a correct paraphrase.
                </p>
              )}
          </section>
        )}
        <div className="mt-9 space-y-10 sm:space-y-14">
          {indices.map((index) => (
            <QuestionCardGenerator
              key={`${attempt.id}-${index}`}
              question={attempt.questions[index]}
              index={index}
              answer={attempt.answers[index]}
              locked={locked}
              revealed={revealed}
              grade={score.questions[index]}
              manual={attempt.config.writtenGrading === "manual"}
              manualGrade={attempt.manualGrades[index]}
              onAnswer={(answer) =>
                setAttempt((previous) =>
                  previous ? updateAnswer(previous, index, answer) : previous,
                )
              }
              onGrade={(fraction) =>
                setAttempt((previous) =>
                  previous
                    ? setManualGrade(previous, index, fraction)
                    : previous,
                )
              }
            />
          ))}
        </div>
        <nav
          aria-label="Question pages"
          className="mt-10 flex items-center justify-between gap-3"
        >
          {attempt.pages.length > 1 ? (
            <>
              <button
                className="button secondary"
                disabled={page === 0}
                onClick={() => move(page - 1)}
              >
                Previous
              </button>
              <span className="muted text-sm">
                {page + 1} / {attempt.pages.length}
              </span>
              <button
                className="button secondary"
                disabled={page >= attempt.pages.length - 1}
                onClick={() => move(page + 1)}
              >
                Next
              </button>
            </>
          ) : null}
        </nav>
        {!revealed && (
          <button className="button mt-6" onClick={finish}>
            {expired ? "View results" : "Finish exam"}
          </button>
        )}
        {revealed && (
          <p className="mt-8">
            <Link to="/">Back to exams</Link>
          </p>
        )}
      </div>
      {celebrate && (
        <div className="confetti" aria-hidden="true">
          {Array.from({ length: 28 }, (_, index) => (
            <i
              key={index}
              style={{
                left: `${(index * 37) % 100}%`,
                animationDelay: `${(index % 7) * 0.12}s`,
                transform: `rotate(${index * 23}deg)`,
              }}
            />
          ))}
        </div>
      )}
    </>
  );
}
