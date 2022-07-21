import {
  BoxProps,
  Flex,
  Heading,
  Table,
  Tr,
  Th,
  Td,
  Thead,
  Tbody,
  TableContainer,
} from "@chakra-ui/react";
import { QuizElement } from "../utils/helpers";

interface QuizSummaryProps {
  quizName: string;
  quizes: QuizElement[];
  quizScores: number[];
  time?: number;
  flexProps?: BoxProps;
}

interface QuizTableRowProps {
  no: number;
  quizEl: QuizElement;
  currentScore: number;
}

const QuizTableRow = (props: QuizTableRowProps) => {

  return (
    <Tr maxW="400px">
      <Td>{props.no}</Td>
      <Td maxW="500px" overflow="hidden" textOverflow="ellipsis">
        {props.quizEl.question}
      </Td>
      <Td>
        {props.currentScore} / {props.quizEl.scale ?? 1}
      </Td>
    </Tr>
  );
};

const QuizSummaryTable = (props: QuizSummaryProps) => {
  if (props.quizes.length !== props.quizScores.length) {
    console.error("Quizes are not equal length!!");
  }

  return (
    <Flex width="100%" flexDir="column" {...props.flexProps}>
      <Heading textAlign="center" color="whiteAlpha.800" size="sm">
        Summary of quiz: {props.quizName}
      </Heading>
      <TableContainer>
        <Table variant="simple" colorScheme="gray" color="whiteAlpha.800">
          <Thead>
            <Tr>
              <Th color="white" maxW="150px">
                no.
              </Th>
              <Th color="white">question</Th>
              <Th color="white">result</Th>
            </Tr>
          </Thead>
          <Tbody>
            {props.quizes.map((el, idx) => {
              return (
                <QuizTableRow
                  no={idx + 1}
                  quizEl={el}
                  currentScore={props.quizScores[idx]}
                />
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  );
};

export default QuizSummaryTable;
