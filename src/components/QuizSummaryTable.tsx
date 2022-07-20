import { Table, TableCaption, TableContainer } from "@chakra-ui/react";

interface QuizSummaryProps {
  quizName: string;
  quizResults: number[];
  quizScores: number[];
  time?: number;
}

const QuizSummaryTable = (props: QuizSummaryProps) => {
  return (
    <TableContainer>
      <Table variant="striped" colorScheme="teal">
        <TableCaption>Summary of quiz: {props.quizName}</TableCaption>
      </Table>
    </TableContainer>
  );
};

export default QuizSummaryTable;
