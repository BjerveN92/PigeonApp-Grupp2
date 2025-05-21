import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import { postIssueToProject, getInactiveIssues, ActiveIssues, DoneIssues } from "../utils/IssueApi";
import type { Issue } from "../type/Interface";
import { Link } from "react-router-dom";
import type { IssueStatus } from "../type/Interface";

export function Issue() {
  //Hämtar projektId från url
  const { projectId } = useParams();

  //States för formular
  const [issueTitle, setIssueTitle] = useState("");
  const [issueDescription, setIssueDescription] = useState("");

  //Lista med redan tillagda issues
  const [issues, setIssues] = useState<Issue[]>([]);
  const [inactiveIssues, setInactiveIssues] = useState<Issue[]>([]);
const [activeIssues, setActiveIssues] = useState<Issue[]>([]);
const [doneIssues, setDoneIssues] = useState<Issue[]>([]);

  //Hämtar issues när komponenten laddas
 useEffect(() => {
  if (!projectId) return;

  const fetchIssues = async () => {
    try {
      const [inactive, active, done] = await Promise.all([
        getInactiveIssues(projectId),
        ActiveIssues(projectId),
        DoneIssues(projectId)
      ]);
      setInactiveIssues(inactive);
      setActiveIssues(active);
      setDoneIssues(done);
    } catch (error) {
      console.error("Fel vid hämtning av issues:", error);
    }
  };

  fetchIssues();
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
      <div className="container mt-4">
  <h2>Issues</h2>
  <div className="row">
    {/* Inaktiva issues */}
    <div className="col-md-4">
      <h4>Inaktiva</h4>
      {inactiveIssues.length === 0 ? (
        <p>Inga inaktiva issues.</p>
      ) : (
        <div className="d-flex flex-column gap-3">
          {inactiveIssues.map(issue => (
              <Link
                key={issue.issueId}
                to={`/project/${projectId}/issue/${issue.issueId}`}
                className="card"
              >
                <div className="card-body">
                  <h5 className="card-title">{issue.issueTitle}</h5>
                  <p>{issue.issueDescription}</p>
                  <span className="text-muted">Status: {issue.issueStatus}</span>
                </div>
              </Link>
            ))}
        </div>
      )}
    </div>

    {/* Aktiva issues */}
    <div className="col-md-4">
      <h4>Aktiva</h4>
      {activeIssues.length === 0 ? (
        <p>Inga aktiva issues.</p>
      ) : (
        <div className="d-flex flex-column gap-3">
          {activeIssues.map(issue => (
              <Link
                key={issue.issueId}
                to={`/project/${projectId}/issue/${issue.issueId}`}
                className="card"
              >
                <div className="card-body">
                  <h5 className="card-title">{issue.issueTitle}</h5>
                  <p>{issue.issueDescription}</p>
                  <span className="text-muted">Status: {issue.issueStatus}</span>
                </div>
              </Link>
            ))}
        </div>
      )}
    </div>

    {/* Avslutade issues */}
    <div className="col-md-4">
      <h4>Avslutade</h4>
      {doneIssues.length === 0 ? (
        <p>Inga avslutade issues.</p>
      ) : (
        <div className="d-flex flex-column gap-3">
          {doneIssues.map(issue => (
              <Link
                key={issue.issueId}
                to={`/project/${projectId}/issue/${issue.issueId}`}
                className="card"
              >
                <div className="card-body">
                  <h5 className="card-title">{issue.issueTitle}</h5>
                  <p>{issue.issueDescription}</p>
                  <span className="text-muted">Status: {issue.issueStatus}</span>
                </div>
              </Link>
            ))}
        </div>
      )}
    </div>
  </div>
</div>

    </div>
  );
}
