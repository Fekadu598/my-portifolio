import React from 'react';
export default function Footer({ profile }) {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-left">
          <span className="footer-copy">&copy; {new Date().getFullYear()} {profile?.name || 'Fekadu'}. All rights reserved.</span>
          <span className="footer-tagline">Crafted with <span>precision</span> & passion</span>
        </div>
        <span className="footer-brand">fekadu.</span>
        <div className="footer-links">
          <a href="http://localhost:3001" target="_blank" rel="noreferrer">Admin</a>
        </div>
      </div>
    </footer>
  );
}
