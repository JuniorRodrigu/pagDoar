import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, doc, deleteDoc, getDocs, updateDoc, query, orderBy } from 'firebase/firestore';
import "./teste.css";

const firebaseConfig = {
  apiKey: "AIzaSyCEZTV3TnxRBdtx7NqzT5-4AX7zsXUZL6E",
  authDomain: "doarcao-cd553.firebaseapp.com",
  projectId: "doarcao-cd553",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

const Home = () => {
  const [users, setUsers] = useState([]);
  const [userType, setUserType] = useState("");
  const [lastAddedUser, setLastAddedUser] = useState(null);

  const usersCollectionRef = collection(db, "users");

  const fetchUsers = async () => {
    try {
      const snapshot = await getDocs(query(usersCollectionRef, orderBy("createdAt", "desc")));
      const users = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(users);

      if (users.length > 0) {
        setLastAddedUser(users[0]);
      }
    } catch (error) {
      console.log('Erro ao obter usuários: ', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUser = async (userId) => {
    try {
      const userDoc = doc(db, "users", userId);
      await deleteDoc(userDoc);
      fetchUsers();
    } catch (error) {
      console.log('Erro ao excluir usuário: ', error);
    }
  };

  const markUserAsPaid = async (userId) => {
    try {
      const userDoc = doc(db, "users", userId);
      await updateDoc(userDoc, { tipo: "pago" });
      setUserType("pago");
    } catch (error) {
      console.log('Erro ao marcar usuário como pago: ', error);
    }
  };

  return (
    <div>
      <h1>Tabela de Usuários</h1>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th className='tel'>Telefone</th>
            <th>Endereço</th>
            <th className='msm'>Mensagem</th>
            <th>Valor</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.nome}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.address}</td>
              <td>{user.message}</td>
              <td>{user.value}</td>
              <td>{user.tipo === "pago" ? "Pago" : user.tipo}</td>
              <td>
               
                <button onClick={() => deleteUser(user.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      
    </div>
  );
};

export default Home;