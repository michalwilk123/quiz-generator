import { ChakraProvider, Heading } from "@chakra-ui/react";
import React, { Suspense } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Route, Routes } from "react-router-dom";
import "./index.css";

const Quiz = React.lazy(() => import("./components/Quiz"));
const SelectQuiz = React.lazy(() => import("./components/SelectQuiz"));
const NotFound = React.lazy(() => import("./components/NotFound"));
const App = React.lazy(() => import("./App"));

const container: any = document.getElementById("root");
const root = createRoot(container);

root.render(
  <ChakraProvider>
    <HashRouter>
      <Suspense fallback={<Heading size="xl">Loading...</Heading>}>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<SelectQuiz />} />
            <Route path="/quizes/:quiz" element={<Quiz />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </HashRouter>
  </ChakraProvider>
);
