import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const footerStyle = {
    background: "#3498db", // Change the background color
    color: "#fff",
    padding: "10px 0",
  };

  const linkStyle = {
    color: "#fff",
    textDecoration: "none",
    margin: "0 15px",
  };

  return (
    <footer style={footerStyle} className="text-center">
      <div className="container">
        <p>&copy; Hexabells</p>
        <p>
          <Link to="/about" style={linkStyle}>About</Link>
          <Link to="/contact" style={linkStyle}>Contact</Link>
          <Link to="/policy" style={linkStyle}>Privacy Policy</Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
