import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/esm/Form";
import Modal from "react-bootstrap/Modal";
import { patchActualTime, getIssueById } from "../utils/IssueApi";
import type { Issue } from "../type/Interface";

type PopupActTimeProps = {
  show: boolean;
  onClose: () => void;
  issueId: string | undefined;
  onSaved?: () => void;
};

function PopupActTime({ show, onClose, issueId, onSaved }: PopupActTimeProps) {
  const [time, setTime] = useState("");

  const actualTime = async () => {
    // om tiden eller issueId inte är ifyllt
    if (!time || !issueId) return;

    try {
      // 1. Hämta aktuell issue
      const currentIssue = await getIssueById(issueId);

      // 2. Skapa nytt issue-objekt med uppdaterad actualTime
      const updatedIssue: Issue = {
        ...currentIssue,
        actualTime: Number(time),
      };

      // 3. Skicka hela objektet till patchActualTime
      await patchActualTime(updatedIssue, issueId);
      console.log("Tid uppdaterad:", time);
      alert("Faktisk tid uppdaterad");
      setTime("");
      //stäng popup om det finns en tid i onSaved
      if (onSaved) onSaved();
      onClose();
    } catch (error) {
      console.error("Kunde inte uppdatera tid:", error);
    }
  };

  return (
    <div
      className="modal show"
      style={{ display: "block", position: "initial" }}
    >
      <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Hur lång tid tog det?</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Tidsestamt (timme)</Form.Label>
            <Form.Control
              type="number"
              placeholder="t.ex. 2"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              min="1"
              step="1"
              required
            />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Stäng
          </Button>
          <Button variant="primary" onClick={actualTime}>
            Spara
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default PopupActTime;
