import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './Projects.css';
import { blue } from '@mui/material/colors';

const ProjectsPage = () => {
  const [projects, setProjects] = useState([
    { id: uuidv4(), name: 'Project 1', description: 'Description for Project 1' },
  ]);

  const handleAddProject = newProject => {
    setProjects([...projects, { id: uuidv4(), ...newProject }]);
  };

  const handleUpdateProject = updatedProject => {
    setProjects(
      projects.map(project =>
        project.id === updatedProject.id ? { ...project, ...updatedProject } : project
      )
    );
  };

  const handleDeleteProject = projectId => {
    setProjects(projects.filter(project => project.id !== projectId));
  };

  const ProjectForm = ({ initialData, onSubmit }) => {
    const [formData, setFormData] = useState(initialData || { name: '', description: '' });

    const handleChange = e => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = e => {
      e.preventDefault();
      onSubmit(formData);
      setFormData({ name: '', description: '' });
    };

    return (
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Project Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="project-input"
        />
        <textarea
          name="description"
          placeholder="Project Description"
          value={formData.description}
          onChange={handleChange}
          required
          className="project-input"
        />
        <button type="submit" className="submit-button">Submit</button>
      </form>
    );
  };

  const DeleteConfirmation = ({ onDelete }) => {
    const handleDelete = () => {
      if (window.confirm('Are you sure you want to delete this project?')) {
        onDelete();
      }
    };

    return <button onClick={handleDelete} className="delete-button mx-3" style={{ borderRadius: '4px' }}>Delete</button>;
  };

  const ProjectItem = ({ project, onDelete, onUpdate }) => {
    const [editing, setEditing] = useState(false);

    const handleEdit = () => {
      setEditing(true);
    };

    const handleUpdate = updatedProject => {
      onUpdate(updatedProject);
      setEditing(false);
    };

    return (
      <div className="project-item">
        {editing ? (
          <ProjectForm initialData={project} onSubmit={handleUpdate} />
        ) : (
          <>
            <div className="project-name">{project.name}</div>
            <div className="project-description">{project.description}</div>
            <div className="button-container">
              <button onClick={handleEdit} className="edit-button mx-3" style={{ borderRadius: '4px' }}>Edit</button>
              <DeleteConfirmation onDelete={() => onDelete(project.id)} />
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <div className='projects-page'>
      <h2 style={{ marginTop: '20px', color:'black' }}>Add Project</h2>
      <ProjectForm onSubmit={handleAddProject} />
      <div className='project-list'>
        {projects.map(project => (
          <ProjectItem 
            key={project.id}
            project={project}
            onDelete={handleDeleteProject}
            onUpdate={handleUpdateProject}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage;
