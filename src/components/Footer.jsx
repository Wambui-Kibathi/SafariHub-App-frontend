import React from "react";
import { FaMapMarkerAlt, FaInfoCircle, FaPhone, FaEnvelope, FaHeart } from "react-icons/fa";

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
            <li><a href="/destinations"><FaMapMarkerAlt className="icon-small" />Destinations</a></li>
            <li><a href="/about"><FaInfoCircle className="icon-small" />About Us</a></li>
            <li><a href="/contact"><FaPhone className="icon-small" />Contact</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Contact Info</h4>
          <p><FaEnvelope className="icon-small" />Email: info@safarihub.com</p>
          <p><FaPhone className="icon-small" />Phone: +254 123 456 789</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 SafariHub. All rights reserved. Made with <FaHeart className="icon-small" /> for safari lovers.</p>
      </div>
    </footer>
  );
};

export default Footer;