// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage.js';
import DiplomaForm from './components/DiplomaForm.js';
import DiplomaList from './components/DiplomaList.js';
import DiplomaDetails from './components/DiplomaDetails.js'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add-diploma" element={<DiplomaForm />} />
        <Route path="/diplomas" element={<DiplomaList />} />
        <Route path="/diplomas/:diplomaId" element={<DiplomaDetails />} /> 
        <Route path="/diploma-details" element={<DiplomaDetails url="https://reitoriaugf.com.br/" />} /> 
        </Routes>
    </Router>
  );
}

export default App;
