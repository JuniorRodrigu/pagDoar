import React, { useReducer, useState, useEffect } from "react"; 
import axios from "axios";
import QRCode from "qrcode.react";

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

function Paga() { 
  const [formData, setFormdata] = useReducer(formReducer, {}); 
  const [responsePayment, setResponsePayment] = useState(false); 
  const [qrCode, setQrCode] = useState(null);
  const [copyText, setCopyText] = useState(null);

  const handleChange = (event) => { 
    setFormdata({ 
      name: event.target.name, 
      value: event.target.value 
    }); 
  }; 

  const handleSubmit = (event) => { 
    if (event) { 
      event.preventDefault(); 
    } 

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
          number: "01234567890" 
        } 
      }, 
      notification_url: "https://eorpjcvcjvhqnq6.m.pipedream.net" 
    }; 

    api 
      .post("v1/payments", body) 
      .then((response) => { 
        setResponsePayment(response); 
        setQrCode(response.data.point_of_interaction.transaction_data.qr_code.image);
        setCopyText(response.data.point_of_interaction.transaction_data.qr_code.content);
      }) 
      .catch((err) => { 
        // alert(err) 
      }); 
  }; 

  useEffect(() => { 
    handleSubmit(); 
  }, []); 

  return ( 
    <div className="App"> 
      <header className="App-header"> 
        {qrCode && (
          <div>
            <QRCode value={qrCode} />
            <p>Chave PIX: {copyText}</p>
          </div>
        )}
      </header> 
    </div> 
  ); 
} 

export default Paga;
