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
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
  <circle class="path circle" fill="none" stroke="#73AF55" stroke-width="6" stroke-miterlimit="10" cx="65.1" cy="65.1" r="62.1"/>
  <polyline class="path check" fill="none" stroke="#73AF55" stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" points="100.2,40.2 51.5,88.8 29.8,67.5 "/>
</svg>


        <button onClick={handleCloseModal}>Fechar</button>
      </div>
    </div>
  );
}

export default Payme;
