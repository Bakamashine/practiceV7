import { Button, Modal } from "react-bootstrap";

export interface SubmitModalWindowProps {
    show: boolean;
    handleClose: () => void;
    success: () => void
}

export default function SubmitModalWindow(props: SubmitModalWindowProps) {
  return (
      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Подтверждение</Modal.Title>
        </Modal.Header>
        <Modal.Body>Вы уверены?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Закрыть
          </Button>
          <Button variant="primary" onClick={props.success}>
            Сохранить изменения
          </Button>
        </Modal.Footer>
      </Modal>
  );
}
