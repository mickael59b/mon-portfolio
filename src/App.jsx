import React from 'react';
<<<<<<< HEAD
=======
import { BrowserRouter as Router } from 'react-router-dom';
>>>>>>> 985ed9990ff16ed45eafce5745f39d8010d1c359
import { AuthProvider } from './context/AuthContext'; // Import du fournisseur de contexte
import Header from './components/Header';
import Footer from './components/Footer';
import Feedback from './components/Feedback';
import AppRoutes from './routes/AppRoutes'; // Importation des routes

const App = () => {
  return (
<<<<<<< HEAD
    <AuthProvider>
      <Header />
      <Feedback />
      <AppRoutes /> {/* Utilisation des routes depuis AppRoutes.jsx */}
      <Footer />
    </AuthProvider>
=======
    // Le Router doit englober tous les composants qui utilisent react-router
    <Router>
      {/* AuthProvider peut maintenant utiliser useNavigate sans problème */}
      <AuthProvider>
        <Header />
        <Feedback />
        <AppRoutes /> {/* Utilisation des routes depuis AppRoutes.jsx */}
        <Footer />
      </AuthProvider>
    </Router>
>>>>>>> 985ed9990ff16ed45eafce5745f39d8010d1c359
  );
};

export default App;
