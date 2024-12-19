import React from "react";
import { Modal, Button } from "react-bootstrap";

interface GeneralModalProps {
  show: boolean; // Controls visibility
  onClose: () => void; // Callback to close modal
  title?: string; // Optional title
  children?: React.ReactNode; // Content of the modal
  footer?: React.ReactNode; // Optional custom footer
  size?: "sm" | "lg" | "xl"; // Modal size
  onConfirm: () => void;
}

const GeneralModal: React.FC<GeneralModalProps> = ({
  show,
  onConfirm,
  onClose,
  title = "Modal Title",
  children,
  footer,
  size = "lg",
}) => {
  return (
    <Modal show={show} onHide={onClose} size={size} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      {footer ? (
        <Modal.Footer>{footer}</Modal.Footer>
      ) : (
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button variant="primary" onClick={onConfirm}>
            Confirm
          </Button>
        </Modal.Footer>
      )}
    </Modal>
  );
};

export default GeneralModal;