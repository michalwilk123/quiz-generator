import quiz_config from "../quiz_config";

export interface QuizElement {}

export interface QuizContent {
  name: string;
  filename: string;
  quiz_elements: object[];
}

export const getQuizDataFromFile = async (
  quizUrl: string
): Promise<QuizContent> => {
  const quizConf = quiz_config.find((conf) => conf.urlName === quizUrl);

  if (!quizConf?.filename) {
    throw Error("No pathname specified!");
  }

  const quizContent = await import(`../quizes/${quizConf.filename}`);

  return {
    name: quizContent["name"],
    filename: quizConf?.filename,
    quiz_elements: quizContent["quiz_elements"],
  };
};
