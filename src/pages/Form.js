import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  deleteDoc,
  getDocs,
} from "firebase/firestore";
import "./form.css";
import "../Modal";
import Modal from "../Modal";

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
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
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
      <input
        type="text"
        placeholder="Telefone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
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
      <input
        type="text"
        placeholder="Valor"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
     <button className="bt" onClick={() => {
  criarDado();
  setOpenModal(true);
}}>
  Criar dado e abrir modal
</button>
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
    
      <Modal isOpen={openModal} setModalOpen={() => setOpenModal(!openModal)}>
        Conteúdo do modal
      </Modal>
      <Modal
        isOpen={openModal2}
        setModalOpen={() => setOpenModal2(!openModal2)}
      >
        Conteúdo do modal 2
      </Modal>
    </div> 
  );
};

export default App;
