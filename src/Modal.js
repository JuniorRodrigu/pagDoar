import React, { useState, useEffect } from "react";
import "./modal.css";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCEZTV3TnxRBdtx7NqzT5-4AX7zsXUZL6E",
  authDomain: "doarcao-cd553.firebaseapp.com",
  projectId: "doarcao-cd553",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const usersCollectionRef = collection(db, "users");

export default function Modal({ isOpen, setModalOpen, children }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
      setUsers(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  
    // retorna a função unsubscribe para limpar o ouvinte quando o componente for desmontado
    return () => {
      unsubscribe();
    };
  }, []);
  

  const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
    window.location.reload();
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  if (isOpen) {
    return (
      <div className="BACKGROUND_STYLE">
        <div className="MODAL_STYLE">
          <div className="CLOSE_STYLE" onClick={closeModal}>
            X
          </div>
          <div>{children}</div>

     
        </div>
      </div>
    );
  }

  return null;
};
