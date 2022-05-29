import {
  Text,
  Button,
  Center,
  Heading,
  VStack,
  Spacer,
  Flex,
  StackDivider,
  Link,
  HStack,
} from "@chakra-ui/react";
import _ from "lodash";
import { useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import {
  getQuizDataFromFile,
  QuizContent,
  QuizElement,
} from "../utils/helpers";
import QuestionCardGenerator from "./QuestionCardGenerator";
import { QuizOptions } from "./SelectQuiz";

type Props = {};

const Quiz = (props: Props) => {
  const [quizContent, setQuizContent] = useState<QuizContent>();
  const [loading, setLoading] = useState<boolean>(true);
  const { quiz } = useParams();
  const [searchParams, setSearchParams] = useSearchParams({});
  const [canSubmit, setCanSubmit] = useState<boolean>(true);
  const [timer, setTimer] = useState<number>(0);
  const [questionLimit, setQuestionLimit] = useState(20);

  const searchOpts = useMemo(
    () =>
      searchParams
        .getAll("conf")
        .map(
          (idx: string): QuizOptions =>
            Object.values(QuizOptions)[parseInt(idx)] as QuizOptions
        ),
    [searchParams]
  );

  const saveQuizInLocalStorage = () => {
    if (quizContent) {
      localStorage.setItem(quizContent.name, JSON.stringify(quizContent));
    }
  };

  useEffect(() => {
    const intervalIdx = setInterval(() => {
      if (searchOpts.includes(QuizOptions.TIMER)) {
        setTimer((t) => t + 1);
      }
    }, 1000);

    if (quiz) {
      getQuizDataFromFile(quiz)
        .then((qc) => {
          setQuizContent(prepareQuestions(qc));
        })
        .catch((e) => console.error(e));
    }
    setLoading(false);
    return () => {
      clearInterval(intervalIdx);
    };
  }, []);

  const prepareQuestions = (newQuizContent: QuizContent): QuizContent => {
    if (searchOpts.includes(QuizOptions.RANDOM_ORDER)) {
      newQuizContent.quiz_elements.sort(() => Math.random() - 0.5);
    }

    if (searchOpts.includes(QuizOptions.RUN_ALL)) {
      setQuestionLimit(Infinity);
    }

    newQuizContent.quiz_elements.forEach((val, idx) => {
      if (newQuizContent.quiz_elements[idx].scale) {
        newQuizContent.quiz_elements[idx].scale = 1.0;
      }
    });

    return newQuizContent;
  };

  const handleResetQuiz = async () => {
    let newQuizContent = _.clone(quizContent);
    newQuizContent?.quiz_elements.map((quizElement) => {
      quizElement.chosen_answer = undefined;
      quizElement.chosen_answers = undefined;
    });
    await setQuizContent(newQuizContent);
    if (searchOpts.includes(QuizOptions.SAVE_IN_LS)) {
      saveQuizInLocalStorage();
    }
    setTimer(0);
  };

  if (loading) {
    return <></>;
  }

  if (!quizContent) {
    return (
      <Center>
        <Heading>Could not find quiz with identifier: {quiz}</Heading>
      </Center>
    );
  }

  const handleOnQuizSubmit = () => {};

  return (
    <Flex
      flexDirection="column"
      display="flex"
      width={{ base: "80%", xl: "60%", sm: "90%" }}
      mx="auto"
      mb="30px"
    >
      <Heading color="whiteAlpha.800"> {quizContent.name}</Heading>
      <HStack spacing={5}>
        {searchOpts.includes(QuizOptions.TIMER) && (
          <Text color="whiteAlpha.800">Time: {timer} s</Text>
        )}
        <Link fontWeight="bold" color="teal" onClick={handleResetQuiz}>
          Reset
        </Link>
      </HStack>
      <VStack divider={<StackDivider />} spacing="10" mt="13px">
        {quizContent.quiz_elements.slice(0, questionLimit).map((el, idx) => (
          <QuestionCardGenerator
            onAnswerSet={(el: QuizElement) => {
              let newQuizContent = _.clone(quizContent);
              newQuizContent.quiz_elements[idx] = el;
              setQuizContent(newQuizContent);
              if (searchOpts.includes(QuizOptions.SAVE_IN_LS)) {
                saveQuizInLocalStorage();
              }
            }}
            quiz_element={el}
            num={idx + 1}
            key={idx}
          />
        ))}
      </VStack>
      <Spacer minHeight="30px" />
      <Center>
        <Button
          py="24px"
          colorScheme="teal"
          isDisabled={!canSubmit}
          maxW="700px"
          width="100%"
        >
          Submit
        </Button>
      </Center>
      {canSubmit || (
        <Text color="red.700" fontWeight="bold" my="10px">
          You have not filled the quiz correctly!
        </Text>
      )}
    </Flex>
  );
};

export default Quiz;
