require('dotenv').config();
const mongoose = require('mongoose');
const Client = require('./models/Client');
const Project = require('./models/Project');

// Connexion à MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connecté');
  } catch (error) {
    console.error('Erreur de connexion à MongoDB :', error);
    process.exit(1);
  }
};

// Données initiales
const seedDatabase = async () => {
  // Données pour la collection `clients`
  const clients = [
    {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'hashed_password_example', // Remplacez par un vrai hash si nécessaire
    },
    {
      name: 'Jane Doe',
      email: 'jane@example.com',
      password: 'hashed_password_example',
    },
  ];

  // Données pour la collection `projects`
  const projects = [
    {
      title: 'Site Web Portfolio',
      description: 'Un portfolio moderne pour les freelances.',
      category: 'Web',
    },
    {
      title: 'Application Mobile E-Commerce',
      description: 'Une app pour gérer les commandes et les ventes.',
      category: 'Mobile',
    },
  ];

  try {
    // Vider les collections existantes
    await Client.deleteMany();
    await Project.deleteMany();

    // Insérer les nouvelles données
    await Client.insertMany(clients);
    await Project.insertMany(projects);

    console.log('Base de données initialisée avec succès');
  } catch (error) {
    console.error('Erreur pendant l’initialisation :', error);
  }
};

// Fonction principale
const initDB = async () => {
  await connectDB();
  await seedDatabase();
  mongoose.connection.close();
};

// Exécuter le script
initDB();
