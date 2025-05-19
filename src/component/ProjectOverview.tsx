import { Button } from "react-bootstrap";

function ProjectOverview({ onBack }: { onBack: () => void }) {
  return (
    <>
      <header>
        <h1>Project översikt</h1>
      </header>
      <Button variant="danger" onClick={onBack}>
        Tillbaka
      </Button>
    </>
  );
}
export default ProjectOverview;
