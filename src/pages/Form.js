import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  deleteDoc,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import "./form.css";
import "../Modal";
import Modal from "../Modal";
import Paga from "./Paga";
import CurrencyInput from 'react-currency-input-field';
import InputMask from "react-input-mask";
import PagaComponent from "./Paga";
import { serverTimestamp } from 'firebase/firestore';


const firebaseApp = initializeApp({
  apiKey: "AIzaSyCEZTV3TnxRBdtx7NqzT5-4AX7zsXUZL6E",
  authDomain: "doarcao-cd553.firebaseapp.com",
  projectId: "doarcao-cd553",
});

export const App = () => {
  
  const createdAt = serverTimestamp();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");
  const [value, setValue] = useState("");
  const [users, setUsers] = useState([]);

  const db = getFirestore(firebaseApp);
  const usersCollectionRef = collection(db, "users");
const [paymentAmount, setPaymentAmount] = useState("");

const handlePaymentAmountChange = (event, value) => {
  setPaymentAmount(value);
};
  async function criarDado() {
    try {
      const user = await addDoc(collection(db, "users"), {
        nome,
        email,
        phone,
        address,
        message,
        value,
        status: "pendente", 
        createdAt: createdAt,
      });

      console.log("dados salvos com sucesso", user);
      // Atualizar a página
    
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
      setUsers(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  
    // retorna a função unsubscribe para limpar o ouvinte quando o componente for desmontado
    return () => {
      unsubscribe();
    };
  }, []);

  async function deleteUser(id) {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
  
  }
    const [openModal, setOpenModal] = useState(false)
  const [openModal2, setOpenModal2] = useState(false)

  return (
    
    <div className="form">
<input
  type="text"
  placeholder="Nome"
  value={nome}
  onChange={(e) => setNome(e.target.value)}
  className="input-large"
/>
<input
  type="email"
  placeholder="E-mail"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  className="input-large"
/>
<InputMask
  type="text"
  placeholder="Telefone"
  mask="(99) 99999-9999"
  value={phone}
  onChange={(e) => setPhone(e.target.value)}
  className="input-large"
/>
<input
  type="text"
  placeholder="Endereço"
  value={address}
  onChange={(e) => setAddress(e.target.value)}
  className="input-large"
/>
<textarea
  placeholder="Mensagem"
  value={message}
  onChange={(e) => setMessage(e.target.value)}
  rows={5}
  className="textarea-large"
></textarea>

  <CurrencyInput
  id="value"
  placeholder="Valor"
  prefix="R$"
  decimalSeparator=","
  groupSeparator="."
  onValueChange={(value) => setValue(value)}
/>
<button className="bt" onClick={() => {
  if (nome && email && phone && address && value) {
    criarDado();
    setOpenModal(true);
  } else {
    alert("Por favor, preencha todos os campos obrigatórios");
  }
}}>
  Doar
</button>
 <div>
  

</div>
  

<Modal isOpen={openModal} setModalOpen={() => setOpenModal(!openModal)}>
  <Paga transactionAmount={value} />
</Modal>

   
    </div> 
  );
};

export default App;
