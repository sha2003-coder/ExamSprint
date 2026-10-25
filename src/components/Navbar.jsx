import React from 'react';

export default function Navbar() {
  return (
    <header className="app-header">
      <div className="brand-title">
        <span className="brand-icon">⚡</span>
        <div>
          <h1 className="brand-name">ExamSprint</h1>
          <p className="brand-tagline">Smart Study Revision Planner for University Students</p>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div className="header-badge">
          Sprint Study Engine
        </div>
      </div>
    </header>
  );
}
