import { Button } from "react-bootstrap";
import { FormProject } from "./FormProject";
import { GetProjects } from "./GetProjects";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  getActiveProject,
  getFinishedProject,
  updateProjectStatus,
} from "../utils/ProjectApi";
import type { Project } from "../type/Interface";

function ProjectOverview() {
  const navigate = useNavigate();
  const [activeProjects, setActiveProjects] = useState<Project[]>([]);
  const [finishedProjects, setFinishedProjects] = useState<Project[]>([]);

  const handleProjectStatus = async (projectId: string | undefined) => {
    if (!projectId) return;
    await updateProjectStatus(projectId);
    setActiveProjects((prev) => prev.filter((p) => p.projectId !== projectId));
    const updated = activeProjects.find((p) => p.projectId === projectId);
    if (updated) setFinishedProjects((prev) => [...prev, updated]);
  };

  const loadProjects = async () => {
    const [active, finished] = await Promise.all([
      getActiveProject(),
      getFinishedProject(),
    ]);
    setActiveProjects(active);
    setFinishedProjects(finished);
  };

  useEffect(() => {
    loadProjects();
  }, []);

  // Lägg till nytt projekt direkt i state
  const handleAddProject = (newProject: Project) => {
    setActiveProjects((prev) => [...prev, newProject]);
  };

  const backToHome = () => {
    navigate("/");
  };
  return (
    <>
      <header>
        <h1>Project översikt</h1>
      </header>
      <FormProject onAddProject={handleAddProject} />
      <GetProjects
        activeProjects={activeProjects}
        finishedProjects={finishedProjects}
        onProjectStatus={handleProjectStatus}
      />
      <Button variant="danger" onClick={backToHome}>
        Tillbaka
      </Button>
    </>
  );
}
export default ProjectOverview;
