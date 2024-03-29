import quizConfig from "../quiz_config";

const availableQuizes = ( import.meta as unknown as any).glob("../quizes/*.json");

export interface QuizElement {
  question: string;
  type: "long_open" | "short_open" | "multi_choice" | "one_choice";
  answers?: string[];
  correct_answers?: string[];
  correct_answer?: string;
  chosen_answers?: string[];
  chosen_answer?: string;
  scale?: number;
}

export enum QuizStatusType {
  CANNOT_SUBMIT,
  CAN_SUBMIT,
  SUBMITTED,
}

export enum QuizAnswerResultType {
  CORRECT,
  INCORRECT,
  PARTIALLY_CORRECT,
}

export interface QuizContent {
  name: string;
  quiz_elements: QuizElement[];
}

export const getQuizDataFromFile = async (
  quizUrl: string,
  forceReload: boolean = false
): Promise<QuizContent> => {
  const quizConf = quizConfig.find((conf: any) => conf.urlName === quizUrl);

  if (!quizConf?.filename) {
    throw Error("No pathname specified!");
  }

  const quizContent: any = await availableQuizes[
    `../quizes/${quizConf.filename}`
  ]();
  console.log(quizContent);

  if (!forceReload) {
    const savedQuiz = localStorage.getItem(quizContent["name"]);

    if (savedQuiz) {
      try {
        return JSON.parse(savedQuiz);
      } catch (e) {
        console.error(e);
      }
    }
  }

  return {
    name: quizContent["name"],
    quiz_elements: quizContent["quiz_elements"],
  };
};

export const userSelectedAnswer = (
  answer: string,
  question: QuizElement
): boolean => {
  if (question.chosen_answer) {
    return question.chosen_answer === answer;
  }

  if (question.chosen_answers) {
    return question.chosen_answers.includes(answer);
  }

  return false;
};

export const isAnswerCorrect = (
  answer: string,
  question: QuizElement
): boolean => {
  if (question.correct_answer) {
    return answer === question.correct_answer;
  }

  if (question.correct_answers) {
    return question.correct_answers.includes(answer);
  }

  return false;
};
