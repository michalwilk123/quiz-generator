import { Center, Heading } from "@chakra-ui/react";
import React from "react";

const NotFound = () => {
  document.title = "404 - not found";

  return (
    <Center width="100%" mt="20px">
      <Heading color="whiteAlpha.800" size="3xl">
        404 Page not Found
      </Heading>
    </Center>
  );
};

export default NotFound;
