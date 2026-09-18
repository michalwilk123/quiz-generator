export interface QuizDefinition {
  filename: string;
  name: string;
  urlName: string;
}
const quizConfig: QuizDefinition[] = [
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
