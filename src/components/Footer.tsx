export default function Footer() {
  return (
    <footer className="shell py-6 text-center text-xs text-slate-400">
      <p>
        <a href="https://github.com/michalwilk123/quiz-generator">
          Kod źródłowy
        </a>
        <span aria-hidden="true"> · </span>Autor:{" "}
        <a href="https://github.com/michalwilk123">Michał Wilk</a>
        <span aria-hidden="true"> · </span>
        <a href="mailto:michalwilk139@gmail.com">Kontakt</a>
      </p>
      <p className="mt-1">React, TypeScript &amp; Tailwind CSS</p>
    </footer>
  );
}
