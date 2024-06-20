import React, { useState } from 'react';
import { addDiploma } from '../services/api.js';

function DiplomaForm() {
  const [diploma, setDiploma] = useState({
    nome: '',
    descricao: '',
    instituicao: '',
    data: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDiploma({ ...diploma, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDiploma(diploma);
      alert('Diploma adicionado com sucesso!');
      // Redirecionar ou limpar o formulário, conforme necessário
    } catch (error) {
      console.error('Erro ao adicionar diploma:', error);
      alert('Falha ao adicionar diploma');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nome:</label>
        <input type="text" name="nome" value={diploma.nome} onChange={handleChange} required />
      </div>
      <div>
        <label>Descrição:</label>
        <input type="text" name="descricao" value={diploma.descricao} onChange={handleChange} required />
      </div>
      <div>
        <label>Instituição:</label>
        <input type="text" name="instituicao" value={diploma.instituicao} onChange={handleChange} required />
      </div>
      <div>
        <label>Data:</label>
        <input type="date" name="data" value={diploma.data} onChange={handleChange} required />
      </div>
      <button type="submit">Adicionar Diploma</button>
    </form>
  );
}

export default DiplomaForm;
