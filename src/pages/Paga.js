import React, { useReducer, useState, useEffect } from "react";
import axios from "axios";
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
const firebaseApp = initializeApp({
  apiKey: "AIzaSyCEZTV3TnxRBdtx7NqzT5-4AX7zsXUZL6E",
  authDomain: "doarcao-cd553.firebaseapp.com",
  projectId: "doarcao-cd553",
});


const db = getFirestore(firebaseApp);
const usersCollectionRef = collection(db, "users");
const api = axios.create({
  baseURL: "https://api.mercadopago.com"
});

api.interceptors.request.use(async (config) => {
  const token = process.env.REACT_APP_TOKEN_MERCADO_PAGO_PUBLIC;
  config.headers.Authorization = `Bearer APP_USR-8695569384609059-042822-a13531b6ad0df397a0052de6523a47b6-200617663`;

  return config;
});

const formReducer = (state, event) => {
  return {
    ...state,
    [event.name]: event.value
  };
};

function Paga(props) {
  const [lastUser, setLastUser] = useState(null);

  // Obtém o último usuário adicionado ao Firestore
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
        // Ordena os documentos pelo campo "createdAt" em ordem decrescente
        const sortedDocs = snapshot.docs.sort((a, b) => b.data().createdAt - a.data().createdAt);
        // Obtém o último documento adicionado
        const lastDoc = sortedDocs[0];
        if (lastDoc) {
          setLastUser({ ...lastDoc.data(), id: lastDoc.id });
        }
      });
    }, 900); // Aguarda 900ms (0.9s) antes de buscar o último usuário adicionado

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  // Reducer para o estado do formulário
  const [formData, setFormdata] = useReducer(formReducer, {});

  // Estado para armazenar a resposta do pagamento
  const [responsePayment, setResponsePayment] = useState(false);

  // Estado para armazenar o link de pagamento do Mercado Pago
  const [linkBuyMercadoPago, setLinkBuyMercadoPago] = useState(false);

  // Estado para armazenar o status do pagamento
  const [statusPayment, setStatusPayment] = useState(false);

  // Estado para armazenar o valor da transação
  const [transactionAmount, setTransactionAmount] = useState(parseFloat(props.transactionAmount));

  // Handler para atualizar o estado do formulário
  const handleChange = (event) => {
    setFormdata({
      name: event.target.name,
      value: event.target.value
    });
  };

  // Função para obter o status do pagamento no Mercado Pago
  const getStatusPayment = () => {
    api.get(`v1/payments/${responsePayment.data.id}`).then((response) => {
      if (response.data.status === "approved") {
        setStatusPayment(true);
      }
    });
  };

  // Handler para enviar a solicitação de pagamento ao Mercado Pago
  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault();
    }

    // Cria um objeto com os dados da transação
    const body = {
      transaction_amount: transactionAmount,
      description: "Produto teste de desenvolvimento",
      payment_method_id: "pix",
      payer: {
        email: "gerson@gmail.com",
        first_name: "Gerson Dev",
        last_name: "JS python html",
        identification: {
          type: "CPF",
          number: "01234567890"
        }
      },
      notification_url: "https://eorpjcvcjvhqnq6.m.pipedream.net"
    };

    // Envia a solicitação de pagamento ao Mercado Pago
    api
      .post("v1/payments", body)
      .then((response) => {
        setResponsePayment(response);
        setLinkBuyMercadoPago(
          response.data.point_of_interaction.transaction_data.ticket_url
        );
        setTransactionAmount(parseFloat(formData.transaction_amount));
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // Envia a solicitação de pagamento ao carregar o componente
  useEffect(() => {
    handleSubmit();
  }, []);

  return (
    <div className="pix">
      <header>
        {linkBuyMercadoPago && !statusPayment && (
          <iframe
            src={linkBuyMercadoPago}
            width="100%"
            height="800px " 
            title="link_buy"
          />
        )}
        
      </header>
     
    </div>
  );
}

export default Paga;

