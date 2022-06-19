import {
  Box,
  BoxProps,
  Checkbox,
  CheckboxGroup,
  Flex,
  Heading,
  Input,
  Radio,
  RadioGroup,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import _ from "lodash";
import { memo } from "react";
import {
  isAnswerCorrect,
  QuizAnswerResultType,
  QuizElement,
  userSelectedAnswer,
} from "../utils/helpers";

interface DefaultCardProps {
  question: QuizElement;
  score?: number;
  canAnswer: boolean;
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

const LongOpenCard = memo(
  ({ question, onAnswerSelected, canAnswer }: DefaultCardProps) => {
    return (
      <Textarea
        borderColor="whiteAlpha.400"
        backgroundColor="blackAlpha.400"
        value={question.chosen_answer ?? ""}
        onChange={(e) => {
          let newQuizElement = _.clone(question);
          newQuizElement.chosen_answer = e.target.value;
          onAnswerSelected(newQuizElement);
        }}
        isDisabled={!canAnswer}
      />
    );
  }
);

const ShortOpenCard = memo(
  ({ question, onAnswerSelected, canAnswer }: DefaultCardProps) => {
    return (
      <Input
        borderColor="whiteAlpha.400"
        backgroundColor="blackAlpha.400"
        value={question.chosen_answer ?? ""}
        onChange={(e) => {
          let newQuizElement = _.clone(question);
          newQuizElement.chosen_answer = e.target.value;
          onAnswerSelected(newQuizElement);
        }}
        isDisabled={!canAnswer}
      />
    );
  }
);

const MultiChoiceCard = memo(
  ({ question, onAnswerSelected, canAnswer }: DefaultCardProps) => {
    const handleAnswersSelected = (checkboxVals: string[] | number[]) => {
      if (!canAnswer) {
        return;
      }

      checkboxVals = checkboxVals.map((el) => el.toString());
      let questionCpy = _.cloneDeep(question);
      questionCpy.chosen_answers = checkboxVals;
      onAnswerSelected(questionCpy);
    };

    const createCheckboxElement = (el: any, idx: any) => {
      if (canAnswer) {
        return (
          <Checkbox
            width="100%"
            pl="7px"
            py="3px"
            value={el}
            key={idx}
            name={idx}
          >
            {el}
          </Checkbox>
        );
      }

      let additionalChboxStyles = {};

      if (userSelectedAnswer(el, question)) {
        if (isAnswerCorrect(el, question)) {
          additionalChboxStyles = {
            border: "solid",
            py: "0px",
            pl: "4px",
            borderColor: "whiteAlpha.600",
            bgColor: "green.700",
          };
        } else {
          additionalChboxStyles = {
            bgColor: "red.700",
          };
        }
      } else {
        if (isAnswerCorrect(el, question)) {
          additionalChboxStyles = {
            bgColor: "green.700",
            opacity: "50%",
          };
        } else {
        }
      }

      return (
        <Checkbox
          width="100%"
          pl="7px"
          py="3px"
          value={el}
          key={idx}
          name={idx}
          isDisabled
          {...additionalChboxStyles}
        >
          {el}
        </Checkbox>
      );
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
        {question.answers.map(createCheckboxElement)}
      </CheckboxGroup>
    );
  }
);

const OneChoiceCard = memo(
  ({ question, canAnswer, onAnswerSelected }: DefaultCardProps) => {
    const handleChoiceChange = (val: string) => {
      let newQuestionEl = _.clone(question);
      newQuestionEl.chosen_answer = val;
      onAnswerSelected(newQuestionEl);
    };

    if (!question.answers) {
      return (
        <InvalidCard message="OneChoice Card should contain list of available answers!" />
      );
    }

    const createRadioElement = (el: any, idx: any) => {
      if (canAnswer) {
        return (
          <Flex as="label" key={idx} my="7px" width="100%" py="7px" pl="10px">
            <Radio value={el} name={idx} width="100%">
              {el}
            </Radio>
          </Flex>
        );
      }

      let additionalRadioStyles = {};

      if (userSelectedAnswer(el, question)) {
        if (isAnswerCorrect(el, question)) {
          additionalRadioStyles = {
            border: "solid",
            py: "4px",
            pl: "8px",
            borderColor: "whiteAlpha.600",
            bgColor: "green.700",
          };
        } else {
          additionalRadioStyles = {
            bgColor: "red.700",
          };
        }
      } else {
        if (isAnswerCorrect(el, question)) {
          additionalRadioStyles = {
            bgColor: "green.700",
            opacity: "50%",
          };
        } else {
        }
      }

      return (
        <Flex
          as="label"
          my="7px"
          width="100%"
          key={idx}
          py="7px"
          pl="10px"
          {...additionalRadioStyles}
        >
          <Radio value={el} name={idx} width="100%" isDisabled>
            {el}
          </Radio>
        </Flex>
      );
    };

    return (
      <RadioGroup
        width="100%"
        onChange={handleChoiceChange}
        value={question.chosen_answer}
      >
        {question.answers.map(createRadioElement)}
      </RadioGroup>
    );
  }
);

interface Props extends BoxProps {
  onAnswerSet: (ans: QuizElement) => any;
  quizElement: QuizElement;
  questionResult?: QuizAnswerResultType;
  canAnswer: boolean;
  num: number;
}

const QuestionCardGenerator = (props: Props) => {
  let questionComponent = undefined;
  let answerResultMessage = null;
  let componentProps = {
    question: props.quizElement,
    onAnswerSelected: props.onAnswerSet,
    canAnswer: props.canAnswer,
  };

  switch (props.quizElement.type) {
    case "one_choice":
      questionComponent = <OneChoiceCard {...componentProps} />;
      break;
    case "multi_choice":
      questionComponent = <MultiChoiceCard {...componentProps} />;
      break;
    case "long_open":
      questionComponent = <LongOpenCard {...componentProps} />;
      break;
    case "short_open":
      questionComponent = <ShortOpenCard {...componentProps} />;
      break;
    default:
      questionComponent = (
        <InvalidCard
          message={`Unknown quiz element type: ${props.quizElement.type}`}
        />
      );
  }

  switch (props.questionResult) {
    case QuizAnswerResultType.CORRECT:
      answerResultMessage = (
        <Text fontWeight="semibold" color="green.500">
          Correct!
        </Text>
      );
      break;
    case QuizAnswerResultType.INCORRECT:
      if (props.quizElement.correct_answer) {
        answerResultMessage = (
          <Text fontWeight="semibold" color="red.500">
            {`Answer was not correct. Correct answer: ${props.quizElement.correct_answer}`}
          </Text>
        );
      } else if (props.quizElement.correct_answers) {
        answerResultMessage = (
          <Text fontWeight="semibold" color="red.500">
            {`Answer was not correct! Correct answers: ${props.quizElement.correct_answers.join(
              ", "
            )}`}
          </Text>
        );
      }
      break;
    case QuizAnswerResultType.PARTIALLY_CORRECT:
      if (props.quizElement.correct_answers) {
        answerResultMessage = (
          <Text fontWeight="semibold" color="orange.500">
            {`Your answer was partially correct! Correct answers: ${props.quizElement.correct_answers.join(
              ", "
            )}`}
          </Text>
        );
      }
      if (props.quizElement.correct_answer) {
        answerResultMessage = (
          <Text fontWeight="semibold" color="orange.500">
            {`Your answer was partially correct! Correct answer: ${props.quizElement.correct_answer}`}
          </Text>
        );
      }
      break;
  }

  return (
    <VStack color="whiteAlpha.900" minW="400px" align="baseline" width="100%">
      <Text fontSize="xl" fontWeight="bold">
        {props.num}) {props.quizElement.question}
      </Text>
      {!props.canAnswer && answerResultMessage}
      {questionComponent}
    </VStack>
  );
};

export default QuestionCardGenerator;
