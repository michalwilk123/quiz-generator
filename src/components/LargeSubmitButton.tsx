import { Button } from "@chakra-ui/react";

interface LargeSubmitButtonProps {
  title: string;
  onClick: () => any;
  isDisabled?: boolean;
}

const LargeSubmitButton = (props: LargeSubmitButtonProps) => {
  return (
    <Button
      py="24px"
      colorScheme="teal"
      isDisabled={props.isDisabled}
      maxW="700px"
      width="100%"
      onClick={props.onClick}
    >
      {props.title}
    </Button>
  );
};

export default LargeSubmitButton;
