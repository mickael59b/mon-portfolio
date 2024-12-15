import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
    };
    fetchProjects();
  }, []);

  // Supprimer un projet
  const handleDeleteProject = async () => {
    if (!projectToDelete) return;

    try {
      const success = await supprimerProjet(projectToDelete._id);
      if (success) {
        setProjects((prevProjects) => prevProjects.filter((project) => project._id !== projectToDelete._id));
        setProjectToDelete(null); // Réinitialiser le projet à supprimer après confirmation
      }
    } catch (error) {
      console.error('Erreur lors de la suppression du projet:', error);
      setError('Erreur lors de la suppression du projet.');
    }
  };

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