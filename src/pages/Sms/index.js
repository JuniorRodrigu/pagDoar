import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://apisms.vercel.app', {
        numero: '+5588988231924',
        mensagem: 'teste',
      });

      console.log(response.data);
      setSent(true);
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  return (
    <div>
      {error && <p>{error}</p>}
      {sent && <p>Mensagem enviada com sucesso!</p>}
      <form onSubmit={handleSubmit}>
        <button type="submit">Enviar SMS</button>
      </form>
    </div>
  );
};

export default App;