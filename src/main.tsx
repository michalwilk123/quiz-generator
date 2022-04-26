import { ChakraProvider } from "@chakra-ui/react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import Quiz from "./components/Quiz";
import SelectQuiz from "./components/SelectQuiz";
import "./index.css";

const container: any = document.getElementById("root");
const root = createRoot(container);

root.render(
  <ChakraProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<SelectQuiz />} />
          <Route path=":quiz" element={<Quiz />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </ChakraProvider>
);
