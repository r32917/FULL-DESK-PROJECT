// Sidebar Component
import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar: React.FC = () => {
  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <NavLink to="/babies/getall" className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}>
          👶 View All Babies
        </NavLink>
        <NavLink to="/babies/create" className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}>
          ➕ Add Baby
        </NavLink>
        <hr />
        <NavLink to="/nurses/getall" className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}>
          👩‍⚕️ View All Nurses
        </NavLink>
        <NavLink to="/nurses/create" className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}>
          ➕ Add Nurse
        </NavLink>
        <hr />
        <NavLink to="/turns/getall" className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}>
          📅 View All Turns
        </NavLink>
        <NavLink to="/turns/create" className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}>
          ➕ Add Turn
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
