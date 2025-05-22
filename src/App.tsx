import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Home from "./component/Home";
import { Project } from "./component/Project";
import ProjectOverview from "./component/ProjectOverview";
import { EstimatedTime } from "./component/EstimatedTime";
import { StatisticPage } from "./component/StatisticPage";
import { Button } from "react-bootstrap";

function App() {
  const navigate = useNavigate();
  return (
    <>
      <Button variant="secondary" className="m-3" onClick={() => navigate("/")}>
        Till startsidan
      </Button>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projectoverview" element={<ProjectOverview />} />
        <Route path="/project/:projectId" element={<Project />} />
        <Route
          path="/project/:projectId/issue/:issueId"
          element={<EstimatedTime />}
        />
        <Route path="/statistik" element={<StatisticPage />} />
      </Routes>
    </>
  );
}

export default App;
