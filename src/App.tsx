import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./component/Home";
import { Project } from "./component/Project";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project/:projectId" element={<Project />} />
      </Routes>
    </>
  );
}

export default App;
