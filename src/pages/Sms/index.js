import React from 'react';
import axios from 'axios';

const App = () => {
  const sendSMS = async () => {
    try {
      const response = await axios.post(
        'https://api.smsempresa.com.br/v1/send',
        {
          key: 'CFOUP0UBE0GMR2HSYYFTWTFZPFYFY8URBEDJS5Y78NAUYV9OIVYZHN81VNAN8P3PFU5J7FZ6MQNVOOO8AXFFW3T62O61U1XNIGE6A8V4LMU5CWA5LP25SWWHICK2GXU4',
          type: '9', // 9 para SMS
          number: '88988231924',
          msg: 'Teste de envio.',
          out: 'json' // Se desejar retorno em json ou xml
        }
      );

      console.log(response.data);
    } catch (error) {
      console.error('Erro ao enviar o SMS:', error);
    }
  };

  const handleSendSMS = () => {
    sendSMS();
  };

  return (
    <div>
      {/* Outros componentes e elementos do seu aplicativo */}
      <button onClick={handleSendSMS}>Enviar SMS</button>
    </div>
  );
};

export default App;
