// Navbar Component
import React, { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../features/auth/context/AuthContext';
import './Navbar.css';

const Navbar: React.FC = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    auth?.logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          🏥 Baby Care Management
        </Link>
        {auth?.isAuthenticated ? (
          <div className="navbar-menu">
            <NavLink
              to="/babies/getall"
              className={({ isActive }) => isActive || window.location.pathname.startsWith('/babies/') ? 'nav-link active' : 'nav-link'}
            >
              Babies
            </NavLink>
            <NavLink
              to="/nurses/getall"
              className={({ isActive }) => isActive || window.location.pathname.startsWith('/nurses/') ? 'nav-link active' : 'nav-link'}
            >
              Nurses
            </NavLink>
            <NavLink
              to="/turns/getall"
              className={({ isActive }) => isActive || window.location.pathname.startsWith('/turns/') ? 'nav-link active' : 'nav-link'}
            >
              Turns
            </NavLink>
            <button onClick={handleLogout} className="nav-logout">
              Logout
            </button>
          </div>
        ) : (
          <div className="navbar-menu">
            <NavLink to="/login" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Login</NavLink>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
