import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import './Header.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const { scrollY } = useScroll();
  const headerBg = useTransform(scrollY, [0, 80], ['rgba(250,250,250,0)', 'rgba(250,250,250,0.92)']);
  const headerBorder = useTransform(scrollY, [0, 80], ['rgba(17,19,26,0)', 'rgba(17,19,26,0.08)']);

  const toggleMenu = () => setMenuOpen((open) => !open);
  const closeMenu = () => setMenuOpen(false);

  const links = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/portfolio', label: 'Portfolio' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <motion.header
      className="header"
      style={{ backgroundColor: headerBg, borderBottomColor: headerBorder }}
    >
      <div className="logo">
        <Link to="/" onClick={closeMenu}>KB</Link>
      </div>
      <div className="menu-toggle" onClick={toggleMenu}>
        <div className={menuOpen ? 'hamburger open' : 'hamburger'}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <nav className={menuOpen ? 'nav-links open' : 'nav-links'}>
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={location.pathname === link.to ? 'active' : ''}
            onClick={closeMenu}
          >
            {link.label}
          </Link>
        ))}
        <a
          href="/Resume_Kartik_Bamble.pdf"
          className="resume-link"
          target="_blank"
          rel="noopener noreferrer"
          onClick={closeMenu}
        >
          Resume
        </a>
      </nav>
    </motion.header>
  );
};

export default Header;
