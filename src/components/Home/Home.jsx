import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { featuredProjects } from '../../data/projects';
import './Home.css';

const AnimatedCounter = ({ end, duration = 1.6, suffix = '', prefix = '', decimals = 0 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!isInView) return;
    let startTime;
    let frame;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = (timestamp - startTime) / (duration * 1000);
      if (progress < 1) {
        const value = end * progress;
        setCount(decimals > 0 ? value.toFixed(decimals) : Math.floor(value));
        frame = requestAnimationFrame(animate);
      } else {
        setCount(decimals > 0 ? end.toFixed(decimals) : end);
      }
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [isInView, end, duration, decimals]);

  return <span ref={ref}>{prefix}{count}{suffix}</span>;
};

const impactStats = [
  { end: 40, suffix: '%', label: 'Search Latency Cut', description: 'IIS → Lambda + OpenSearch migration' },
  { end: 1.2, suffix: 'M', prefix: '$', label: 'Annual Savings', description: 'ETL pipeline to S3 Glacier Deep Archive', decimals: 1 },
  { end: 90, suffix: '%+', label: 'Test Coverage', description: 'pytest + moto on AWS Lambda pipelines' },
  { end: featuredProjects.length, suffix: '', label: 'Projects Shipped', description: 'Built and verified end-to-end, not just unit-tested' },
];

const Home = () => {
  return (
    <div className="home-container">
      <div className="gradient-mesh" aria-hidden="true" />

      <section className="hero-section">
        <div className="hero-columns">
          <motion.div
            className="hero-left"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="hero-eyebrow">Software Engineer · Full-Stack &amp; Cloud Systems</span>
            <div className="hero-name">
              <span className="hero-name-line">KARTIK</span>
              <span className="hero-name-line">BAMBLE</span>
            </div>
          </motion.div>

          <motion.div
            className="hero-right"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h1 className="hero-display">
              Building<br />
              <span className="hero-display-accent">Production-Grade</span><br />
              Software Systems
            </h1>
            <p className="hero-sub">
              Full-stack engineer with experience shipping scalable Java/Spring Boot and
              serverless AWS systems, plus a growing line of self-built AI agent, data
              engineering, and dev-tooling projects — each one verified end-to-end, not
              just unit-tested.
            </p>
          </motion.div>
        </div>

        <motion.div
          className="cta-buttons"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Link to="/portfolio" className="primary-btn">View My Work</Link>
          <Link to="/contact" className="secondary-btn">Get In Touch</Link>
        </motion.div>
      </section>

      <motion.section
        className="impact-section"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7 }}
      >
        <div className="section-header-split">
          <div>
            <span className="section-tag">IMPACT</span>
            <h3 className="section-heading-main">By the Numbers</h3>
          </div>
        </div>

        <div className="impact-grid">
          {impactStats.map((stat) => (
            <div className="impact-card" key={stat.label}>
              <div className="impact-number">
                <AnimatedCounter end={stat.end} suffix={stat.suffix} prefix={stat.prefix || ''} decimals={stat.decimals || 0} />
              </div>
              <div className="impact-label">{stat.label}</div>
              <div className="impact-description">{stat.description}</div>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section
        className="featured-section"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.7 }}
      >
        <div className="section-header-split">
          <div>
            <span className="section-tag">WORK</span>
            <h3 className="section-heading-main">Featured Projects</h3>
          </div>
          <Link to="/portfolio" className="view-all-link">View all →</Link>
        </div>

        <div className="featured-projects">
          {featuredProjects.map((project) => (
            <div className="project-card" key={project.id}>
              <div className="project-card-body">
                <h4>{project.title}</h4>
                <p>{project.description}</p>
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link">
                  View on GitHub →
                </a>
              </div>
            </div>
          ))}
        </div>
      </motion.section>
    </div>
  );
};

export default Home;
