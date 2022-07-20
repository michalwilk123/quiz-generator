import { Heading, Link, HStack, Text } from "@chakra-ui/react";
import { QuizStatusType } from "../utils/helpers";
import { QuizOptions } from "./SelectQuiz";

interface QuizHeaderProps {
  quizName: string;
  quizStatus: QuizStatusType;
  currentScore: number;
  maxScore: number;
  options: QuizOptions[];
  currentTime?: number;
  onResetButtonClick: () => any;
}

const QuizHeader = (props: QuizHeaderProps) => {
  return (
    <>
      <Heading color="whiteAlpha.800"> {props.quizName}</Heading>
      {props.quizStatus === QuizStatusType.SUBMITTED && (
        <Text fontSize="2xl" color="whiteAlpha.800">
          Result: {Math.floor((props.currentScore * 100) / props.maxScore)}% (
          {props.currentScore} / {props.maxScore})
        </Text>
      )}
      <HStack spacing={5}>
        {props.options.includes(QuizOptions.TIMER) && (
          <Text color="whiteAlpha.800">Time: {props.currentTime} s</Text>
        )}
        {props.quizStatus !== QuizStatusType.SUBMITTED && (
          <Link
            fontWeight="bold"
            color="teal"
            onClick={props.onResetButtonClick}
          >
            Reset
          </Link>
        )}
      </HStack>
    </>
  );
};

export default QuizHeader;
