import { useEffect } from "react";
import { Link } from "react-router-dom";
import { preparedExams } from "../prepared_exams";
import { encodeConfig, restoreAttempt } from "../core";

export default function Home() {
  useEffect(() => {
    document.title = "Generator quizów";
  }, []);
  let saved = null;
  let storageWarning = "";
  try {
    saved = restoreAttempt();
  } catch {
    storageWarning =
      "Nie udało się odtworzyć postępu. Możesz rozpocząć nowy test poniżej.";
  }
  return (
    <div className="shell page-space">
      <h1>Wybierz test</h1>
      <p className="muted mt-2">
        Wybierz krótką naukę lub sprawdź się pod presją czasu.
      </p>
      {storageWarning && (
        <p role="status" className="muted mt-6 text-sm">
          {storageWarning}
        </p>
      )}
      {saved && saved.status !== "submitted" && (
        <p className="mt-6">
          <Link to={`/exam?config=${encodeConfig(saved.config)}`}>
            Kontynuuj zapisany test
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
