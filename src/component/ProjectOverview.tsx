import { Button } from "react-bootstrap";
import { FormProject } from "./FormProject";

function ProjectOverview({ onBack }: { onBack: () => void }) {
  return (
    <>
      <header>
        <h1>Project översikt</h1>
      </header>
      <FormProject />
      <Button variant="danger" onClick={onBack}>
        Tillbaka
      </Button>
    </>
  );
}
export default ProjectOverview;
