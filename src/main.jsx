import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importer Bootstrap
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './assets/css/styles.css'; // Importer les styles personnalisés

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
