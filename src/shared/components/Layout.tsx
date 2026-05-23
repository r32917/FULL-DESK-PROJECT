// Layout Component
import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Chatbot from '../../Chatbot';
import './Layout.css';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="layout">
      <Navbar />
      <div className="layout-container">
        <Sidebar />
        <main className="main-content">
          {children}
        </main>
      </div>
      <Chatbot />
    </div>
  );
};

export default Layout;
