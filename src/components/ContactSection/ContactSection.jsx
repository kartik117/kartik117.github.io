import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { FiMapPin, FiArrowUpRight } from 'react-icons/fi';
import './ContactSection.css';

const APPLE_EASE = [0.25, 0.46, 0.45, 0.94];

const SOCIALS = [
  {
    href: 'https://github.com/kartik117',
    label: 'GitHub',
    Icon: FaGithub,
  },
  {
    href: 'https://linkedin.com/in/kartik-bamble-721a00234/',
    label: 'LinkedIn',
    Icon: FaLinkedin,
  },
];

const ContactSection = () => {
  return (
    <section className="apple-contact">
      {/* Ambient stage glow behind the content */}
      <div className="apple-contact-glow" aria-hidden="true" />

      <div className="apple-contact-inner">
        <motion.span
          className="apple-eyebrow"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: APPLE_EASE }}
        >
          Contact
        </motion.span>

        <motion.h2
          className="apple-contact-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1, delay: 0.1, ease: APPLE_EASE }}
        >
          Let's work{' '}
          <span className="apple-title-muted">together.</span>
        </motion.h2>

        <motion.p
          className="apple-contact-subtitle"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.9, delay: 0.25, ease: APPLE_EASE }}
        >
          Open to Software Engineer and AI/GenAI Engineer roles,
          collaborations, or just a good conversation about distributed systems
          and production AI.
        </motion.p>

        <motion.a
          href="mailto:kartikbamble117@gmail.com"
          className="apple-contact-email-cta"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.9, delay: 0.4, ease: APPLE_EASE }}
        >
          <span>kartikbamble117@gmail.com</span>
          <FiArrowUpRight size={18} />
        </motion.a>

        <motion.div
          className="apple-contact-socials"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.9, delay: 0.55, ease: APPLE_EASE }}
        >
          {SOCIALS.map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="apple-social-btn"
              aria-label={label}
            >
              <Icon size={20} />
            </a>
          ))}
        </motion.div>

        <motion.div
          className="apple-contact-location"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.9, delay: 0.7, ease: APPLE_EASE }}
        >
          <FiMapPin size={13} />
          <span>Based in Redmond, Washington</span>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
