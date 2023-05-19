import React from "react";
import "./payme.css";
function Payme({ closeModal }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Pagamento Concluído</h2>
        <p>O pagamento foi aprovado com sucesso!</p>
        <img src="../gifpg.gif" alt="Gif Pagamento" />
        <button onClick={closeModal}>Fechar</button>
      </div>
    </div>
  );
}

export default Payme;
