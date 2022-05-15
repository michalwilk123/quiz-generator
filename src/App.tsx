import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Spacer,
  VStack,
} from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import "./App.css";

const App = () => {
  return (
    <Flex direction="column" minH="100vh">
      <HStack width="100%" mb="20px" py="20px" px="40px" bgColor="gray.900">
        <Box alignItems="center">
          <Heading size="xl" textColor="whiteAlpha.800">
            Quiz Generator
          </Heading>
        </Box>
        <Spacer />
        <Button bgColor="whiteAlpha.800">About</Button>
      </HStack>
      <Flex width="100%" height="100%">
        <Outlet />
      </Flex>
    </Flex>
  );
};

export default App;
