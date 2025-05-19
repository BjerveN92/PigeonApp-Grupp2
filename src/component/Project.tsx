import { useEffect, useState } from "react";
import type { Project } from "../type/Interface";
import { useParams } from "react-router-dom";
import { getProjectById } from "../utils/ProjectApi";

export function Project() {
  const { projectId } = useParams();
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    if (projectId) {
      getProjectById(projectId).then(setProject);
    }
  }, [projectId]);

  if (!project) {
    return <h1>Laddar projekt...</h1>;
  }

  return (
    <header>
      <h1>{project.title}</h1>
    </header>
  );
}
