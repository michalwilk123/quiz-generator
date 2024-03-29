import {
  Heading,
  Box,
  Select,
  VStack,
  Checkbox,
  Wrap,
  WrapItem,
  Button,
  FormControl,
  RadioGroup,
  Radio,
  Flex,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import quizConfig from "../quiz_config";

export interface QuizSchema {
  filename: string;
  name: string;
  urlName: string;
}

export enum QuestionTypes {
  OPEN_SHORT = "Short open question",
  OPEN_LONG = "Long open question",
  MULTI = "Multiple choice question",
  ONE_CHOICE = "Single choice question",
}

export enum QuizOptions {
  RANDOM_ORDER = "Random order of the questions",
  SAVE_IN_LS = "Save current progress in the local storage",
  RUN_ALL = "Display all question once and show ending message at the end",
  ALLOW_PARTIAL_CORRECT = "Allow partial correctness",
  ALLOW_SKIP = "Allow skipping questions",
  TIMER = "Show quiz timer",
  SHOW_SUMMARY = "Show short summary after submitting the quiz",
  SHOW_NAVIGATION = "Display small listing of the quiz questions",
}

export enum QuizQuestionAmounts {
  FIVE = "5",
  FIFTEEN = "15",
  TWENTY = "20",
  ALL = "All",
}

type Props = {};

const MultiCheckboxWrap = ({
  options,
  chosenOptions,
  setChosenOptions,
}: {
  options: string[];
  chosenOptions: string[];
  setChosenOptions: (opt: string[]) => any;
}) => {
  const handleOptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toString();
    const isChecked = e.target.checked;

    if (chosenOptions.includes(value) && !isChecked) {
      const newArr = [...chosenOptions];
      newArr.splice(newArr.indexOf(value), 1);
      setChosenOptions(newArr);
    } else if (!chosenOptions.includes(value) && isChecked) {
      const newArr = [...chosenOptions];
      newArr.push(value);
      setChosenOptions(newArr);
    }
  };

  return (
    <Wrap mt="15px" mx="30px" spacing="13px">
      {options.map((opt, idx) => (
        <WrapItem key={idx}>
          <Checkbox
            value={idx}
            onChange={handleOptChange}
            isChecked={chosenOptions.includes(idx.toString())}
          >
            <Box color="whiteAlpha.800">{opt}</Box>
          </Checkbox>
        </WrapItem>
      ))}
    </Wrap>
  );
};

const SelectQuiz = (props: Props) => {
  const navigate = useNavigate();
  const [configuration, setConfiguration] = useState<string[]>([]);
  const [questionTypes, setQuestionTypes] = useState<string[]>(
    Object.values(QuestionTypes).map((el, idx) => idx.toString())
  );
  const [chosenQuizUrl, setChosenQuizUrl] = useState<string>("");
  const [questionAmount, setQuestionAmount] = useState<string>(
    QuizQuestionAmounts.ALL
  );

  document.title = "Configure quiz";

  const handleOpenQuiz = (event: React.FormEvent) => {
    const urlParameters: any = {
      conf: configuration,
      qtype: questionTypes,
    };

    if (questionAmount !== QuizQuestionAmounts.ALL) {
      urlParameters["amount"] = questionAmount;
    }

    navigate({
      pathname: `/quizes/${chosenQuizUrl}`,
      search: createSearchParams(urlParameters).toString(),
    });
  };

  return (
    <FormControl onSubmit={handleOpenQuiz}>
      <VStack mx="30px" spacing={7} ml="auto" mr="auto">
        <Heading size="lg" textColor="whiteAlpha.600">
          Create your quiz
        </Heading>
        <Select
          bgColor="whiteAlpha.800"
          size="lg"
          placeholder="Choose available quiz"
          maxW="min(80%, 500px)"
          onChange={(event) => setChosenQuizUrl(event.target.value)}
        >
          {quizConfig?.map((element: QuizSchema, idx: number) => (
            <option key={idx} value={element.urlName}>
              {element.name}
            </option>
          ))}
        </Select>
        <Box width="80%">
          <Heading textColor="whiteAlpha.600" size="md">
            Configure quiz
          </Heading>
          <MultiCheckboxWrap
            options={Object.values(QuizOptions) as string[]}
            setChosenOptions={setConfiguration}
            chosenOptions={configuration}
          />
        </Box>
        <Box width="80%">
          <Heading textColor="whiteAlpha.600" size="md">
            Show question types
          </Heading>
          <MultiCheckboxWrap
            options={Object.values(QuestionTypes) as string[]}
            setChosenOptions={setQuestionTypes}
            chosenOptions={questionTypes}
          />
        </Box>
        <Box width="80%">
          <Heading textColor="whiteAlpha.600" size="md">
            Select numer of questions
          </Heading>
          <RadioGroup
            width="100%"
            onChange={setQuestionAmount}
            defaultValue={questionAmount}
          >
            <Wrap mt="15px" mx="30px" spacing="13px">
              {(Object.values(QuizQuestionAmounts) as string[]).map(
                (val, idx) => {
                  return (
                    <WrapItem key={idx}>
                      <Flex as="label" color="whiteAlpha.800">
                        <Radio value={val}>{val}</Radio>
                      </Flex>
                    </WrapItem>
                  );
                }
              )}
            </Wrap>
          </RadioGroup>
        </Box>
        <Button disabled={!chosenQuizUrl} onClick={handleOpenQuiz} size="lg">
          Generate quiz!
        </Button>
      </VStack>
    </FormControl>
  );
};

export default SelectQuiz;
