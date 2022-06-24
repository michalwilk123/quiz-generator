import { Flex, Link, Stack, Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Flex
      mt="20px"
      py={{ base: "10px", md: "13px" }}
      width="100%"
      height="150px"
      bgColor="gray.900"
      mb="0px"
      color="whiteAlpha.800"
    >
      <Stack margin="auto" textAlign="center">
        <Text>
          <Link
            href="https://github.com/michalwilk123/quiz-generator"
            color="teal"
          >
            Source code
          </Link>
        </Text>
        <Text>
          Made with{" "}
          <Link
            textDecoration="underline"
            href="https://www.typescriptlang.org/"
          >
            TypeScript
          </Link>
          ,{" "}
          <Link textDecoration="underline" href="https://chakra-ui.com/">
            Chakra UI
          </Link>{" "}
          and{" "}
          <Link textDecoration="underline" href="https://chakra-ui.com/">
            React
          </Link>{" "}
          by{" "}
          <Link href="https://github.com/michalwilk123" color="teal">
            Michał Wilk
          </Link>
        </Text>
        <Link href="mailto:michalwilk139@gmail.com" color="teal">
          Contact
        </Link>
      </Stack>
    </Flex>
  );
};

export default Footer;