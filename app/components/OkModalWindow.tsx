import { Button, Modal } from "react-bootstrap";

export interface GenericModalWindowProps {
  closeWindow: () => void;
  show: boolean;
  headerText: string;
  headerCenterText: string;
  descriptionText?:string;
}
export default function GenericModalWindow(props: GenericModalWindowProps) {
  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={props.show}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.headerText}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>{props.headerCenterText}</h4>
        <p>
          {props.descriptionText}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.closeWindow}>Закрыть</Button>
      </Modal.Footer>
    </Modal>
  );
}
