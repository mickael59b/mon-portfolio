import React from "react";
import { Link } from "react-router-dom"; // Pour la navigation vers les détails du projet

// Composant pour afficher chaque projet dans la liste
const ProjectItem = ({ project }) => (
  <div className={`col-lg-4 col-md-6 projects-item isotope-item ${project.category}`}>
    <div className="projects-content h-100">
      <img
        src={project.image}
        className="img-fluid"
        alt={`Aperçu du projet ${project.title}`}
      />
      <div className="projects-info">
        {/* Le titre du projet est maintenant un lien */}
        <h4>
          <Link
            to={`/projects/${project._id}`} // Redirection vers la page de détails du projet avec l'ID
            title={`Voir les détails du projet ${project.title}`}
            className="project-title"
            aria-label={`Plus de détails sur ${project.title}`}
          >
            {project.title}
          </Link>
        </h4>
        <p>{project.description}</p>
      </div>
    </div>
  </div>
);

export default ProjectItem;
