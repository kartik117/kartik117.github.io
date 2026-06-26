import { FaGithub, FaEnvelope } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-social">
          <a href="https://github.com/kartik117" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <FaGithub />
          </a>
          <a href="mailto:kartikbamble117@gmail.com" aria-label="Email">
            <FaEnvelope />
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Kartik Bamble. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
