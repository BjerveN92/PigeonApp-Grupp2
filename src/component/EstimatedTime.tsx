import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import type { EstimatedTime, Issue, Member } from "../type/Interface";
//import { getProjectById } from "../utils/ProjectApi";
import { getIssueById, patchEstimatedTime } from "../utils/IssueApi";
import { getMembersByProjectId } from "../utils/MemberApi";

export function EstimatedTime() {
  const navigate = useNavigate();
  const { projectId, issueId } = useParams();

  const [issue, setIssue] = useState<Issue | null>(null);
  const [members, setMembers] = useState<Member[]>([]);
  const [selectedMember, setSelectedMember] = useState("");
  const [time, setTime] = useState("");
  const [estimatedTimes, setEstimatedTimes] = useState<EstimatedTime[]>([]);

  useEffect(() => {
    if (projectId) {
      //getProjectById(projectId).then((proj) => setMembers(proj.members));
      getMembersByProjectId(projectId).then((fetchedMembers) =>
        setMembers(fetchedMembers)
      );
    }
    if (issueId) {
      getIssueById(issueId).then((iss) => {
        console.log("Issue hämtad från backend:", iss);
        setIssue(iss);
        setEstimatedTimes(iss.estimatedTimes);
      });
    }
  }, [projectId, issueId]);

  //Kollar om alla medlemmar har lagt tid
  /*    const allMembersHaveTime = members.length > 0 && members.every((member) =>
    estimatedTimes.some((et) => et.memberId === member.memberId)
  );  */

  /*   console.log("members:", members);
  console.log("estimatedTimes:", estimatedTimes);
  console.log("Alla medlemmar har lagt tid:", allMembersHaveTime); */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedMember || !time || !issueId) return;

    try {
      //Hämtar aktuell issue
      const currentIssue = await getIssueById(issueId);

      //Skapar nytt estimatedTime-objekt med uppdaterade värden
      const newEstimatedTime = {
        memberId: selectedMember,
        timeEstimate: Number(time),
      };
      console.log("Ny estimerad tid:", newEstimatedTime);

      //Skapar en ny version av issue med uppdaterd listan
      const updatedIssue = {
        ...currentIssue,
        estimatedTimes: [
          ...(currentIssue.estimatedTimes || []),
          newEstimatedTime,
        ],
      };
      console.log("Uppdaterad issue:", updatedIssue);
      //Skickar Patch request till backend för att uppdatera issue
      await patchEstimatedTime(updatedIssue, issueId);

      //Uppdaterar state med uppdaterad issue
      const refreshedIssue = await getIssueById(issueId);
      setIssue(refreshedIssue);
      setEstimatedTimes(refreshedIssue.estimatedTimes);
      setSelectedMember("");
      setTime("");
    } catch (error) {
      console.error("Fel vid post av estimering:", error);
    }
  };

  if (!issue || !members) {
    return <div>Laddar data...</div>;
  }

  return (
    <div className="my-4" style={{ maxWidth: "500px" }}>
      <h2>Lägg tidsestimering</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Välj medlem</Form.Label>
          <Form.Select
            value={selectedMember}
            onChange={(e) => setSelectedMember(e.target.value)}
            required
          >
            <option value="">--Välj medlem--</option>
            {members.map((member) => (
              <option key={member.memberId} value={member.memberId}>
                {member.memberName}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Tidsestamt (timme)</Form.Label>
          <Form.Control
            type="number"
            placeholder="t.ex. 2"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="success" type="submit">
          Spara tid
        </Button>
      </Form>

      <h3 className="mt-4">Estimerade tid från medlemmarna</h3>
      {estimatedTimes.length === 0 ? (
        <p>Inga tidsestimeringar tillgängliga.</p>
      ) : (
        <ListGroup>
          {estimatedTimes.map((et) => {
            const memberName =
              members.find((m) => m.memberId === et.memberId)?.memberName ||
              "okänd medlem";
            return (
              <ListGroup.Item key={et.estimatedTimeId}>
                {memberName}: {et.timeEstimate} tim
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      )}

      <br />
      <Button variant="danger" className="mt-4" onClick={() => navigate(-1)}>
        Tillbaka till projekt
      </Button>
    </div>
  );
}
