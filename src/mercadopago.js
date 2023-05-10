import mercadopago from 'mercadopago';

// Configure suas credenciais
mercadopago.configure({
  access_token: 'APP_USR-8695569384609059-042822-a13531b6ad0df397a0052de6523a47b6-200617663'
});

// Crie um pagamento
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
