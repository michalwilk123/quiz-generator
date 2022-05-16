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
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { getQuizDataFromFile, QuizContent } from "../utils/helpers";
import QuestionCardGenerator from "./QuestionCardGenerator";

type Props = {};

const Quiz = (props: Props) => {
  const [quizContent, setQuizContent] = useState<QuizContent>();
  const [loading, setLoading] = useState<boolean>(true);
  const { quiz } = useParams();
  // const [ searchParameters ] = useSearchParams();
  const [searchParams, setSearchParams] = useSearchParams({});
  const [canSubmit, setCanSubmit] = useState<boolean>(true);
  const [chosenAnswers, setChosenAnswers] = useState<any[]>();
  const [timer, setTimer] = useState<number>(0);

  const setupQuiz = () => {};
  // console.log(searchParams.getAll("conf"));

  useEffect(() => {
    const intervalIdx = setInterval(()=>
      setTimer((t)=>t + 1)
    , 1000);

    if (quiz) {
      getQuizDataFromFile(quiz)
        .then((qc) => {
          setQuizContent(qc);
          setChosenAnswers(Array(qc.quiz_elements.length));
        })
        .catch((e) => console.error(e));
    }
    setLoading(false);
    return () => {
      clearInterval(intervalIdx);
    }
  }, []);

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
        <Text color="whiteAlpha.800">Time: {timer} s</Text>
        <Link fontWeight="bold" color="teal">
          Reset
        </Link>
      </HStack>
      <VStack divider={<StackDivider />} spacing="10" mt="13px">
        {quizContent.quiz_elements.slice(0, 4).map((el, idx) => (
          <QuestionCardGenerator
            quiz_element={el}
            num={idx + 1}
            color="whiteAlpha.900"
            minW="400px"
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
