import React from "react";
import "./ConfirmationModal.css";

export default function ConfirmationModal({ message, onConfirm, onCancel }) {
  return (
    <section className="modal">
      <section className="modal-content">
        <p>{message}</p>
        <button onClick={onConfirm}>Yes</button>
        <button onClick={onCancel}>No</button>
      </section>
    </section>
  );
}
