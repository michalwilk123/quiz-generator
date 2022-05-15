import { ChakraProvider } from "@chakra-ui/react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import NotFound from "./components/NotFound";
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
          <Route path="/quizes/:quiz" element={<Quiz />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </ChakraProvider>
);
