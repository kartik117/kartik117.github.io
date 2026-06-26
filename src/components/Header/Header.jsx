import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import './Header.css';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/portfolio', label: 'Work' },
  { to: '/contact', label: 'Contact' },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const { scrollY } = useScroll();
  // Header goes from fully transparent to frosted dark glass within first 80px
  const headerBg = useTransform(
    scrollY,
    [0, 80],
    ['rgba(0, 0, 0, 0)', 'rgba(22, 22, 23, 0.72)']
  );
  const headerBorder = useTransform(
    scrollY,
    [0, 80],
    ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.08)']
  );

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll while mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const isActive = (to) =>
    to === '/' ? location.pathname === '/' : location.pathname.startsWith(to);

  return (
    <>
      <motion.header
        className="apple-header"
        style={{
          backgroundColor: headerBg,
          borderBottomColor: headerBorder,
        }}
      >
        <div className="apple-header-inner">
          <Link to="/" className="apple-header-logo" aria-label="Home">
            KB
          </Link>

          <nav className="apple-header-nav" aria-label="Primary">
            {NAV_LINKS.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`apple-header-link${isActive(to) ? ' active' : ''}`}
              >
                {label}
              </Link>
            ))}
            <a
              href="/Resume_Kartik_Bamble.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="apple-header-resume"
            >
              Resume
            </a>
          </nav>

          <button
            className={`apple-header-toggle${menuOpen ? ' open' : ''}`}
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </motion.header>

      {/* Mobile slide-down menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="apple-header-mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <nav>
              {NAV_LINKS.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className={`apple-header-mobile-link${
                    isActive(to) ? ' active' : ''
                  }`}
                >
                  {label}
                </Link>
              ))}
              <a
                href="/Resume_Kartik_Bamble.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="apple-header-mobile-link apple-header-mobile-resume"
              >
                Resume
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
