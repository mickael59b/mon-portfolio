import React from 'react';
import { AuthProvider } from './context/AuthContext'; // Import du fournisseur de contexte
import Header from './components/Header';
import Footer from './components/Footer';
import Feedback from './components/Feedback';
import AppRoutes from './routes/AppRoutes'; // Importation des routes

const App = () => {
  return (
    <AuthProvider>
      <Header />
      <Feedback />
      <AppRoutes /> {/* Utilisation des routes depuis AppRoutes.jsx */}
      <Footer />
    </AuthProvider>
  );
};

export default App;
