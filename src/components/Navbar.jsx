import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => (
  <nav className="site-navbar" id="site-navbar">
    <div className="navbar-inner">
      <NavLink to="/" className="navbar-brand">
        <i className="fas fa-file-alt"></i>
        <span>Resume Studio</span>
      </NavLink>

      <div className="navbar-links">
        <NavLink
          to="/"
          end
          className={({ isActive }) => `navbar-link${isActive ? ' active' : ''}`}
        >
          <i className="fas fa-eye"></i>
          Visual Resume
        </NavLink>
        <NavLink
          to="/v2"
          className={({ isActive }) => `navbar-link${isActive ? ' active' : ''}`}
        >
          <i className="fas fa-star"></i>
          Resume V2
        </NavLink>
        <NavLink
          to="/tobin"
          className={({ isActive }) => `navbar-link${isActive ? ' active' : ''}`}
        >
          <i className="fas fa-user"></i>
          Tobin Tom
        </NavLink>
        <NavLink
          to="/latex"
          className={({ isActive }) => `navbar-link${isActive ? ' active' : ''}`}
        >
          <i className="fas fa-code"></i>
          LaTeX Editor
        </NavLink>
      </div>
    </div>
  </nav>
);

export default Navbar;
