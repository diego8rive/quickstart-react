// App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Catalog from './components/Catalog';
import AssistantPage from './components/AssistantPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Catalog />} />
      <Route path="/assistant/:assistantId" element={<AssistantPage />} />
    </Routes>
  );
}

export default App;