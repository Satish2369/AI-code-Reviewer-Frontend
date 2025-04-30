import React from 'react'
import '../App.css'

const Footer = () => {


  return (
    <div>
              {/* Footer */}
      <footer className="app-footer">
        <div className="footer-content">
          <div className="footer-brand">
          <div className="logo-container">
          <div className="logo-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2"/>
              <path d="M8 16L12 12L8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M12 16L16 12L12 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <h1 className="logo-text">Code<span className="logo-highlight">Craft</span> AI</h1>
        </div>
         
            <p>Intelligent code analysis and review</p>
          </div>
          <div className="footer-links">
            <a href="#">Instagram</a>
            <a href="#">LinkedIn</a>
            <a href="#">GitHub</a>
          </div>
        </div>
        <div className="footer-copyright">
          © {new Date().getFullYear()} CodeCraft AI. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

export default Footer
