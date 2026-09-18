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
    id: "isp",
    title: "ISP",
    description: "Programmable systems · 5 random questions",
    config: defaultConfig("isp"),
  },
  {
    id: "zsbd",
    title: "ZSBD",
    description: "Database management · 5 random questions",
    config: defaultConfig("zsbd"),
  },
];
export default preparedExams;
