import React, { useState } from 'react';
import "./form.css";

function Form() {
    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [endereco, setEndereco] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [valor, setValor] = useState('');

  function handleFormSubmit(event) {
    event.preventDefault();
    if (nome.trim() === '' || telefone.trim() === '' || endereco.trim() === '' || valor.trim() === '') {
      alert('Por favor, preencha todos os campos');
      return;
    }
    // aqui você pode enviar os dados para o servidor usando fetch, axios ou outra biblioteca
    alert('Obrigado pela sua doação!');
  }
  return (
    <div className='form'>
    <form onSubmit={handleFormSubmit}>
      <label>
        Nome:
        <input type="text" value={nome} onChange={(event) => setNome(event.target.value)} />
      </label>
      <label>
        Telefone:
        <input type="text" value={telefone} onChange={(event) => setTelefone(event.target.value)} />
      </label>
      <label>
        Endereço:
        <input type="text" value={endereco} onChange={(event) => setEndereco(event.target.value)} />
      </label>
      <label>
        mensagem:
        <textarea className="textarea-grande" value={mensagem} onChange={(event) => setMensagem(event.target.value)} />
      </label>
      <label>
        Valor da doação:
        <input type="text" value={valor} onChange={(event) => setValor(event.target.value)} />
      </label>
      <button type="submit">Doar</button>
    </form>
    </div>
  );
}


export default Form;
