import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { getMembersByProjectId } from "../utils/MemberApi";

import {
  postIssueToProject,
  getInactiveIssues,
  ActiveIssues,
  DoneIssues,
  patchIssueStatus,
} from "../utils/IssueApi";
import type { Issue, Member } from "../type/Interface";
import { Link } from "react-router-dom";
import PopupActTime from "./PopupActTime";

export function Issue() {
  //Hämtar projektId från url
  const { projectId } = useParams();

  //States för formular
  const [members, setMembers] = useState<Member[]>([]);
  const [issueTitle, setIssueTitle] = useState("");
  const [issueDescription, setIssueDescription] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [selectedIssueId, setSelectedIssueId] = useState<string | undefined>(
    undefined
  );

  //Lista med redan tillagda issues

  const [inactiveIssues, setInactiveIssues] = useState<Issue[]>([]);
  const [activeIssues, setActiveIssues] = useState<Issue[]>([]);
  const [doneIssues, setDoneIssues] = useState<Issue[]>([]);

  // hämtar medlemmarna för projektet
  useEffect(() => {
    if (!projectId) return;
    getMembersByProjectId(projectId).then(setMembers);
  }, [projectId]);

  const fetchIssues = async () => {
    if (!projectId) return;
    try {
      const [inactive, active, done] = await Promise.all([
        getInactiveIssues(projectId),
        ActiveIssues(projectId),
        DoneIssues(projectId),
      ]);
      setInactiveIssues(inactive);
      setActiveIssues(active);
      setDoneIssues(done);
    } catch (error) {
      console.error("Fel vid hämtning av issues:", error);
    }
  };
  //Hämtar issues när komponenten laddas
  useEffect(() => {
    if (!projectId) return;

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
      await fetchIssues();
      console.log("Issue sparad:", issueTitle);
      //Hämtar uppdaterad listan med issues
    } catch (error) {
      console.error("Kunde inte spara issue:", error);
    }
  };
  //Funktion för att aktivera issue
  const handleActivateIssue = async (issueId: string | undefined) => {
    if (!issueId) return;
    try {
      await patchIssueStatus(issueId);
      await fetchIssues();
    } catch (error) {
      console.error("Kunde inte aktivera issue:", error);
    }
  };

  // funktion för att om alla medlemmar har lagt sin tid
  const allMembersEstimated = (issue: Issue) => {
    if (!issue.estimatedTimes || members.length === 0) return false;

    const estimatedIds = issue.estimatedTimes.map((et) => String(et.memberId));

    const estimatedCount = members.filter((m) =>
      estimatedIds.includes(String(m.memberId))
    ).length;
    return estimatedCount === members.length;
  };
  
  const checkActualTime = (issue: Issue) => {
    if (issue.actualTime === 0 ) {
     fetchIssues();
      return false;
    }
      return true;
  }


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
                {inactiveIssues.map((issue) => (
                  <div key={issue.issueId} className="card position-relative">
                    <Link
                      to={`/project/${projectId}/issue/${issue.issueId}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <div className="card-body">
                        <h5 className="card-title">{issue.issueTitle}</h5>
                        <p>{issue.issueDescription}</p>
                        <span className="text-muted">
                          Status: {issue.issueStatus}
                        </span>
                      </div>
                    </Link>
                    <Button
                      variant="success"
                      className="m-3 position-relative"
                      onClick={async () => {
                        await handleActivateIssue(issue.issueId);
                      }}
                      disabled={!allMembersEstimated(issue)}
                    >
                      Aktivera issue
                    </Button>
                  </div>
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
                {activeIssues.map((issue) => (
                  <div key={issue.issueId} className="card position-relative">
                     
                        <div className="card-body">
                        <h5 className="card-title">{issue.issueTitle}</h5>
                        <p>{issue.issueDescription}</p>
                        <span className="text-muted">
                          Status: {issue.issueStatus}
                        </span>
                        </div>
                      
                      <Button
                        variant="success"
                        className="m-3 position-relative"
                        onClick={async (e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          await handleActivateIssue(issue.issueId);
                        }}
                      >
                        Klar markera issue
                      </Button>
                   
                  </div>
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
                {doneIssues.map((issue) => (
                  <div className="card position-relative">
                 
                    <div className="card-body">
                      <h5 className="card-title">{issue.issueTitle}</h5>
                      <p>{issue.issueDescription}</p>
                      <span className="text-muted">
                        Status: {issue.issueStatus}
                      </span>
                    </div>
                  
                  <Button
                        variant="success"
                        className="m-3 position-relative"
                      onClick={(e) => {
                      checkActualTime(issue);
                      e.preventDefault();
                      setSelectedIssueId(issue.issueId);
                      setShowPopup(true);
                    }}
                      disabled={checkActualTime(issue)}
                       >  Sätt faktisk tid
                      </Button>
                  </div>
                ))}
                <PopupActTime
                  show={showPopup}
                  onClose={() => setShowPopup(false)}
                  issueId={selectedIssueId}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
