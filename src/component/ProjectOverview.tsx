import { Button } from "react-bootstrap";
import { FormProject } from "./FormProject";
import { GetProjects } from "./GetProjects";
import { useNavigate } from "react-router-dom";
import { Issue } from "./Issue";

function ProjectOverview() {
  const navigate = useNavigate();
  const backToHome = () => {
    navigate("/");
  };
  return (
    <>
      <header>
        <h1>Project översikt</h1>
      </header>
      <FormProject />
      <GetProjects />
      <Issue />
      <Button variant="danger" onClick={backToHome}>
        Tillbaka
      </Button>
    </>
  );
}
export default ProjectOverview;
