import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useState } from "react";
import { postProject } from "../utils/ProjectApi";
import type { Project } from "../type/Interface";

export function FormProject({
  onAddProject,
}: {
  onAddProject: (project: Project) => void;
}) {
  const [title, setTitle] = useState("");
  const [memberName, setMemberName] = useState<string[]>([]);
  const [currentMember, setCurrentMember] = useState("");

  // funktion för att spara projekt
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    // kollar om det finns medlemmar i labeln och om den finns så läggs den i listan när man spara
    if (currentMember.trim()) {
      setMemberName((prev) => [...prev, currentMember]);
      setCurrentMember("");
    }

    // skapar en lista med medlemmar
    const allMembers = currentMember.trim()
      ? [...memberName, currentMember]
      : memberName;

    // Skapa ett nytt projekt
    const newProject: Project = {
      title,
      activeProject: true,
      members: allMembers.map((name) => ({
        memberName: name,
      })),
      issues: [],
    };

    console.log("Nytt projekt:", newProject);
    // Skicka projektet till servern
    const result = await postProject(newProject);
    console.log("Projekt sparat:", result);
    alert("Projekt sparat!");

    onAddProject(result); // Lägg till det nya projektet i listan

    setTitle("");
    setMemberName([]);
    setCurrentMember("");
  };
  // funktion för att lägga till medlemmar
  const handleMembers = () => {
    if (!currentMember.trim()) return;

    // Kolla om medlemmen redan finns
    const existingMember = memberName.some(
      (member) => member.toLowerCase() === currentMember.toLowerCase()
    );

    if (existingMember) {
      alert("Medlem finns redan i listan");
      return;
    }
    setMemberName((prev) => [...prev, currentMember]);
    setCurrentMember("");
  };

  return (
    <div>
      <h3>Lägg till projekt</h3>

      <div className="d-flex gap-4 align-items-start">
        {/* Formulär */}
        <Form
          style={{ maxWidth: "400px", width: "100%" }}
          onSubmit={handleSave}
        >
          <Form.Group className="mb-3" controlId="formProjectTitle">
            <Form.Label>Projektets namn</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ange projektnamn"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formProjectMembers">
            <div className="d-flex align-items-center mb-1">
              <Form.Label className="mb-0 me-2">Medlem</Form.Label>
              <Button
                variant="outline-secondary"
                size="sm"
                type="button"
                onClick={handleMembers}
              >
                <i className="bi bi-plus"></i>
              </Button>
            </div>
            <Form.Control
              type="text"
              placeholder="Ange medlem"
              value={currentMember}
              onChange={(e) => setCurrentMember(e.target.value)}
            />
          </Form.Group>

          <Button variant="success" type="submit">
            Spara
          </Button>
        </Form>

        {/* Medlemslista */}
        <div style={{ marginLeft: "150px" }}>
          <h5>Tillagda medlemmar</h5>
          <ul
            className="list-group"
            style={{ maxHeight: "200px", overflowY: "auto" }}
          >
            {memberName.map((member, index) => (
              <li key={index} className="list-group-item">
                {member}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
