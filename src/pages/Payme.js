import React, { useState, useEffect } from 'react';
import { getDocs, query, orderBy, limit, collection, doc, updateDoc } from 'firebase/firestore';
import "./payme.css";

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCEZTV3TnxRBdtx7NqzT5-4AX7zsXUZL6E",
  authDomain: "doarcao-cd553.firebaseapp.com",
  projectId: "doarcao-cd553",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

function Payme({ closeModal }) {
  const handleCloseModal = () => {
    closeModal(); // Fechar o modal (lógica personalizada)
    window.location.reload(); // Recarregar a página
  };

  const [lastUserId, setLastUserId] = useState(null);

  useEffect(() => {
    const fetchLastUser = async () => {
      try {
        const usersCollectionRef = collection(db, "users");
        const snapshot = await getDocs(query(usersCollectionRef, orderBy("createdAt", "desc"), limit(1)));
        const lastUser = snapshot.docs[0];
        setLastUserId(lastUser.id);
      } catch (error) {
        console.log('Erro ao obter último usuário: ', error);
      }
    };

    fetchLastUser();
  }, []);

  useEffect(() => {
    if (lastUserId) {
      const markUserAsPaid = async () => {
        try {
          const userDoc = doc(db, "users", lastUserId);
          await updateDoc(userDoc, { tipo: "pago" });
        } catch (error) {
          console.log('Erro ao marcar usuário como pago: ', error);
        }
      };

      markUserAsPaid();
    }
  }, [lastUserId]);

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Pagamento Concluído</h2>
        <p>O pagamento foi aprovado com sucesso!</p>
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
          <circle className="path circle" fill="none" stroke="#73AF55" strokeWidth="6" strokeLinecap="round" strokeMiterlimit="10" cx="65.1" cy="65.1" r="62.1" />
          <polyline className="path check" fill="none" stroke="#73AF55" strokeWidth="6" strokeLinecap="round" strokeMiterlimit="10" points="100.2,40.2 51.5,88.8 29.8,67.5" />
        </svg>

        <button onClick={handleCloseModal}>Fechar</button>
      </div>
    </div>
  );
}

export default Payme;
