import { Center, Text } from "@chakra-ui/react";
import { QuizStatusType } from "../utils/helpers";
import LargeSubmitButton from "./LargeSubmitButton";

interface QuizStatusManagerProps {
  onQuizSubmit: () => any;
  onQuizStatusChange: (newStatus: QuizStatusType) => any;
  quizStatus: QuizStatusType;
}

const QuizStatusManager = (props: QuizStatusManagerProps) => {
  return (
    <Center flexDirection="column">
      {props.quizStatus === QuizStatusType.CANNOT_SUBMIT && (
        <Text color="red.700" fontWeight="bold" my="10px">
          You have not filled the quiz correctly!
        </Text>
      )}
      {props.quizStatus === QuizStatusType.CAN_SUBMIT && (
        <LargeSubmitButton
          title="Submit"
          onClick={props.onQuizSubmit}
          isDisabled={props.quizStatus != QuizStatusType.CAN_SUBMIT}
        />
      )}
      {props.quizStatus === QuizStatusType.SUBMITTED && (
        <LargeSubmitButton
          title="Try again!"
          onClick={() => props.onQuizStatusChange(QuizStatusType.CAN_SUBMIT)}
        />
      )}
    </Center>
  );
};

export default QuizStatusManager;
