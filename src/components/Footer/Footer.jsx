import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="apple-footer">
      <div className="apple-footer-inner">
        <div className="apple-footer-row">
          <div className="apple-footer-copy">
            &copy; {new Date().getFullYear()} Kartik Bamble. All rights reserved.
          </div>
          <div className="apple-footer-socials">
            <a
              href="https://github.com/kartik117"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <FaGithub />
            </a>
            <a
              href="https://linkedin.com/in/kartik-bamble-721a00234/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
