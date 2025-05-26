import type { Project } from "../type/Interface";

import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

export function GetProjects({
  activeProjects,
  finishedProjects,
  onProjectStatus,
}: {
  activeProjects: Project[];
  finishedProjects: Project[];
  onProjectStatus: (projectId: string | undefined) => void;
}) {
  return (
    <div className="container mt-4">
      <div className="row">
        {/* Vänstra kolumnen - Aktiva projekt */}
        <div className="col-md-6">
          <h3>Aktiva Projekt</h3>
          <div className="d-flex flex-column gap-3"style={{ maxHeight: "400px", overflowY: "auto" }}>
            {activeProjects.map((project) => (
              <div key={project.projectId} className="card position-relative">
                <div className="card-body">
                  <Link
                    to={`/project/${project.projectId}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <h5 className="card-title">{project.title}</h5>
                  </Link>
                  <Button
                    variant="success"
                    className="mt-3"
                    onClick={() => onProjectStatus(project.projectId)}
                  >
                    Klara projekt
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Högra kolumnen - Färdiga projekt */}
        <div className="col-md-6">
          <h3>Färdiga Projekt</h3>
          <div className="d-flex flex-column gap-3"style={{ maxHeight: "400px", overflowY: "auto" }}>
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
