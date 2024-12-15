<<<<<<< HEAD
require('dotenv').config(); // Chargement des variables d'environnement
=======
// server.js
require('dotenv').config();
>>>>>>> 985ed9990ff16ed45eafce5745f39d8010d1c359
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// Initialisation de l'application Express
const app = express();

// Import des routes
const clientRoutes = require('./routes/clients');
<<<<<<< HEAD
const projectRoutes = require('./routes/project');
const contactRoutes = require('./routes/contact');

// Middleware pour gérer CORS et le corps des requêtes
app.use(cors()); // Autoriser les requêtes cross-origin
app.use(bodyParser.json()); // Parse les données JSON des requêtes entrantes
=======
const projectRoutes = require('./routes/project'); // Vous devez déjà avoir défini les routes de projets
const contactRoutes = require('./routes/contact'); // Vous devez déjà avoir défini les routes de contact

// Middleware pour gérer CORS et le corps des requêtes
app.use(cors()); // Autorise les requêtes cross-origin
app.use(bodyParser.json()); // Parse le corps des requêtes JSON
>>>>>>> 985ed9990ff16ed45eafce5745f39d8010d1c359

// Routes de l'application
app.use('/api/clients', clientRoutes);  // Gère l'inscription et la connexion des clients
app.use('/api/projects', projectRoutes); // Gère les projets
app.use('/api/contact', contactRoutes); // Gère les messages de contact

// Fonction de connexion à la base de données MongoDB
const connectDB = async () => {
  try {
<<<<<<< HEAD
    // Connexion à MongoDB avec l'URI récupéré depuis .env
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Arrêter le serveur en cas d'échec de connexion
  }
};

// Connexion à la base de données MongoDB
=======
    // Connexion à MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Arrête le serveur en cas d'erreur de connexion
  }
};

// Appel de la fonction pour se connecter à la base de données
>>>>>>> 985ed9990ff16ed45eafce5745f39d8010d1c359
connectDB();

// Route de base pour vérifier si l'API fonctionne
app.get('/', (req, res) => {
  res.send('API is running!');
});

// Démarrage du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
