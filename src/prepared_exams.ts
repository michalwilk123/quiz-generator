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
    id: "python-pg-fullstack",
    title: "Python PG — Fullstack",
    description:
      "40 pytań w 30 minut: 12 Python, 10 DDD/design/architektura, 8 frameworki i biblioteki Pythona, 6 React/TypeScript, 4 bazy danych i technologie dodatkowe. Objaśnienia po zakończeniu.",
    config: {
      ...defaultConfig("python-fullstack"),
      questionCount: 40,
      durationMinutes: 30,
      questionTypes: ["one_choice", "multi_choice", "short_open"],
      pageSize: 5,
    },
  },
  {
    id: "aws-clf-c02-study",
    title: "AWS Certified Cloud Practitioner — Study",
    description:
      "20 original English questions, no timer. Review explanations for every option and AWS documentation after finishing. All four CLF-C02 domains.",
    config: {
      ...defaultConfig("aws-clf-c02"),
      questionCount: 20,
      allowUnknownAnswer: true,
      questionTypes: ["one_choice", "multi_choice"],
      pageSize: 1,
    },
  },
  {
    id: "aws-clf-c02-demo",
    title: "AWS Certified Cloud Practitioner — Exam Demo",
    description:
      "50 scored English questions in 90 minutes. CLF-C02 domain proportions; experimental unscored questions omitted. Multiple-response answers must match the complete key. Raw practice score, not an AWS scaled score.",
    config: {
      ...defaultConfig("aws-clf-c02"),
      questionCount: 50,
      durationMinutes: 90,
      questionTypes: ["one_choice", "multi_choice"],
      pageSize: 1,
    },
  },
  {
    id: "python-nauka2",
    title: "Programowanie python - politechnika gdanska 2 — Nauka 2",
    description:
      "Zakres z zaproszenia: Python i backend. 6 pytań bez timera, z objaśnieniami po zakończeniu.",
    config: {
      ...defaultConfig("python2"),
      questionCount: 6,
      allowUnknownAnswer: true,
      questionTypes: ["one_choice", "multi_choice", "short_open"],
      pageSize: 1,
    },
  },
  {
    id: "python-weryfikacja2",
    title: "Programowanie python - politechnika gdanska 2 — Weryfikacja 2",
    description:
      "Python i pełny zakres backendu, w tym DDD, Clean, heksagon, Wagtail i Admin. 30 pytań w 20 minut, pełny zestaw odpowiedzi albo zero punktów.",
    config: {
      ...defaultConfig("python2"),
      questionCount: 30,
      durationMinutes: 20,
      questionTypes: ["one_choice", "multi_choice", "short_open"],
      pageSize: 5,
    },
  },
  {
    id: "python-nauka",
    title: "Programowanie python - politechnika gdanska — Nauka",
    description:
      "6 zróżnicowanych pytań, bez timera. Objaśnienia i źródła po zakończeniu.",
    config: {
      ...defaultConfig("python"),
      questionCount: 6,
      allowUnknownAnswer: true,
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
