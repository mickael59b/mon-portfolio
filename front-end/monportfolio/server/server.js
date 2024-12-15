require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const axios = require('axios');

// Initialisation de l'application Express
const app = express();

// Middleware pour gérer CORS et le corps des requêtes
app.use(cors()); // Autorise les requêtes cross-origin
app.use(bodyParser.json()); // Parse le corps des requêtes JSON

// Import des routes
const clientRoutes = require('./routes/clients');
const projectRoutes = require('./routes/project'); // Vous devez déjà avoir défini les routes de projets
const contactRoutes = require('./routes/contact'); // Vous devez déjà avoir défini les routes de contact

// Middleware pour gérer les fichiers téléchargés avec Multer
const storage = multer.memoryStorage(); // Stocke les fichiers en mémoire temporaire
const upload = multer({ storage: storage });

// Vérification des variables d'environnement
const { GITHUB_TOKEN, GITHUB_REPO, GITHUB_BRANCH } = process.env;

if (!GITHUB_TOKEN || !GITHUB_REPO || !GITHUB_BRANCH) {
  console.error('❌ Erreur : Les variables d\'environnement pour GitHub ne sont pas configurées.');
  process.exit(1); // Arrête le serveur si les variables ne sont pas présentes
}

// Routes de l'application
app.use('/api/clients', clientRoutes);  // Gère l'inscription et la connexion des clients
app.use('/api/projects', projectRoutes); // Gère les projets
app.use('/api/contact', contactRoutes); // Gère les messages de contact

// Fonction de connexion à la base de données MongoDB
const connectDB = async () => {
  try {
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
connectDB();

// Route de base pour vérifier si l'API fonctionne
app.get('/', (req, res) => {
  res.send('API is running!');
});

// Route pour uploader une image sur GitHub
app.post('/api/upload', upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'Aucun fichier téléchargé.' });
  }

  try {
    // Nom du fichier à uploader sur GitHub
    const fileName = `uploads/${Date.now()}-${req.file.originalname}`;
    const fileContent = req.file.buffer.toString('base64'); // Encode le fichier en base64

    // URL de l'API GitHub pour uploader un fichier
    const url = `https://api.github.com/repos/${GITHUB_REPO}/contents/${fileName}`;
    const commitMessage = `Add image ${fileName}`;

    // Requête vers l'API GitHub pour uploader l'image
    const response = await axios.put(
      url,
      {
        message: commitMessage,
        content: fileContent,  // Le fichier est encodé en base64
        branch: GITHUB_BRANCH,
      },
      {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`, // Authentification avec le token GitHub
        },
      }
    );

    // L'URL brute du fichier sur GitHub
    const rawUrl = response.data.content.download_url;

    res.json({
      success: true,
      message: 'Image téléchargée avec succès.',
      imageUrl: rawUrl, // URL publique du fichier téléchargé
    });
  } catch (error) {
    console.error('❌ Erreur lors de l\'upload sur GitHub :', error.response?.data || error.message);
    res.status(500).json({
      success: false,
      message: 'Erreur lors du téléchargement sur GitHub.',
    });
  }
});

// Démarrage du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
