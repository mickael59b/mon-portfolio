import React, { useState } from 'react';
import { creerProjet } from '../services/apiProjets';  // Assurez-vous que le chemin vers le fichier API est correct

const CreateProject = () => {
  const [projectData, setProjectData] = useState({
    title: '',  // Changement de 'name' à 'title'
    category: '',
    description: '',
    image: ''  // Facultatif, peut être inclus si l'image est envoyée
  });

  const handleChange = (e) => {
    setProjectData({
      ...projectData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await creerProjet(projectData);
    if (response.success) {
      alert('Projet créé avec succès !');
      setProjectData({ title: '', category: '', description: '', image: '' });  // Réinitialisation du formulaire
    } else {
      alert('Erreur lors de la création du projet : ' + response.error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Créer un Projet</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Nom du Projet</label>
          <input
            type="text"
            className="form-control"
            name="title"
            value={projectData.title}
            onChange={handleChange}
            placeholder="Nom du projet"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="category" className="form-label">Catégorie</label>
          <input
            type="text"
            className="form-control"
            name="category"
            value={projectData.category}
            onChange={handleChange}
            placeholder="Catégorie"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            className="form-control"
            name="description"
            value={projectData.description}
            onChange={handleChange}
            placeholder="Description"
            required
          ></textarea>
        </div>

        <div className="mb-3">
          <label htmlFor="image" className="form-label">Image (URL)</label>
          <input
            type="text"
            className="form-control"
            name="image"
            value={projectData.image}
            onChange={handleChange}
            placeholder="URL de l'image"
          />
        </div>

        <button type="submit" className="btn btn-primary">Créer le Projet</button>
      </form>
    </div>
  );
};

export default CreateProject;
