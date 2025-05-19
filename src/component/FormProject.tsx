import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useState } from "react";
import { postProject } from "../utils/ProjectApi";
import type { Project } from "../type/Interface";

export function FormProject() {
  const [title, setTitle] = useState("");
  const [memberName, setMemberName] = useState<string[]>([]);
  const [currentMember, setCurrentMember] = useState("");

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    const newProject: Project = {
      title,
      activeProject: true,
      members: memberName.map((name) => ({
        memberName: name,
      })),
      issues: [],
    };
    const result = await postProject(newProject);
    console.log("Projekt sparat:", result);
    setTitle("");
    setMemberName([]);
  };

  const handleMembers = () => {
    if (!currentMember.trim()) return;
    setMemberName((prev) => [...prev, currentMember]);
    setCurrentMember("");
  };

  return (
    <div className="d-flex justify-content-start">
      <Form style={{ maxWidth: "200px", width: "100%" }} onSubmit={handleSave}>
        <Form.Group className="mb-3" controlId="formProjectTitle">
          <Form.Label>Projektets namn</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ange projektnamn"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
    </div>
  );
}
