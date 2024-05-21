import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, NavLink } from 'react-router-dom';
import Departments from './masters/Departments';
import Courses from './masters/Courses';
import './App.css';

function App() {
  return (
      <Router>
        <div className="app">
          <header className="header">
            <h1>Dashboard</h1>
          </header>
          <div className="main">
            <aside className="sidebar">
              <nav>
                <ul>
                  <li>
                    <NavLink
                        to="/departments"
                        className={({ isActive }) => isActive ? 'active' : ''}
                    >
                      Departments and Employees
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                        to="/courses"
                        className={({ isActive }) => isActive ? 'active' : ''}
                    >
                      Courses and Students
                    </NavLink>
                  </li>
                </ul>
              </nav>
            </aside>
            <div className="content">
              <Routes>
                <Route path="/" element={<Navigate to="/departments" />} />
                <Route path="/departments" element={<Departments />} />
                <Route path="/courses" element={<Courses />} />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
  );
}

export default App;
