import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importer Bootstrap
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './assets/css/styles.css'; // Importer les styles personnalisés
<<<<<<< HEAD
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router basename="/mon-portfolio/">  {/* Le Router ici avec le basename */}
      <App />
    </Router>
  </React.StrictMode>
);
      
=======

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
>>>>>>> 985ed9990ff16ed45eafce5745f39d8010d1c359
