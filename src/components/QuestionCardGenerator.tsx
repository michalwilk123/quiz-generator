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
import { useState } from "react";

interface DefaultCardProps {
  question: any;
  selectedAnswer?: any;
  onAnswerSelected: (choice: number) => any;
  setValidated: (vaild: boolean) => any;
  maxPoints?: number;
}

const LongOpenCard = ({ question, selectedAnswer }: {} & DefaultCardProps) => {
  const [answer, setAnswer] = useState<string>(selectedAnswer ?? "");

  return (
    <Textarea
      borderColor="whiteAlpha.400"
      backgroundColor="blackAlpha.400"
      value={answer}
      onChange={(e) => setAnswer(e.target.value)}
    />
  );
};

const ShortOpenCard = ({ question, selectedAnswer }: {} & DefaultCardProps) => {
  const [answer, setAnswer] = useState<string>(selectedAnswer ?? "");

  return (
    <Input
      borderColor="whiteAlpha.400"
      backgroundColor="blackAlpha.400"
      value={answer}
      onChange={(e) => setAnswer(e.target.value)}
    />
  );
};

const MultiChoiceCard = ({
  question,
  selectedAnswer,
}: {} & DefaultCardProps) => {
  const [answers, setAnswers] = useState<(string | number)[]>(
    selectedAnswer ?? []
  );

  return (
    <CheckboxGroup onChange={setAnswers}>
      {question.answers.map((el: any, idx: any) => {
        return (
          <Checkbox value={idx.toString()} key={idx} name={idx}>
            {el}
          </Checkbox>
        );
      })}
    </CheckboxGroup>
  );
};

const OneChoiceCard = ({
  question,
  onAnswerSelected,
  selectedAnswer,
}: {} & DefaultCardProps) => {
  const [value, setValue] = useState<string>(selectedAnswer ?? "-1");

  const handleChoiceChange = (val: string) => {
    setValue(val);
    onAnswerSelected(parseInt(val));
  };

  return (
    <RadioGroup minW="inherit" onChange={handleChoiceChange} value={value}>
      <VStack align="baseline">
        {question.answers.map((el: any, idx: any) => {
          return (
            <Radio value={idx.toString()} key={idx} name={idx}>
              {el}
            </Radio>
          );
        })}
      </VStack>
    </RadioGroup>
  );
};

interface Props extends BoxProps {
  quiz_element: any;
  num: number;
}

const QuestionCardGenerator = (props: Props) => {
  let comp = undefined;
  switch (props.quiz_element.type) {
    case "one_choice":
      comp = (
        <OneChoiceCard
          question={props.quiz_element}
          onAnswerSelected={(x) => console.log(x)}
          setValidated={(x) => console.log(x)}
        />
      );
      break;
    case "multi_choice":
      comp = (
        <MultiChoiceCard
          question={props.quiz_element}
          onAnswerSelected={(x) => console.log(x)}
          setValidated={(x) => console.log(x)}
        />
      );
      break;
    case "long_open":
      comp = (
        <LongOpenCard
          question={props.quiz_element}
          onAnswerSelected={(x) => console.log(x)}
          setValidated={(x) => console.log(x)}
        />
      );
      break;
    case "short_open":
      comp = (
        <ShortOpenCard
          question={props.quiz_element}
          onAnswerSelected={(x) => console.log(x)}
          setValidated={(x) => console.log(x)}
        />
      );
      break;
    default:
      comp = (
        <Box
          borderColor="red"
          borderWidth="5px"
          p="20px"
          backgroundColor="yellow.100"
        >
          <Heading color="blackAlpha.900" size="xl">
            Unknown quiz element type: {props.quiz_element.type}
          </Heading>
        </Box>
      );
  }
  return (
    <VStack {...props} align="baseline" width="100%">
      <Text fontSize="xl" fontWeight="bold">
        {props.num}) {props.quiz_element.question}
      </Text>
      {comp}
    </VStack>
  );
};

export default QuestionCardGenerator;
