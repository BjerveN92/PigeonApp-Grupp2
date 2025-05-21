import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <div className="home-container">
        <h2>
          Pigeon – det smarta sättet att skicka tidsuppskattningar istället för
          bara meddelanden!
        </h2>
        <br />
        <p>
          Välkommen till Pigeon – din nya bästa vän för att planera
          mjukvaruprojekt utan att fastna i tidskaos!
          <br />
          Tänk dig att varje uppgift i projektet är som ett litet brev.
          <br />
          Du skriver det, skickar det till ditt team, och alla svarar med en
          uppskattning om hur lång tid det kommer ta.
          <br />
          Men i stället för att skrika över skrivbordet eller gissa på Slack, så
          gör ni det snyggt, effektivt
          <br />– via Planning Poker direkt i Pigeon.
        </p>
        <div className="button-container">
          <Button
            className="home-button"
            variant="outline-light"
            onClick={() => navigate("/projectoverview")}
          >
            Projekt översikt
          </Button>
          <Button
            className="stats-button"
            variant="outline-light"
            onClick={() => navigate("/statistik")}
          >
            Visa statistik
          </Button>
        </div>
      </div>
    </>
  );
}
export default Home;
