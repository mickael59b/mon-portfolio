// src/services/apiProjet
import axios from "axios";

// Définition de l'URL de base de l'API
const API_BASE_URL = "http://localhost:5000/api/projects"; // URL des projets

// Fonction pour récupérer tous les projets
export const obtenirTousLesProjets = async () => {
  try {
    const response = await axios.get(API_BASE_URL, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } // Authentification
    });
    console.log("Données récupérées :", response.data); // Vérification des données
    return response.data; // Retourne les données des projets
  } catch (error) {
    // Gestion des erreurs
    if (error.response) {
      console.error("Erreur serveur :", error.response.data);
      throw new Error(`Erreur du serveur : ${error.response.status} - ${error.response.data}`);
    } else if (error.request) {
      console.error("Erreur réseau :", error.request);
      throw new Error("Erreur réseau : Impossible de joindre le serveur.");
    } else {
      console.error("Erreur inconnue :", error.message);
      throw new Error(`Erreur inconnue : ${error.message}`);
    }
  }
};

// Fonction pour récupérer un projet par ID
export const obtenirProjetParId = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } // Authentification
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error(`Erreur lors de la récupération du projet avec ID ${id}:`, error.response.data);
      throw new Error(`Erreur serveur : ${error.response.status} - ${error.response.data}`);
    } else if (error.request) {
      console.error("Erreur réseau :", error.request);
      throw new Error("Erreur réseau : Impossible de joindre le serveur.");
    } else {
      console.error("Erreur inconnue :", error.message);
      throw new Error(`Erreur inconnue : ${error.message}`);
    }
  }
};

// Fonction pour créer un nouveau projet avec axios
export const creerProjet = async (projectData) => {
  try {
    const response = await axios.post('http://localhost:5000/api/projects', projectData);
    return { success: true, project: response.data };
  } catch (error) {
    console.error('Erreur API:', error);
    if (error.response) {
      // Si la réponse existe, renvoyer le message d'erreur
      return { success: false, error: error.response.data.message || 'Erreur inconnue' };
    } else if (error.request) {
      // Si aucune réponse n'a été reçue du serveur
      return { success: false, error: 'Aucune réponse du serveur' };
    } else {
      // Si une autre erreur est survenue
      return { success: false, error: error.message || 'Erreur inconnue' };
    }
  }
};
// Fonction pour mettre à jour un projet existant
export const mettreAJourProjet = async (id, projetData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${id}`, projetData, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } // Authentification
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error(`Erreur lors de la mise à jour du projet avec ID ${id}:`, error.response.data);
      throw new Error(`Erreur serveur : ${error.response.status} - ${error.response.data}`);
    } else if (error.request) {
      console.error("Erreur réseau lors de la mise à jour du projet :", error.request);
      throw new Error("Erreur réseau : Impossible de joindre le serveur.");
    } else {
      console.error("Erreur inconnue lors de la mise à jour du projet :", error.message);
      throw new Error(`Erreur inconnue : ${error.message}`);
    }
  }
};

// Fonction pour supprimer un projet
export const supprimerProjet = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    if (response.status === 200) {
      return true;  // Suppression réussie
    }
    return false;  // Suppression échouée (par exemple, projet non trouvé)
  } catch (error) {
    if (error.response) {
      // Erreur côté serveur
      console.error("Erreur serveur:", error.response.data);
    } else if (error.request) {
      // Erreur réseau (pas de réponse du serveur)
      console.error("Erreur réseau:", error.request);
    } else {
      // Erreur inconnue
      console.error("Erreur inconnue:", error.message);
    }
    return false;  // Retourne false en cas d'erreur
  }
};
