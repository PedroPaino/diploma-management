import React, { useEffect, useState } from 'react';
import { fetchDiplomas } from '../services/api.js';

function DiplomaList() {
  const [diplomas, setDiplomas] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchDiplomas();
        setDiplomas(data);
      } catch (error) {
        console.error('Failed to fetch diplomas:', error);
      }
    };
    loadData();
  }, []);

  return (
    <div>
      {diplomas.map((diploma) => (
        <div key={diploma._id}>
          <h3>{diploma.nome}</h3>
          <p>{diploma.descricao}</p>
          <p>{diploma.instituicao}</p>
          <p>{diploma.data}</p>
        </div>
      ))}
    </div>
  );
}

export default DiplomaList;
