import { Box, Flex, Heading, HStack, Spacer } from "@chakra-ui/react";
import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./App.css";

const Footer = React.lazy(() => import("./components/Footer"));

const App = () => {
  return (
    <Flex direction="column" minH="100vh">
      <HStack width="100%" mb="20px" py="20px" px="40px" bgColor="gray.900">
        <Box alignItems="center">
          <Link to="/">
            <Heading size="xl" textColor="whiteAlpha.800">
              Quiz Generator
            </Heading>
          </Link>
        </Box>
        <Spacer />
      </HStack>
      <Flex width="100%" height="100%">
        <Outlet />
      </Flex>
      <Spacer />
      <Footer />
    </Flex>
  );
};

export default App;
