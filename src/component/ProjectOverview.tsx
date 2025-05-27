import { FormProject } from "./FormProject";
import { GetProjects } from "./GetProjects";
import { useState, useEffect } from "react";
import {
  getActiveProject,
  getFinishedProject,
  updateProjectStatus,
} from "../utils/ProjectApi";
import type { Project } from "../type/Interface";

function ProjectOverview() {
  const [activeProjects, setActiveProjects] = useState<Project[]>([]);
  const [finishedProjects, setFinishedProjects] = useState<Project[]>([]);

  useEffect(() => {
    loadProjects();
  }, []);

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

  // Lägg till nytt projekt direkt i state
  const handleAddProject = (newProject: Project) => {
    setActiveProjects((prev) => [...prev, newProject]);
  };

  return (
    <>
      <header>
        <h1>Projekt översikt</h1>
      </header>
      <FormProject onAddProject={handleAddProject} />
      <GetProjects
        activeProjects={activeProjects}
        finishedProjects={finishedProjects}
        onProjectStatus={handleProjectStatus}
      />
    </>
  );
}
export default ProjectOverview;
