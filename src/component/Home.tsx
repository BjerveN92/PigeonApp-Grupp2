import { useState } from "react";
import { Button } from "react-bootstrap";
import ProjectOverview from "./ProjectOverview";

function Home() {
  const [showOverview, setShowOverview] = useState(false);
  return (
    <>
      {!showOverview && (
        <Button variant="outline-light" onClick={() => setShowOverview(true)}>
          Projekt översikt
        </Button>
      )}
      {showOverview && (
        <ProjectOverview onBack={() => setShowOverview(false)} />
      )}
    </>
  );
}
export default Home;
