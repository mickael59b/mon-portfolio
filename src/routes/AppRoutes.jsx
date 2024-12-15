<<<<<<< HEAD
import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Pas besoin de BrowserRouter ici
=======
// src/AppRoutes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
>>>>>>> 985ed9990ff16ed45eafce5745f39d8010d1c359
import Home from '../pages/Home';
import About from '../pages/About';
import Projects from '../pages/Projects';
import ProjectDetails from '../pages/ProjectDetails';
import Contact from '../pages/Contact';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import Settings from '../pages/Settings'; // Nouvelle page Settings
import ProjectManagement from '../pages/ProjectManagement';  // Page de gestion des projets
import ProjectCreate from '../pages/CreateProject'; // Page de création de projets
import PrivateRoute from './PrivateRoute';  // Protection des routes privées
import AdminRoute from './AdminRoute';  // Protection des routes administrateurs

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/projects/:id" element={<ProjectDetails />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Route protégée pour le tableau de bord, accessible uniquement pour les utilisateurs authentifiés */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />

      {/* Route protégée pour les paramètres client */}
      <Route
        path="/dashboard/settings"
        element={
          <PrivateRoute>
            <Settings />
          </PrivateRoute>
        }
      />

      {/* Route protégée pour la gestion des projets, accessible uniquement pour les administrateurs */}
      <Route
        path="/dashboard/projets"
        element={
<<<<<<< HEAD
          <AdminRoute>
            <ProjectManagement />  {/* Page de gestion des projets */}
          </AdminRoute>
=======
            <AdminRoute>
              <ProjectManagement />  {/* Page de gestion des projets */}
            </AdminRoute>
>>>>>>> 985ed9990ff16ed45eafce5745f39d8010d1c359
        }
      />
      <Route path="/dashboard/projet/new" element={
        <AdminRoute>
          <ProjectCreate />
        </AdminRoute>
      }
      />
    </Routes>
  );
};

export default AppRoutes;
