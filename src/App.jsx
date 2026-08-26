import Home from "../components/Home";
import ProjectPage from "../components/ProjectPage";
import { BrowserRouter, Route, Routes } from "react-router";

export default function APP() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects/:slug" element={<ProjectPage />} />
      </Routes>
    </BrowserRouter>
  );
}
