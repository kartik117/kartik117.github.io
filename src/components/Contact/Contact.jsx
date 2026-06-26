import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import './Contact.css';

const Contact = () => {
  return (
    <motion.div
      className="contact-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="page-header">
        <span className="section-tag">CONTACT</span>
        <h2 className="page-heading">Let's work together.</h2>
        <p className="contact-intro">
          Open to roles, collaborations, or just a good conversation about software,
          data, and what's next. The fastest path is email.
        </p>
      </div>

      <motion.a
        href="mailto:kartikbamble117@gmail.com"
        className="contact-cta"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        kartikbamble117@gmail.com ↗
      </motion.a>

      <motion.div
        className="contact-tiles"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="contact-tile">
          <FaEnvelope className="contact-tile-icon" />
          <div>
            <span className="contact-tile-label">Email</span>
            <span className="contact-tile-value">kartikbamble117@gmail.com</span>
          </div>
        </div>
        <div className="contact-tile">
          <FaPhone className="contact-tile-icon" />
          <div>
            <span className="contact-tile-label">Phone</span>
            <span className="contact-tile-value">+1 (315) 374-0583</span>
          </div>
        </div>
        <div className="contact-tile">
          <FaMapMarkerAlt className="contact-tile-icon" />
          <div>
            <span className="contact-tile-label">Location</span>
            <span className="contact-tile-value">Redmond, WA</span>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="find-elsewhere"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <span className="section-tag">FIND ME ELSEWHERE</span>
        <div className="social-links">
          <a href="https://github.com/kartik117" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="GitHub">
            <FaGithub />
          </a>
          <a href="https://www.linkedin.com/in/kartik-bamble-721a00234/" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
            <FaLinkedin />
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Contact;
