const express = require('express');
const mongoose = require('mongoose');
<<<<<<< HEAD
const multer = require('multer');
const axios = require('axios');
const Project = require('../models/Project'); // Modèle Mongoose pour les projets

const router = express.Router();

// Configuration de Multer pour l'upload en mémoire (pas de stockage local)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Route pour créer un projet avec image uploadée sur GitHub
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { title, category, description } = req.body;
    if (!title || !category || !description) {
      return res.status(400).json({ message: 'Tous les champs de base (titre, catégorie, description) sont requis' });
    }

    let imageUrl = null;
    if (req.file) {
      // Nom du fichier à uploader sur GitHub
      const fileName = `uploads/${Date.now()}-${req.file.originalname}`;
      const fileContent = req.file.buffer.toString('base64'); // Encode le fichier en base64

      // Utiliser GitHub API pour uploader le fichier
      const url = `https://api.github.com/repos/${process.env.GITHUB_REPO_OWNER}/${process.env.GITHUB_REPO_NAME}/contents/${fileName}`;
      const commitMessage = `Add image ${fileName}`;

      try {
        const response = await axios.put(
          url,
          {
            message: commitMessage,
            content: fileContent,  // Le fichier est encodé en base64
            branch: process.env.GITHUB_BRANCH,
          },
          {
            headers: {
              Authorization: `Bearer ${process.env.GITHUB_TOKEN}`, // Authentification avec le token GitHub
            },
          }
        );

        // L'URL brute du fichier sur GitHub
        imageUrl = response.data.content.download_url;

      } catch (error) {
        return res.status(500).json({ message: 'Erreur d\'upload sur GitHub', error: error.message });
      }
    }

    // Créer le projet avec l'URL de l'image sur GitHub
    const project = new Project({
      ...req.body,
      image: imageUrl || null, // L'URL de l'image sur GitHub ou null si aucune image
    });

    await project.save();
    res.status(201).json(project); // Retourne le projet créé
  } catch (err) {
    console.error('Erreur lors de la création du projet:', err);
    res.status(500).json({ message: 'Erreur lors de la création du projet', error: err.message });
=======
const fs = require('fs'); // Ajout de l'import fs
const path = require('path'); // Ajout de l'import path
const Project = require('../models/Project');

const router = express.Router();

// Route pour créer un projet
router.post('/', async (req, res) => {
  try {
    // Vérification du corps de la requête
    if (!req.body.title || !req.body.category || !req.body.description) {
      return res.status(400).json({ message: 'Tous les champs sont requis' });
    }

    // Créer un nouveau projet avec le titre
    const project = new Project(req.body);
    await project.save();
    return res.status(201).json(project); // Réponse avec le projet créé
  } catch (err) {
    console.error('Erreur lors de la création du projet:', err);
    return res.status(500).json({ message: 'Erreur lors de la création du projet', error: err.message });
>>>>>>> 985ed9990ff16ed45eafce5745f39d8010d1c359
  }
});

// Récupérer toutes les catégories uniques des projets
router.get('/categories', async (req, res) => {
  try {
    const categories = await Project.distinct('category');
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: 'Erreur de récupération des catégories', error: err.message });
  }
});

<<<<<<< HEAD
// Récupérer les projets avec filtrage par catégorie et pagination
=======
// Récupérer les projets avec option de filtrage par catégorie et pagination
>>>>>>> 985ed9990ff16ed45eafce5745f39d8010d1c359
router.get('/', async (req, res) => {
  try {
    const { category, page = 1, limit = 10 } = req.query;
    const filter = category && category !== 'All' ? { category } : {};

    const projects = await Project.find(filter)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const totalProjects = await Project.countDocuments(filter);

    res.json({
      projects,
      totalProjects,
      totalPages: Math.ceil(totalProjects / limit),
      currentPage: Number(page),
    });
  } catch (err) {
    res.status(500).json({ message: 'Erreur de récupération des projets', error: err.message });
  }
});

// Récupérer un projet par ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID de projet invalide' });
    }

    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ message: 'Projet non trouvé' });
    }

    res.json(project);
  } catch (err) {
    console.error('Erreur serveur:', err);
    res.status(500).json({ message: 'Erreur du serveur', error: err.message });
  }
});

<<<<<<< HEAD
// Supprimer un projet par ID et son image associée sur GitHub
=======
// Supprimer un projet par ID
>>>>>>> 985ed9990ff16ed45eafce5745f39d8010d1c359
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID de projet invalide' });
    }

<<<<<<< HEAD
    // Récupérer le projet pour obtenir l'URL de l'image
=======
    // Récupérer le projet pour obtenir le chemin de l'image
>>>>>>> 985ed9990ff16ed45eafce5745f39d8010d1c359
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ message: 'Projet non trouvé' });
    }

<<<<<<< HEAD
    // Supprimer l'image associée de GitHub
    if (project.image) {
      const fileName = project.image.split('/').pop();
      const url = `https://api.github.com/repos/${process.env.GITHUB_REPO_OWNER}/${process.env.GITHUB_REPO_NAME}/contents/uploads/${fileName}`;

      await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        },
=======
    // Si une image est associée au projet, supprimer le fichier du dossier uploads
    if (project.image) {
      const imagePath = path.join(__dirname, '..', 'uploads', path.basename(project.image));
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error('Erreur lors de la suppression de l\'image:', err);
        } else {
          console.log('Image supprimée:', imagePath);
        }
>>>>>>> 985ed9990ff16ed45eafce5745f39d8010d1c359
      });
    }

    // Supprimer le projet de la base de données
    await Project.findByIdAndDelete(id);

    res.status(200).json({ message: 'Projet et image associés supprimés avec succès' });
  } catch (err) {
    console.error('Erreur serveur:', err);
    res.status(500).json({ message: 'Erreur du serveur', error: err.message });
  }
});

module.exports = router;
