import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import { postIssueToProject, getInactiveIssues } from "../utils/IssueApi";
import type { Issue } from "../type/Interface";
import { Link } from "react-router-dom";

export function Issue() {
  //Hämtar projektId från url
  const { projectId } = useParams();

  //States för formular
  const [issueTitle, setIssueTitle] = useState("");
  const [issueDescription, setIssueDescription] = useState("");

  //Lista med redan tillagda issues
  const [issues, setIssues] = useState<Issue[]>([]);

  //Hämtar issues när komponenten laddas
  useEffect(() => {
    if (projectId) {
      getInactiveIssues(projectId).then((data) => {
        setIssues(data);
      });
    }
  }, [projectId]);
  //Funktion för att skapa nytt issue
  const handleSaveIssue = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectId || !issueTitle.trim()) return;

    try {
      await postIssueToProject(projectId, { issueTitle, issueDescription });
      //Tömmer formulär
      setIssueTitle("");
      setIssueDescription("");

      console.log("Issue sparad:", issues);

      //Hämtar uppdaterad listan med issues
      await getInactiveIssues(projectId);
    } catch (error) {
      console.error("Kunde inte spara issue:", error);
    }
  };

  return (
    <div className="my-4">
      <h2>Lägg till issue</h2>

      {/*Formulär för att skapa nytt issue*/}
      <form style={{ maxWidth: "400px" }} onSubmit={handleSaveIssue}>
        <Form.Group className="mb-3" controlId="formIssueTitle">
          <Form.Label>Titel</Form.Label>
          <Form.Control
            type="text"
            placeholder="Issue titel"
            value={issueTitle}
            onChange={(e) => setIssueTitle(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formIssueDescription">
          <Form.Label>Beskrivning</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Issue beskrivning"
            value={issueDescription}
            onChange={(e) => setIssueDescription(e.target.value)}
          />
        </Form.Group>

        <Button variant="success" type="submit">
          Skapa issue
        </Button>
      </form>

      {/*Lista med redan tillagda issues*/}
      <h3 className="mt-4">Inaktiva Issues</h3>
      {issues.length === 0 ? (
        <p>Inga issues tillagda.</p>
      ) : (
        <ListGroup style={{ maxWidth: "600px" }}>
          {issues.map((issue) => (
            <ListGroup.Item key={issue.issueId}>
              <Link to={`/project/${projectId}/issue/${issue.issueId}`}>
                <strong>{issue.issueTitle}</strong>
              </Link>
              <div>- {issue.issueDescription}</div>
              <span className="text-muted">Status: {issue.issueStatus}</span>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  );
}
