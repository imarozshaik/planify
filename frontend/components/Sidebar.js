import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Sidebar.css'; 

const Sidebar = () => {
  const navigate = useNavigate();

  const handleSignOut = (event) => {
    event.preventDefault();
    navigate('/');
  };

  return (
    <div className="sidebar-container">
      <div className="sidebar-content d-flex flex-column flex-shrink-0 p-3">
        <Link to="/main" className="sidebar-link d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
          <span className="sidebar-title fs-4">Get Started</span>
        </Link>
        <ul className="sidebar-nav nav nav-pills flex-column mb-auto">
          <li className="sidebar-nav-item my-3 fs-6my-3">
            <Link to="/projects" className="sidebar-nav-link nav-link link-body-emphasis projects">Projects
            </Link>
          </li>
          <li className="sidebar-nav-item fs-6">
            <Link to="/calendar" className="sidebar-nav-link nav-link link-body-emphasis calendar">Calendar
            </Link>
          </li>
          <li className="sidebar-nav-item my-4 fs-6">
            <Link to="/profile" className="sidebar-nav-link nav-link link-body-emphasis profile">Profile
            </Link>
          </li>
          <li className="sidebar-nav-item my-3 fs-6">
            <Link className="sidebar-nav-link nav-link link-body-emphasis signout" onClick={handleSignOut}>Sign Out
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
