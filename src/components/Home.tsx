import { useEffect } from "react";
import { Link } from "react-router-dom";
import { preparedExams } from "../prepared_exams";
import { encodeConfig, restoreAttempt } from "../core";

export default function Home() {
  useEffect(() => {
    document.title = "Quiz Generator";
  }, []);
  let saved = null;
  let storageWarning = "";
  try {
    saved = restoreAttempt();
  } catch {
    storageWarning =
      "Saved progress could not be restored. You can start a fresh exam below.";
  }
  return (
    <div className="shell page-space">
      <h1>Choose your exam</h1>
      <p className="muted mt-2">
        A short practice session. A fresh set of questions each time.
      </p>
      {storageWarning && (
        <p role="status" className="muted mt-6 text-sm">
          {storageWarning}
        </p>
      )}
      {saved && saved.status !== "submitted" && (
        <p className="mt-6">
          <Link to={`/exam?config=${encodeConfig(saved.config)}`}>
            Continue your saved attempt
          </Link>
        </p>
      )}
      <div className="mt-10 space-y-9">
        {preparedExams.map((exam) => (
          <section
            key={exam.id}
            className="flex items-start justify-between gap-5"
          >
            <div className="min-w-0">
              <h2>{exam.title}</h2>
              <p className="muted mt-2">{exam.description}</p>
            </div>
            <Link
              className="button shrink-0"
              to={`/exam/${exam.id}`}
              state={{ fresh: true }}
            >
              Start<span className="sr-only"> {exam.title}</span>
            </Link>
          </section>
        ))}
      </div>
    </div>
  );
}
