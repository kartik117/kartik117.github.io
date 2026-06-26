import { useState } from 'react';
import { motion } from 'framer-motion';
import { projects } from '../../data/projects';
import './Portfolio.css';

const filters = [
  { key: 'all', label: 'All' },
  { key: 'ai', label: 'AI / Agents' },
  { key: 'data', label: 'Data Engineering' },
  { key: 'devtools', label: 'Dev Tooling' },
  { key: 'infra', label: 'Infra' },
];

const statusLabel = {
  'in-progress': 'In Progress',
  planned: 'Up Next',
};

const Portfolio = () => {
  const [filter, setFilter] = useState('all');

  const filteredProjects =
    filter === 'all' ? projects : projects.filter((p) => p.categories.includes(filter));

  return (
    <motion.div
      className="portfolio-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="page-header">
        <span className="section-tag">PORTFOLIO</span>
        <h2 className="page-heading">My Work</h2>
      </div>

      <div className="filter-buttons">
        {filters.map((f) => (
          <button
            key={f.key}
            className={filter === f.key ? 'active' : ''}
            onClick={() => setFilter(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="projects-grid">
        {filteredProjects.map((project, index) => (
          <motion.div
            className="project-item"
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 * index }}
            whileHover={{ y: -6 }}
          >
            <div className="project-details">
              <div className="project-title-row">
                <h3>{project.title}</h3>
                {project.status !== 'live' && (
                  <span className={`status-badge status-${project.status}`}>
                    {statusLabel[project.status]}
                  </span>
                )}
              </div>
              <p>{project.description}</p>
              <div className="technologies">
                {project.technologies.map((tech) => (
                  <span key={tech} className="tech-tag">{tech}</span>
                ))}
              </div>
              <div className="project-links">
                {project.github ? (
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="view-project">
                    View on GitHub →
                  </a>
                ) : (
                  <span className="no-link-tag">Repo coming soon</span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Portfolio;
