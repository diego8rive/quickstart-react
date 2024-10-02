// App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Catalog from './components/Catalog';
import AssistantPage from './components/AssistantPage';
import VoiceCapturePage from './components/VoiceCapturePage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Catalog />} />
      <Route path="/assistant/:assistantName" element={<AssistantPage />} />
      <Route path="/voice-capture" element={<VoiceCapturePage />} />
    </Routes>
  );
}

export default App;