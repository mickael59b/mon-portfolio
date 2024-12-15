import axios from "axios";

// Définition de l'URL de base de l'API
const API_BASE_URL = "http://localhost:5000/api/projects"; // URL des projets

// Fonction de gestion des erreurs pour centraliser le traitement
const handleError = (error) => {
  if (error.response) {
    console.error("Erreur serveur :", error.response.data);
    return { success: false, error: error.response.data.message || 'Erreur serveur' };
  } else if (error.request) {
    console.error("Erreur réseau :", error.request);
    return { success: false, error: 'Erreur réseau : Impossible de joindre le serveur.' };
  } else {
    console.error("Erreur inconnue :", error.message);
    return { success: false, error: error.message || 'Erreur inconnue' };
  }
};

// Fonction pour récupérer tous les projets
export const obtenirTousLesProjets = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    console.log("Données récupérées :", response.data);
    return response.data; // Retourne les données des projets
  } catch (error) {
    return handleError(error);
  }
};

// Fonction pour récupérer un projet par ID
export const obtenirProjetParId = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

// Fonction pour créer un nouveau projet avec axios
export const creerProjet = async (projectData) => {
  try {
    const response = await axios.post(API_BASE_URL, projectData);
    return { success: true, project: response.data };
  } catch (error) {
    return handleError(error);
  }
};

// Fonction pour mettre à jour un projet existant
export const mettreAJourProjet = async (id, projetData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${id}`, projetData);
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

// Fonction pour supprimer un projet
export const supprimerProjet = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${id}`);
    if (response.status === 200) {
      return true;  // Suppression réussie
    }
    return false;  // Suppression échouée (par exemple, projet non trouvé)
  } catch (error) {
    return handleError(error);
  }
};
