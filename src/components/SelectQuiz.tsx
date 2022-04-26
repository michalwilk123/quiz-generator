import {
  Heading,
  Box,
  Select,
  VStack,
  Checkbox,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import quizConfig from "../quiz_config";

interface QuizSchema {
  filename: string;
  name: string;
}

enum QuestionTypes {
  OPEN_SHORT = "Short open question",
  OPEN_LONG = "Long open question",
  OPEN_FILL = "Question with section to fill",
  MULTI = "Multiple choice question",
  ONE_CHOICE = "Single choice question",
}

enum QuizOptions {
  RANDOM_ORDER = "Random order of the questions",
  SAVE = "Save current progress in the local storage",
  RUN_ALL = "Display all question once and show ending message at the end",
  CHECK_OPEN = "Check correctness of open type questions",
  ALLOW_SKIP = "Allow skipping questions",
  TIMER = "Show quiz timer"
}

type Props = {};

const MultiCheckboxWrap = ({options}:{options:[string]}) => {
// const MultiCheckboxWrap = (options:[string]) => {
  return (
    <Wrap mt="15px" mx="30px" spacing="13px">
      {options.map((opt) => (
        <WrapItem>
          <Checkbox>
            <Box color="whiteAlpha.800">{opt}</Box>
          </Checkbox>
        </WrapItem>
      ))}
    </Wrap>
  );
}

const QuestionTypesField = () => {
  const listOfQTypes = Object.values(QuestionTypes);

   return <MultiCheckboxWrap options={listOfQTypes as [string]}/>
};

const QuizOptionsField = () => {
  const listOfQTypes = Object.values(QuizOptions);

   return <MultiCheckboxWrap options={listOfQTypes as [string]}/>
};


const SelectQuiz = (props: Props) => {
  return (
    <VStack mx="30px" spacing={7} ml="auto" mr="auto">
      <Heading size="lg" textColor="whiteAlpha.600">
        Create your quiz
      </Heading>
      <Select
        textColor="whiteAlpha.900"
        size="lg"
        placeholder="Choose available quiz"
        maxW="min(80%, 500px)"
      >
        {quizConfig?.map((element: QuizSchema) => (
          <option>{element.name}</option>
        ))}
      </Select>

      <Box width="80%">
        <Heading textColor="whiteAlpha.600" size="md">
          Configure quiz
        </Heading>
        <QuizOptionsField/>
      </Box>
      <Box width="80%">
        <Heading textColor="whiteAlpha.600" size="md">
          Show quiz types
        </Heading>
        <QuestionTypesField/>
      </Box>
    </VStack>
  );
};

export default SelectQuiz;
