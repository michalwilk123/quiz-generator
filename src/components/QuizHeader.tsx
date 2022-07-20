import {
  Heading,
  Link,
  Text,
  Box,
  Flex,
  Button,
} from "@chakra-ui/react";
import { useMemo } from "react";
import { QuizStatusType } from "../utils/helpers";
import QuizSummaryTable from "./QuizSummaryTable";
import { QuizOptions } from "./SelectQuiz";

interface QuizHeaderProps {
  quizName: string;
  quizStatus: QuizStatusType;
  currentScore: number;
  maxScore: number;
  options: QuizOptions[];
  currentTime?: number;
  onResetButtonClick: () => any;
  onTryAgainButton: () => any;
}

const QuizHeader = (props: QuizHeaderProps) => {
  const resultHeaderColor = useMemo<string>((): string => {
    const ratio = props.currentScore / props.maxScore;

    if (ratio > 0.7) {
      return "green.500";
    }

    if (ratio < 0.3) {
      return "red.500";
    }

    return "whiteAlpha.800";
  }, [props.currentScore, props.maxScore]);

  return (
    <>
      <Heading color="whiteAlpha.800"> {props.quizName}</Heading>
      {props.quizStatus === QuizStatusType.SUBMITTED && (
        <>
          <Flex flexDir="row">
            <Text my="auto" fontSize="2xl" color={resultHeaderColor}>
              Result: {Math.floor((props.currentScore * 100) / props.maxScore)}%
              ({props.currentScore} / {props.maxScore})
            </Text>
            <Button
              py={{ sm: "5px", xl: "24px" }}
              colorScheme="teal"
              maxW="700px"
              ml="auto"
              onClick={props.onTryAgainButton}
            >
              Try Again
            </Button>
          </Flex>
          {props.options.includes(QuizOptions.SHOW_SUMMARY) && (
            <QuizSummaryTable quizName={""} quizResults={[]} quizScores={[]} />
          )}
        </>
      )}
      <Box>
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
      </Box>
    </>
  );
};

export default QuizHeader;
