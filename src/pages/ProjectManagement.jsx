import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
<<<<<<< HEAD
import { obtenirTousLesProjets, supprimerProjet } from '../services/apiProjets';

const ProjectManagement = () => {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [projectsPerPage] = useState(6); // Nombre de projets par page
  const [viewMode, setViewMode] = useState('grid'); // Mode de vue: 'grid' ou 'list'
  const [projectToDelete, setProjectToDelete] = useState(null); // Projet à supprimer
  const navigate = useNavigate();

  // Charger les projets depuis l'API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await obtenirTousLesProjets();
        if (data && Array.isArray(data.projects)) {
          setProjects(data.projects);
        } else {
          setError('Les données récupérées ne contiennent pas de projets.');
        }
      } catch (error) {
        setError('Erreur lors de la récupération des projets.');
        console.error(error);
      }
=======
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
>>>>>>> 985ed9990ff16ed45eafce5745f39d8010d1c359
    };
    fetchProjects();
  }, []);

<<<<<<< HEAD
  // Supprimer un projet
  const handleDeleteProject = async () => {
    if (!projectToDelete) return;

    try {
      const success = await supprimerProjet(projectToDelete._id);
      if (success) {
        setProjects((prevProjects) => prevProjects.filter((project) => project._id !== projectToDelete._id));
        setProjectToDelete(null); // Réinitialiser le projet à supprimer après confirmation
=======
  const handleDeleteProject = async (id) => {
    try {
      const confirmation = window.confirm('Êtes-vous sûr de vouloir supprimer ce projet ?');
      if (!confirmation) return;
  
      const success = await supprimerProjet(id);
  
      if (success) {
        // Mettre à jour l'état des projets pour retirer celui qui a été supprimé
        setProjects(projects.filter(project => project._id !== id));
>>>>>>> 985ed9990ff16ed45eafce5745f39d8010d1c359
      }
    } catch (error) {
      console.error('Erreur lors de la suppression du projet:', error);
      setError('Erreur lors de la suppression du projet.');
    }
  };

<<<<<<< HEAD
  // Créer un projet
  const handleCreateProject = () => {
    navigate('/dashboard/projet/new');
  };

  // Filtrer les projets par statut
  const filteredProjects = projects.filter((project) => {
    if (filter === 'All') return true;
    return project.status === filter;
  });

  // Pagination
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container my-5">
      {/* En-tête */}
      <div className="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
        <div className="my-auto mb-2">
          <h2 className="mb-1">Projects</h2>
          <nav>
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item">
                <a href="/react/template/index" data-discover="true">
                  <i className="fa fa-home"></i>
                </a>
              </li>
              <li className="breadcrumb-item">Employee</li>
              <li className="breadcrumb-item active" aria-current="page">
                Projects Grid
              </li>
            </ol>
          </nav>
        </div>
        <div className="d-flex my-xl-auto right-content align-items-center flex-wrap">
          <div className="me-2 mb-2">
            <div className="d-flex align-items-center border bg-white rounded p-1 me-2 icon-list">
              {/* Boutons pour basculer entre la grille et la liste */}
              <button
                className={`btn btn-icon btn-sm me-1 ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
              >
                <i className="fa fa-list"></i>
              </button>
              <button
                className={`btn btn-icon btn-sm ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
              >
                <i className="fa fa-th"></i>
              </button>
            </div>
          </div>
          <div className="mb-2">
            <button
              onClick={handleCreateProject}
              className="btn btn-primary d-flex align-items-center"
            >
              <i className="fa fa-plus-circle me-2"></i>Add Project
            </button>
          </div>
        </div>
      </div>

      {/* Affichage des projets (Grille ou Liste) */}
      <div className="row">
        {currentProjects.map((project) => (
          <div
            className={`col-xxl-3 col-lg-4 col-md-6 ${viewMode === 'list' ? 'w-100 mb-3' : ''}`}
            key={project._id}
          >
            <div className="card">
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <h6>
                    <a href={`/react/template/projects-details/${project._id}`} data-discover="true">
                      {project.title || 'Titre indisponible'}
                    </a>
                  </h6>
                  <div className="dropdown">
                    <a
                      className="d-inline-flex align-items-center"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      href="/react/template/projects-grid"
                      data-discover="true"
                    >
                      <i className="fa fa-ellipsis-v"></i>
                    </a>
                    <ul className="dropdown-menu dropdown-menu-end p-3">
                      <li>
                        <a
                          className="dropdown-item rounded-1"
                          data-bs-toggle="modal"
                          data-bs-target="#edit_project"
                          href="/react/template/projects-grid"
                          data-discover="true"
                        >
                          <i className="fa fa-edit me-2"></i>Edit
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item rounded-1"
                          data-bs-toggle="modal"
                          data-bs-target="#delete_modal"
                          href="/react/template/projects-grid"
                          data-discover="true"
                          onClick={() => setProjectToDelete(project)}
                        >
                          <i className="fa fa-trash me-1"></i>Delete
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="mb-3 pb-3 border-bottom">
                  <p className="text-truncate line-clamb-3 mb-0">
                    {project.description || 'Description indisponible'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <nav>
        <ul className="pagination">
          {Array.from({ length: Math.ceil(filteredProjects.length / projectsPerPage) }, (_, index) => (
            <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
              <button className="page-link" onClick={() => paginate(index + 1)}>
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Modal de confirmation de suppression */}
      <div className="modal fade" id="delete_modal" tabIndex="-1" aria-labelledby="delete_modal_label" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body text-center">
              <span className="avatar avatar-xl bg-transparent-danger text-danger mb-3">
                <i className="fa fa-trash fs-36"></i>  {/* Utilisation de l'icône FontAwesome */}
              </span>
              <h4 className="mb-1">Confirm Delete</h4>
              <p className="mb-3">You want to delete this project, this can't be undone once you delete.</p>
              <div className="d-flex justify-content-center">
                <button className="btn btn-light me-3" data-bs-dismiss="modal">
                  Cancel
                </button>
                <button
                  className="btn btn-danger"
                  onClick={handleDeleteProject}
                  data-bs-dismiss="modal"
                >
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gestion des erreurs */}
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default ProjectManagement;
=======
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
>>>>>>> 985ed9990ff16ed45eafce5745f39d8010d1c359
