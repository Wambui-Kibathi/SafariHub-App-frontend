import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>SafariHub</h3>
          <p>Your gateway to unforgettable safari adventures</p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/destinations">Destinations</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Contact Info</h4>
          <p>Email: info@safarihub.com</p>
          <p>Phone: +254 123 456 789</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 SafariHub. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;