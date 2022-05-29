import {
  Box,
  BoxProps,
  Checkbox,
  CheckboxGroup,
  Heading,
  Input,
  Radio,
  RadioGroup,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import _ from "lodash";
import { useCallback, useEffect, useState } from "react";
import { QuizElement } from "../utils/helpers";

interface DefaultCardProps {
  question: QuizElement;
  score?: number;
  userResult: "correct" | "partially_correct" | "incorrect" | "neutral";
  onAnswerSelected: (answer: QuizElement) => any;
}

const InvalidCard = ({ message }: { message: string }) => (
  <Box
    borderColor="red"
    borderWidth="5px"
    p="20px"
    backgroundColor="yellow.100"
  >
    <Heading color="blackAlpha.900" size="xl">
      {message}
    </Heading>
  </Box>
);

const LongOpenCard = ({ question, onAnswerSelected }: DefaultCardProps) => {
  const [answer, setAnswer] = useState<string>(question.chosen_answer ?? "");

  useEffect(() => {
    setAnswer(question.chosen_answer ?? "");
  }, [question]);

  const debouncedHandler = useCallback(
    _.debounce((e) => {
      let newQuizElement = _.clone(question);
      newQuizElement.chosen_answer = e.target.value;
      onAnswerSelected(newQuizElement);
    }, 400),
    []
  );

  return (
    <Textarea
      borderColor="whiteAlpha.400"
      backgroundColor="blackAlpha.400"
      value={answer}
      onChange={(e) => {
        setAnswer(e.target.value);
        debouncedHandler(e);
      }}
    />
  );
};

const ShortOpenCard = ({ question, onAnswerSelected }: DefaultCardProps) => {
  const [answer, setAnswer] = useState<string>(question.chosen_answer ?? "");

  const debouncedHandler = useCallback(
    _.debounce((e) => {
      let newQuizElement = _.clone(question);
      newQuizElement.chosen_answer = e.target.value;
      onAnswerSelected(newQuizElement);
    }, 300),
    []
  );

  return (
    <Input
      borderColor="whiteAlpha.400"
      backgroundColor="blackAlpha.400"
      value={answer}
      onChange={(e) => {
        setAnswer(e.target.value);
        debouncedHandler(e);
      }}
    />
  );
};

const MultiChoiceCard = ({ question, onAnswerSelected }: DefaultCardProps) => {
  const handleAnswersSelected = (checkboxVals: string[] | number[]) => {
    checkboxVals = checkboxVals.map((el) => el.toString());
    let questionCpy = _.cloneDeep(question);
    questionCpy.chosen_answers = checkboxVals;
    onAnswerSelected(questionCpy);
  };

  if (!question.answers) {
    return (
      <InvalidCard message="OneChoice Card should contain list of available answers!" />
    );
  }

  return (
    <CheckboxGroup
      value={question.chosen_answers ?? []}
      onChange={handleAnswersSelected}
    >
      {question.answers.map((el: any, idx: any) => {
        return (
          <Checkbox value={el} key={idx} name={idx}>
            {el}
          </Checkbox>
        );
      })}
    </CheckboxGroup>
  );
};

const OneChoiceCard = ({ question, onAnswerSelected }: DefaultCardProps) => {
  // const [value, setValue] = useState<string>(selectedAnswer ?? "-1");

  const handleChoiceChange = (val: string) => {
    // setValue(val);
    let newQuestionEl = _.clone(question);
    newQuestionEl.chosen_answer = val;
    onAnswerSelected(newQuestionEl);
  };

  if (!question.answers) {
    return (
      <InvalidCard message="OneChoice Card should contain list of available answers!" />
    );
  }

  return (
    <RadioGroup
      minW="inherit"
      onChange={handleChoiceChange}
      value={question.chosen_answer}
    >
      <VStack align="baseline">
        {question.answers.map((el: any, idx: any) => {
          return (
            <Radio value={el} key={idx} name={idx}>
              {el}
            </Radio>
          );
        })}
      </VStack>
    </RadioGroup>
  );
};

interface Props extends BoxProps {
  onAnswerSet: (ans: QuizElement) => any;
  quiz_element: QuizElement;
  num: number;
}

const QuestionCardGenerator = (props: Props) => {
  let comp = undefined;
  switch (props.quiz_element.type) {
    case "one_choice":
      comp = (
        <OneChoiceCard
          question={props.quiz_element}
          onAnswerSelected={props.onAnswerSet}
          userResult="neutral"
        />
      );
      break;
    case "multi_choice":
      comp = (
        <MultiChoiceCard
          question={props.quiz_element}
          onAnswerSelected={props.onAnswerSet}
          userResult="neutral"
        />
      );
      break;
    case "long_open":
      comp = (
        <LongOpenCard
          question={props.quiz_element}
          onAnswerSelected={props.onAnswerSet}
          userResult="neutral"
        />
      );
      break;
    case "short_open":
      comp = (
        <ShortOpenCard
          question={props.quiz_element}
          onAnswerSelected={props.onAnswerSet}
          userResult="neutral"
        />
      );
      break;
    default:
      comp = (
        <InvalidCard
          message={`Unknown quiz element type: ${props.quiz_element.type}`}
        />
      );
  }
  return (
    <VStack color="whiteAlpha.900" minW="400px" align="baseline" width="100%">
      <Text fontSize="xl" fontWeight="bold">
        {props.num}) {props.quiz_element.question}
      </Text>
      {comp}
    </VStack>
  );
};

export default QuestionCardGenerator;
