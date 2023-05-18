import React from "react";
import "./paymentModal.css";
function PaymentModal({ closeModal }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Pagamento Concluído</h2>
        <p>O pagamento foi aprovado com sucesso!</p>
        <img src="gifpg.gif" alt="Gif Pagamento" />
        <button onClick={closeModal}>Fechar</button>
      </div>
    </div>
  );
}

export default PaymentModal;
