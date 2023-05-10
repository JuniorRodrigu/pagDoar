import React from 'react';
import mercadopago from './mercadopago';

function Checkout() {
  function handlePay() {
    // Crie um pagamento quando o usuário clicar no botão de pagamento
    mercadopago.payment.create({
      transaction_amount: 100,
      payment_method_id: 'visa',
      token: 'ff8080814c11e237014c1ff593b57b4d',
      installments: 1,
      payer: {
        email: 'test_user_19653727@testuser.com'
      }
    }).then(function (result) {
      console.log(result);
    }).catch(function (error) {
      console.error(error);
    });
  }

  return (
    <div>
      <h1>Checkout</h1>
      <button onClick={handlePay}>Pagar</button>
    </div>
  );
}

export default Checkout;
