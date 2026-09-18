import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import Quiz from "./components/Quiz";
import SelectQuiz from "./components/SelectQuiz";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="configure" element={<SelectQuiz />} />
          <Route path="exam/:id" element={<Quiz />} />
          <Route path="exam" element={<Quiz />} />
          <Route path="quizes/:quiz" element={<Quiz />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </HashRouter>
  </StrictMode>,
);
