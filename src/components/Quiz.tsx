import {
  Center,
  Heading,
  VStack,
  Spacer,
  Flex,
  StackDivider,
} from "@chakra-ui/react";
import _ from "lodash";
import { useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import {
  getQuizDataFromFile,
  QuizAnswerResultType,
  QuizContent,
  QuizElement,
  QuizStatusType,
} from "../utils/helpers";
import { validateSingleQuestion as validateQuestion } from "../utils/quizValidator";
import QuestionCardGenerator from "./QuestionCardGenerator";
import QuizHeader from "./QuizHeader";
import QuizStatusManager from "./QuizStatusManager";
import { QuestionTypes, QuizOptions, QuizQuestionAmounts } from "./SelectQuiz";

const Quiz = () => {
  const [quizContent, setQuizContent] = useState<QuizContent>();
  const [loading, setLoading] = useState<boolean>(true);
  const { quiz } = useParams();
  const [searchParams] = useSearchParams({});
  const [quizStatus, setQuizStatus] = useState<QuizStatusType>(
    QuizStatusType.CAN_SUBMIT
  );
  const [timer, setTimer] = useState<number>(0);
  const [currentScore, setCurrentScore] = useState<number>(0);
  const [countTimer, setCountTimer] = useState<boolean>(false);

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

  const questionTypes = useMemo(
    () =>
      searchParams
        .getAll("qtype")
        .map(
          (idx: string): QuestionTypes =>
            Object.values(QuestionTypes)[parseInt(idx)] as QuestionTypes
        ),
    [searchParams]
  );

  const amountOfQuestions = useMemo(() => {
    const param = searchParams.get("amount");

    if (param === null) {
      return QuizQuestionAmounts.ALL;
    }
    return param;
  }, [searchParams]);

  const maxScore = useMemo(() => {
    if (!quizContent) {
      return 0;
    }

    let curr = 0;
    quizContent.quiz_elements.forEach((element) => {
      curr += element.scale ?? 1;
    });
    return curr;
  }, [quizContent]);

  useEffect(() => {
    const intervalIdx = setInterval(() => {
      console.log(countTimer);
      if (countTimer) {
        setTimer((t) => t + 1);
      }
    }, 1000);

    if (quiz) {
      getQuizDataFromFile(quiz).then((qc) => {
        const questions = prepareQuestions(qc);
        setQuizContent(questions);
        document.title = `Quiz: ${questions.name}`;
      });
    }
    setLoading(false);

    document.title = "Loading quiz...";
    return () => {
      clearInterval(intervalIdx);
    };
  }, []);

  useEffect(() => {
    console.log(searchOpts.includes(QuizOptions.TIMER));
    setCountTimer(searchOpts.includes(QuizOptions.TIMER));
  }, [searchParams]);

  const saveQuizInLocalStorage = () => {
    if (quizContent) {
      localStorage.setItem(quizContent.name, JSON.stringify(quizContent));
    }
  };

  const limitNoOfQuestions = (newQuizContent: QuizContent) => {
    if (amountOfQuestions === QuizQuestionAmounts.ALL) {
      return;
    }

    const parsedAmount = parseInt(amountOfQuestions);
    if (parsedAmount === undefined) {
      throw Error("Cannot parse amount option!");
    }
    newQuizContent.quiz_elements = newQuizContent.quiz_elements.slice(
      0,
      parsedAmount
    );
  };

  const removeQuestionTypes = (newQuizContent: QuizContent) => {
    const qTypeDictionary = {
      long_open: QuestionTypes.OPEN_LONG,
      short_open: QuestionTypes.OPEN_SHORT,
      multi_choice: QuestionTypes.MULTI,
      one_choice: QuestionTypes.ONE_CHOICE,
    };
    newQuizContent.quiz_elements = newQuizContent.quiz_elements.filter((el) =>
      questionTypes.includes(qTypeDictionary[el.type])
    );
  };

  const prepareQuestions = (newQuizContent: QuizContent): QuizContent => {
    if (searchOpts.includes(QuizOptions.RANDOM_ORDER)) {
      newQuizContent.quiz_elements.sort(() => Math.random() - 0.5);
    }

    removeQuestionTypes(newQuizContent);
    limitNoOfQuestions(newQuizContent);

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

  const quizResults = useMemo<number[]>(() => {
    if (!quizContent) {
      return [];
    }

    return quizContent.quiz_elements.map((element) =>
      validateQuestion(
        element,
        searchOpts.includes(QuizOptions.ALLOW_PARTIAL_CORRECT)
      )
    );
  }, [quizContent?.quiz_elements]);

  const handleQuizSubmit = () => {
    setQuizStatus(QuizStatusType.SUBMITTED);
    scroll(0, 0);
    setCurrentScore(quizResults.reduce((a, b) => a + b, 0));
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

  const createQuizElement = (element: QuizElement, idx: number) => {
    let answerResult = undefined;

    if (quizStatus === QuizStatusType.SUBMITTED) {
      const score = validateQuestion(
        element,
        searchOpts.includes(QuizOptions.ALLOW_PARTIAL_CORRECT)
      );

      if (score === 0) {
        answerResult = QuizAnswerResultType.INCORRECT;
      } else if (score < (element.scale ?? 1)) {
        answerResult = QuizAnswerResultType.PARTIALLY_CORRECT;
      } else {
        answerResult = QuizAnswerResultType.CORRECT;
      }
    }

    return (
      <QuestionCardGenerator
        onAnswerSet={(el: QuizElement) => {
          let newQuizContent = _.clone(quizContent);
          newQuizContent.quiz_elements[idx] = el;
          setQuizContent(newQuizContent);
          if (searchOpts.includes(QuizOptions.SAVE_IN_LS)) {
            saveQuizInLocalStorage();
          }
        }}
        quizElement={element}
        num={idx + 1}
        key={idx}
        canAnswer={quizStatus != QuizStatusType.SUBMITTED}
        questionResult={answerResult}
      />
    );
  };

  return (
    <Flex
      flexDirection="column"
      display="flex"
      width={{ base: "80%", xl: "60%", sm: "90%" }}
      mx="auto"
      mb="30px"
    >
      <QuizHeader
        quizName={quizContent.name}
        quizStatus={quizStatus}
        currentScore={currentScore}
        maxScore={maxScore}
        options={searchOpts}
        onResetButtonClick={handleResetQuiz}
        currentTime={timer}
      />
      <VStack divider={<StackDivider />} spacing="10" mt="13px">
        {quizContent.quiz_elements.map(createQuizElement)}
      </VStack>
      <Spacer minHeight="30px" />
      <QuizStatusManager
        onQuizSubmit={handleQuizSubmit}
        onQuizStatusChange={setQuizStatus}
        quizStatus={quizStatus}
      />
    </Flex>
  );
};

export default Quiz;
