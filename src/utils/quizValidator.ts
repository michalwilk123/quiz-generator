import { QuizElement } from "./helpers";
import { compareTwoStrings } from "string-similarity";

const normalizeText = (text: string): string =>
  text
    .replace(/ +/g, " ")
    .replace(/[.,]+$/g, "")
    .replace(/( +)([.,\-*+|&])( +)/g, "$2")
    .toLowerCase();

export const validateSingleQuestion = (
  quizElement: QuizElement,
  allowPartial: boolean = false
): number => {
  /*
  Returns value from 0 to 1. 1 if fully correct
  */
  let score = 0;

  switch (quizElement.type) {
    case "one_choice":
      if (quizElement.chosen_answer && quizElement.correct_answer) {
        score =
          quizElement.chosen_answer === quizElement.correct_answer ? 1 : 0;
      }
      break;
    case "multi_choice":
      if (quizElement.chosen_answers && quizElement.correct_answers) {
        let correct_answers = 0;
        quizElement.chosen_answers.forEach((answer) => {
          if (quizElement.correct_answers?.includes(answer)) {
            correct_answers++;
          } else {
            correct_answers--;
          }
        });
        correct_answers = Math.max(correct_answers, 0);
        score = correct_answers / quizElement.correct_answers.length;
        console.log(`DSDSJKAN: ${score}`);
        if (!allowPartial) {
          score = Math.floor(score);
        }
      }
      break;
    case "long_open":
      if (quizElement.chosen_answer && quizElement.correct_answer) {
        const [normalized_chosen, normalized_correct] = [
          normalizeText(quizElement.chosen_answer),
          normalizeText(quizElement.correct_answer),
        ];
        if (allowPartial) {
          score = compareTwoStrings(normalized_chosen, normalized_correct);
          score = Math.round((score + Number.EPSILON) * 100) / 100;
          console.log(`SCORE 4 QUSTION: ${score}`);
        } else {
          score = normalized_chosen === normalized_correct ? 1 : 0;
        }
      }
      break;
    case "short_open":
      if (quizElement.chosen_answer && quizElement.correct_answer) {
        const [normalized_chosen, normalized_correct] = [
          normalizeText(quizElement.chosen_answer),
          normalizeText(quizElement.correct_answer),
        ];
        score = normalized_chosen === normalized_correct ? 1 : 0;
      }
      break;
  }

  return Math.floor(score * (quizElement.scale ?? 1));
};
