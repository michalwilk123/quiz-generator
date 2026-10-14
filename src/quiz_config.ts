export interface QuizDefinition {
  filename: string;
  name: string;
  urlName: string;
  language?: "en";
}
const quizConfig: QuizDefinition[] = [
  {
    filename: "python-fullstack.json",
    name: "Programowanie Python PG — Fullstack",
    urlName: "python-fullstack",
  },
  {
    filename: "aws-clf-c02.json",
    name: "AWS Certified Cloud Practitioner (CLF-C02)",
    urlName: "aws-clf-c02",
    language: "en",
  },
  {
    filename: "python2.json",
    name: "Programowanie python - politechnika gdanska 2",
    urlName: "python2",
  },
  {
    filename: "python.json",
    name: "Programowanie python - politechnika gdanska",
    urlName: "python",
  },
  { filename: "sieciTel.json", name: "Sieci telekomunikacyjne", urlName: "st" },
  {
    filename: "isp.json",
    name: "Interaktywne Systemy Programowalne",
    urlName: "isp",
  },
  {
    filename: "zsbd.json",
    name: "Zarządzanie Systemami Baz Danych",
    urlName: "zsbd",
  },
];
export default quizConfig;
