import { defaultConfig, type ExamConfig } from "./core/config";
export interface PreparedExam {
  id: string;
  title: string;
  description: string;
  config: ExamConfig;
}
// IDs are public links: keep them stable when updating these configurations.
export const preparedExams: PreparedExam[] = [
  {
    id: "python-nauka",
    title: "Programowanie python - politechnika gdanska — Nauka",
    description:
      "6 zróżnicowanych pytań, bez timera. Objaśnienia i źródła po zakończeniu.",
    config: {
      ...defaultConfig("python"),
      questionCount: 6,
      questionTypes: ["one_choice", "multi_choice", "short_open"],
      pageSize: 1,
    },
  },
  {
    id: "python-weryfikacja",
    title: "Programowanie python - politechnika gdanska — Weryfikacja",
    description:
      "30 pytań w 20 minut. Pełny zestaw poprawnych odpowiedzi albo zero punktów.",
    config: {
      ...defaultConfig("python"),
      questionCount: 30,
      durationMinutes: 20,
      questionTypes: ["one_choice", "multi_choice", "short_open"],
      pageSize: 5,
    },
  },
  {
    id: "isp",
    title: "ISP",
    description: "Układy programowalne · 5 losowych pytań",
    config: defaultConfig("isp"),
  },
  {
    id: "zsbd",
    title: "ZSBD",
    description: "Zarządzanie bazami danych · 5 losowych pytań",
    config: defaultConfig("zsbd"),
  },
];
export default preparedExams;
