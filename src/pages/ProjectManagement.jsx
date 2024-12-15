import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { obtenirTousLesProjets, supprimerProjet } from '../services/apiProjets';  // Importation des fonctions API

const ProjectManagement = () => {
  const [projects, setProjects] = useState([]);  // Initialisation de projects comme tableau vide
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('All');  // Filtre par statut
  const navigate = useNavigate();  // Initialisation du hook useNavigate pour la redirection

  useEffect(() => {
    const fetchProjects = async () => {
        try {
          const data = await obtenirTousLesProjets();
          
          if (Array.isArray(data.projects)) {
            setProjects(data.projects);  // Utilisez data.projects pour accéder au tableau
          } else {
            setError('Les données récupérées ne contiennent pas de projet');
          }
        } catch (error) {
          setError('Erreur lors de la récupération des projets.');
        }
    };
    fetchProjects();
  }, []);

  const handleDeleteProject = async (id) => {
    try {
      const confirmation = window.confirm('Êtes-vous sûr de vouloir supprimer ce projet ?');
      if (!confirmation) return;
  
      const success = await supprimerProjet(id);
  
      if (success) {
        // Mettre à jour l'état des projets pour retirer celui qui a été supprimé
        setProjects(projects.filter(project => project._id !== id));
      }
    } catch (error) {
      console.error('Erreur lors de la suppression du projet:', error);
      setError('Erreur lors de la suppression du projet.');
    }
  };

  // Fonction pour rediriger vers la page de création de projet
  const handleCreateProject = () => {
    navigate('/dashboard/projet/new');  // Redirige vers la page de création
  };

  // Filtrer les projets en fonction du filtre sélectionné
  const filteredProjects = projects.filter(project => {
    if (filter === 'All') return true;
    return project.status === filter;  // Filtrer par statut (Started, Completed, etc.)
  });

  return (
    <>
      {/* Section avant la container */}
      <section id="list_projet" className="py-5 bg-dark text-white">
        <div className="container">
          <h1 className="display-4 text-center mb-4">Nos Projets</h1>
          <p className="lead text-center">Découvrez nos projets récents. Vous pouvez les gérer directement ci-dessous.</p>
        </div>
      </section>

      {/* Section principale de la gestion des projets */}
      <div className="container my-5">
        <h1 className="mb-4">Gestion des Projets</h1>

        {error && <div className="alert alert-danger">{error}</div>}

        {/* Filtre des projets */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <button
            className="btn btn-primary"
            onClick={handleCreateProject}  // Lorsque cliqué, il redirige vers la page de création
          >
            <i className="fas fa-plus-circle me-2"></i>Créer un Projet
          </button>
          
          {/* Dropdown pour filtrer les projets */}
          <select
            className="form-select w-auto"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}  // Met à jour le filtre
          >
            <option value="All">Tous les Projets</option>
            <option value="Started">En Cours</option>
            <option value="Completed">Terminé</option>
            <option value="Approval">En Attente</option>
          </select>
        </div>

        <div className="card">
          <div className="card-body">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Nom du Projet</th>
                  <th scope="col">Progression</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProjects.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center">Aucun projet trouvé.</td>
                  </tr>
                ) : (
                  filteredProjects.map((project) => (
                    <tr key={project._id}>
                      <td>{project._id}</td>
                      <td>{project.title}</td>
                      <td>
                        {/* Barre de progression */}
                        <div className="progress" style={{ height: '8px' }}>
                          <div
                            role="progressbar"
                            className="progress-bar"
                            aria-valuenow={project.progressPercentage || 0}
                            aria-valuemin="0"
                            aria-valuemax="100"
                            style={{ width: `${project.progressPercentage || 0}%` }}
                          ></div>
                        </div>
                      </td>
                      <td>
                        <button
                          className="btn btn-warning"
                          onClick={() => console.log(`Modifier le projet ${project._id}`)}
                        >
                          Modifier
                        </button>
                        <button
                          className="btn btn-danger ms-2"
                          onClick={() => handleDeleteProject(project._id)}
                        >
                          Supprimer
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectManagement;
