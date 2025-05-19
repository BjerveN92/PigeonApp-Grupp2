import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <Button
        variant="outline-light"
        onClick={() => navigate("/projectoverview")}
      >
        Projekt översikt
      </Button>
    </>
  );
}
export default Home;
