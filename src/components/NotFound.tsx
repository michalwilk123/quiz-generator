import { Center, Heading } from "@chakra-ui/react";

const NotFound = () => {
  console.log(`Current path location: ${window.location.pathname}`);
  return (
    <Center width="100%" mt="20px">
      <Heading color="whiteAlpha.800" size="3xl">
        404 Page not Found
      </Heading>
    </Center>
  );
};

export default NotFound;
