import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, Typography } from '@mui/material';
import QRCode from 'qrcode.react';

const DiplomaDetails = () => {
  const { diplomaId } = useParams();
  const [diploma, setDiploma] = useState(null);

  useEffect(() => {
    // Função para buscar os detalhes do diploma usando `fetchDiplomas` do serviço
    async function fetchDiplomaDetails() {
      try {
        const response = await fetch(`/diplomas/${diplomaId}`);
        const data = await response.json();
        setDiploma(data);
      } catch (error) {
        console.error('Failed to fetch diploma details:', error);
      }
    }

    fetchDiplomaDetails();
  }, [diplomaId]);

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">Diploma Details</Typography>
        {diploma && (
          <>
            <Typography variant="body1">Name: {diploma.name}</Typography>
            <Typography variant="body1">Course: {diploma.course}</Typography>
            <Typography variant="body1">Completion Date: {diploma.completionDate}</Typography>
            <QRCode value={`http://localhost:3000/validate/${diplomaId}`} />
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default DiplomaDetails;
