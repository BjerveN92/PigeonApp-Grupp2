import { Button } from "react-bootstrap";
import { FormProject } from "./FormProject";
import { GetProjects } from "./GetProjects";

function ProjectOverview({ onBack }: { onBack: () => void }) {
  return (
    <>
      <header>
        <h1>Project översikt</h1>
      </header>
      <FormProject />

      <GetProjects />
      <Button variant="danger" onClick={onBack}>
        Tillbaka
      </Button>
    </>
  );
}
export default ProjectOverview;
