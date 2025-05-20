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
    <div className="container mt-4">
  <div className="row">
    {/* Vänstra kolumnen - Aktiva projekt */}
    <div className="col-md-6">
      <h3>Aktiva Projekt</h3>
      <div className="d-flex flex-column gap-3">
        {activeProjects.map((project) => (
          <Link
           key={project.projectId}
          to={`/project/${project.projectId}`}  className="card">

            <div className="card-body">
              <h5 className="card-title">{project.title}</h5>
               </div>
              </Link>
           
           
        ))}
      </div>
    </div>

    {/* Högra kolumnen - Färdiga projekt */}
    <div className="col-md-6">
      <h3>Färdiga Projekt</h3>
      <div className="d-flex flex-column gap-3">
        {finishedProjects.map((project) => (
          <div key={project.projectId} className="card">
            <div className="card-body">
              <h5 className="card-title">{project.title}</h5>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</div>
  );
}
