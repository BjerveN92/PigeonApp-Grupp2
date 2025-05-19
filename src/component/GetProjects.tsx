import { getActiveProject, getFinishedProject } from "../utils/ProjectApi";
import type { Project } from "../type/Interface";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function GetProjects() {
  const [activeProjects, setActiveProjects] = useState<Project[]>([]);
  const [finishedProjects, setFinishedProjects] = useState<Project[]>([]);

  // Hämtar färdiga projekt

  useEffect(() => {
    getFinishedProject().then((project) => {
      setFinishedProjects(project);
    });
  }, []);

  // hämtar aktiva projekt
  useEffect(() => {
    getActiveProject().then((project) => {
      setActiveProjects(project);
    });
  }, []);

  return (
    <>
      <div>
        <h3>Aktiva Projekt</h3>
        <ul>
          {activeProjects.map((project) => (
            <li key={project.projectId}>
              <Link to={`/project/${project.projectId}`}>
                <h4>{project.title}</h4>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Färdiga Projekt</h3>
        <ul>
          {finishedProjects.map((project) => (
            <li key={project.projectId}>
              <h4>{project.title}</h4>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
