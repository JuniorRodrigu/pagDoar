import React, { useReducer, useState } from "react";
import axios from "axios";
import "./App.css";
import Modal from "./Modal";

const api = axios.create({
  baseURL: "https://api.mercadopago.com",
});

api.interceptors.request.use(async (config) => {
  const token = process.env.REACT_APP_TOKEN_MERCADO_PAGO_PUBLIC;
  config.headers.Authorization = `Bearer APP_USR-8695569384609059-042822-a13531b6ad0df397a0052de6523a47b6-200617663`;

  return config;
});

const formReducer = (state, event) => {
  return {
    ...state,
    [event.name]: event.value,
  };
};

function App() {
  const [formData, setFormdata] = useReducer(formReducer, {});
  const [responsePayment, setResponsePayment] = useState(false);
  const [linkBuyMercadoPago, setLinkBuyMercadoPago] = useState(false);
  const [statusPayment, setStatusPayment] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (event) => {
    setFormdata({
      name: event.target.name,
      value: event.target.value,
    });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    window.location.reload();
  };

  const getStatusPayment = () => {
    api.get(`v1/payments/${responsePayment.data.id}`).then((response) => {
      if (response.data.status === "approved") {
        setStatusPayment("Pagamento aprovado!");
        setIsModalOpen(true);
      }
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const body = {
      transaction_amount: 1,
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
      notification_url: "https://eorpjcvcjvhqnq6.m.pipedream.net",
    };

    api
      .post("v1/payments", body)
      .then((response) => {
        setResponsePayment(response);
        setLinkBuyMercadoPago(
          response.data.point_of_interaction.transaction_data.ticket_url
        );
        setIsModalOpen(true);
      })
      .catch((err) => {
        // alert(err)
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        {!responsePayment && (
          <form onSubmit={handleSubmit}>
            <div>
              <button type="submit">Pagar</button>
            </div>
          </form>
        )}

        {responsePayment && (
          <button onClick={getStatusPayment}>Verificar status pagamento</button>
        )}

        {linkBuyMercadoPago && !statusPayment && (
          <iframe src={linkBuyMercadoPago} width="400px" height="620px" title="link_buy" />
        )}

        <Modal isOpen={isModalOpen} setModalOpen={setIsModalOpen}>
          <h2>{statusPayment}</h2>
          <button onClick={closeModal}>Fechar</button>
        </Modal>
      </header>
    </div>
  );
}

export default App;
