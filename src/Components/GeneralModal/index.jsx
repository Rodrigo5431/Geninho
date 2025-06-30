import React from "react";
import "./GeneralModal.css";

export default function GeneralModal({ message, onClose }) {
  return (
    <section className="modal open">
      <section className="modal-content">
        <p className="modal-message">{message}</p>
        <div className="modal-actions">
          <button className="modal-btn confirm-btn" onClick={onClose}>
            Fechar
          </button>
        </div>
      </section>
    </section>
  );
}
