import { useEffect, useState } from "react";
import type { Project } from "../type/Interface";
import { useNavigate, useParams } from "react-router-dom";
import { getProjectById } from "../utils/ProjectApi";
import { Button } from "react-bootstrap";
import { Issue } from "./Issue";

export function Project() {
  const navigate = useNavigate();
  const backToProjects = () => {
    navigate("/projectoverview");
  };
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
    <div>
      <Button variant="danger" onClick={backToProjects}>
        Tillbaka till projektöversikt
      </Button>
      <header>
        <h1>{project.title}</h1>
      </header>
      <div>
        <Issue />
      </div>
    </div>
  );
}
