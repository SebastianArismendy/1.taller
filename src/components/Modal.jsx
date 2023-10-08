import React from "react";

function Modal({ titulo, mensaje, closeModal }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-content-header">
          <h2>{titulo}</h2>
          <span onClick={closeModal}>✖</span>
        </div>

        <div className="modal-content-body">
          <p>{mensaje}</p>
        </div>
        <div className="modal-content-footer">
          <button onClick={closeModal}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
