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


const firebaseApp = initializeApp({
  apiKey: "AIzaSyCEZTV3TnxRBdtx7NqzT5-4AX7zsXUZL6E",
  authDomain: "doarcao-cd553.firebaseapp.com",
  projectId: "doarcao-cd553",
});

export const App = () => {
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
        status: "pendente", // adicione o campo "status" com valor "pendente"
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
      />
      <input
        type="email"
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
 <div>
  
  <InputMask
   type="text"
   placeholder="Telefone"
    mask="(99) 99999-9999"
    value={phone}
    onChange={(e) => setPhone(e.target.value)}
  />
</div>
      <input
        type="text"
        placeholder="Endereço"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <textarea
        placeholder="Mensagem"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={5}
      />
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
  Criar dado e abrir modal
</button>

<Modal isOpen={openModal} setModalOpen={() => setOpenModal(!openModal)}>
  <Paga transactionAmount={value} />
</Modal>


      <ul>
        {users.map((user) => {
          return (
            <React.Fragment key={user.id}>
              <li>{user.nome}</li>
              <li>{user.email}</li>
              <li>{user.phone}</li>
              <li>{user.address}</li>
              <li>{user.message}</li>
              <li>{user.value}</li>
              <li>{user.status}</li>
              <button onClick={() => deleteUser(user.id)}>Deletar</button>
            </React.Fragment>
          );
        })}
      </ul>
    
     
    </div> 
  );
};

export default App;
