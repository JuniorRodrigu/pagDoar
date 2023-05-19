import React from "react";
import "./payme.css";
import gifpg from "./gifpg.gif";

function Payme({ closeModal }) {
  const handleCloseModal = () => {
    closeModal(); // Fechar o modal (lógica personalizada)
    window.location.reload(); // Recarregar a página
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Pagamento Concluído</h2>
        <p>O pagamento foi aprovado com sucesso!</p>
        <img src={gifpg} alt="Gif Pagamento" />
        <button onClick={handleCloseModal}>Fechar</button>
      </div>
    </div>
  );
}

export default Payme;
