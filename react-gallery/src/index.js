import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Initsializatsiya React-dodatka u DOM-derevi
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);