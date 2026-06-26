import { motion } from 'framer-motion';
import { FaGithub, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
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
        <h2 className="page-heading">Get In Touch</h2>
      </div>

      <motion.div
        className="contact-content-centered"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="contact-info">
          <h3>Let's Talk</h3>
          <p>Reach out if you're hiring, have a question about one of these projects, or just want to connect.</p>

          <div className="contact-details">
            <div className="contact-item">
              <FaEnvelope className="contact-icon" />
              <a href="mailto:kartikbamble117@gmail.com">kartikbamble117@gmail.com</a>
            </div>
            <div className="contact-item">
              <FaMapMarkerAlt className="contact-icon" />
              <span>Redmond, WA</span>
            </div>
          </div>

          <div className="social-links">
            <a href="https://github.com/kartik117" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="GitHub">
              <FaGithub />
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Contact;
