/*
 * Mimium Pty. Ltd. ("LKG") CONFIDENTIAL
 * Copyright (c) 2022 Mimium project Pty. Ltd. All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains the property of LKG. The intellectual and technical concepts contained
 * herein are proprietary to LKG and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material is strictly forbidden unless prior written permission is obtained
 * from LKG.  Access to the source code contained herein is hereby forbidden to anyone except current LKG employees, managers or contractors who have executed
 * Confidentiality and Non-disclosure agreements explicitly covering such access.
 */
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
