import React, { useReducer, useState, useEffect } from "react";
import axios from "axios";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyCEZTV3TnxRBdtx7NqzT5-4AX7zsXUZL6E",
  authDomain: "doarcao-cd553.firebaseapp.com",
  projectId: "doarcao-cd553",
});

const db = getFirestore(firebaseApp);
const api = axios.create({
  baseURL: "https://api.mercadopago.com",
});

api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer APP_USR-8695569384609059-042822-a13531b6ad0df397a0052de6523a47b6-200617663`;
  return config;
});

const formReducer = (state, event) => {
  return {
    ...state,
    [event.name]: event.value,
  };
};

function Paga(props) {
  const [responsePayment, setResponsePayment] = useState(null);
  const [statusPayment, setStatusPayment] = useState(false);
  const [transactionAmount, setTransactionAmount] = useState(parseFloat(props.transactionAmount));
  const [formData, setFormdata] = useReducer(formReducer, {});
  const [linkBuyMercadoPago, setLinkBuyMercadoPago] = useState(false);
  let intervalId;

  const handleChange = (event) => {
    setFormdata({
      name: event.target.name,
      value: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault();
    }

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
          number: "01234567890",
        },
      },
      notification_url: "https://eodvum2vysvd4fb.m.pipedream.net",
    };

    api
      .post("v1/payments", body)
      .then((response) => {
        setResponsePayment(response);
        setLinkBuyMercadoPago(
          response.data.point_of_interaction.transaction_data.ticket_url
        );
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const checkPaymentStatus = () => {
    if (responsePayment) {
      api.get(`v1/payments/${responsePayment.data.id}`).then((response) => {
        if (response.data.status === "approved") {
          setStatusPayment(true);
          clearInterval(intervalId);
        }
      });
    }
  };

  useEffect(() => {
    intervalId = setInterval(checkPaymentStatus, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, [responsePayment]);

  useEffect(() => {
    handleSubmit();
  }, [formData]);

  useEffect(() => {
    if (statusPayment) {
      window.location.reload();
    }
  }, [statusPayment]);

  return (
    <div className="pix">
  
   
  
    <header>
        {linkBuyMercadoPago && !statusPayment && (
          <iframe
            src={linkBuyMercadoPago}
            width="100%"
            height="800px"
            title="link_buy"
          />
        )}
      </header>
    </div>
  );
}

export default Paga;
