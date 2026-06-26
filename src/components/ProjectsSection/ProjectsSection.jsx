import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowUpRight, FiLock, FiGithub } from 'react-icons/fi';
import './ProjectsSection.css';

const APPLE_EASE = [0.25, 0.46, 0.45, 0.94];

// The featured/hero project — gets a wide two-column card at the top.
const HERO_PROJECT = {
  id: 'pa-flow',
  eyebrow: 'Featured · AI Healthcare',
  title: 'PA-Flow: Multi-Agent Prior Authorization System',
  description:
    '4-stage LangGraph pipeline automating insurance prior authorization with hybrid RAG retrieval over 500+ clinical documents. Achieved 0.83 F1 with zero hallucination escapes, evaluated via RAGAS and traced with LangSmith.',
  image: '/images/PA-Flow.gif',
  tags: ['LangGraph', 'FastAPI', 'pgvector', 'RAGAS', 'LangSmith'],
  tint: 'blue',
  proprietary: true,
};

const PROJECTS = [
  {
    id: 'pulsepay',
    eyebrow: 'Backend Infrastructure',
    title: 'PulsePay: High-Throughput Payment Infrastructure',
    description:
      '5-microservice event-driven payment system sustaining 10K TPS at p99 118ms with Kafka, Redis deduplication, circuit breakers, and 100% dead-letter recovery.',
    image: '/images/pulsepay.gif',
    tags: ['Kafka', 'Spring Boot', 'Redis', 'Resilience4j'],
    tint: 'green',
    github: 'https://github.com/kartik117/pulsepay',
  },
  {
    id: 'pnwater',
    eyebrow: 'IoT · AI',
    title: 'PNWater: IoT River Health Monitoring Pipeline',
    description:
      'Real-time Pacific Northwest river health monitoring with Kafka streams, TimescaleDB storage, XGBoost anomaly detection, and LangGraph-powered alerts.',
    image: '/images/PNWater.gif',
    tags: ['Kafka', 'TimescaleDB', 'XGBoost', 'LangGraph'],
    tint: 'pink',
    github: 'https://github.com/kartik117/pnwater',
  },
  {
    id: 'intellipatch',
    eyebrow: 'Security Platform',
    title: 'IntelliPatch: Automated Container Security Platform',
    description:
      'Automated vulnerability management scanning 1000+ Docker/Kubernetes images with Trivy, ML-based CVE prioritization, and LLM remediation reports.',
    image: '/images/intelli.png',
    tags: ['Trivy', 'FastAPI', 'Kubernetes', 'GitHub Actions'],
    tint: 'amber',
    github: 'https://github.com/kartik117/intellipatch',
  },
  {
    id: 'reel-em-in',
    eyebrow: 'RAG · Knowledge Graph',
    title: "Reel 'em In AI: Fishing Regulation Assistant",
    description:
      'Open-source RAG + Neo4j knowledge graph assistant over 500+ US fishing regulation PDFs with instant cited answers and Mapbox overlays.',
    image: '/images/reelemin.png',
    tags: ['Next.js', 'FastAPI', 'Neo4j', 'Mapbox'],
    tint: 'purple',
    github: 'https://github.com/kartik117/reel-em-in-ai',
  },
];

// "Chip" CTA at the bottom of each card — adapts based on whether the
// project is proprietary, on GitHub, or just informational.
const ProjectCTA = ({ proprietary, github }) => {
  if (proprietary) {
    return (
      <div className="apple-project-chip apple-project-chip-proprietary">
        <FiLock size={13} />
        <span>Proprietary Work</span>
      </div>
    );
  }
  if (github) {
    return (
      <a
        href={github}
        target="_blank"
        rel="noopener noreferrer"
        className="apple-project-chip apple-project-chip-link"
      >
        <FiGithub size={13} />
        <span>View on GitHub</span>
        <FiArrowUpRight size={13} className="apple-project-chip-arrow" />
      </a>
    );
  }
  return null;
};

const ProjectHeroCard = ({ project }) => {
  const { eyebrow, title, description, image, tags, tint, proprietary, github } = project;
  return (
    <motion.article
      className="apple-project-hero"
      data-tint={tint}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1, ease: APPLE_EASE }}
    >
      <div
        className="apple-project-hero-image"
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="apple-project-hero-image-tint" aria-hidden="true" />
      </div>
      <div className="apple-project-hero-content">
        <div className="apple-project-eyebrow">{eyebrow}</div>
        <h3 className="apple-project-hero-title">{title}</h3>
        <p className="apple-project-hero-description">{description}</p>
        <div className="apple-project-tags">
          {tags.map((tag) => (
            <span key={tag} className="apple-project-tag">{tag}</span>
          ))}
        </div>
        <ProjectCTA proprietary={proprietary} github={github} />
      </div>
    </motion.article>
  );
};

const ProjectCard = ({ project, index }) => {
  const { eyebrow, title, description, image, tags, tint, proprietary, github } = project;
  return (
    <motion.article
      className="apple-project-card"
      data-tint={tint}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.9,
        delay: index * 0.08,
        ease: APPLE_EASE,
      }}
    >
      <div
        className="apple-project-card-image"
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="apple-project-card-image-tint" aria-hidden="true" />
      </div>
      <div className="apple-project-card-content">
        <div className="apple-project-eyebrow">{eyebrow}</div>
        <h3 className="apple-project-card-title">{title}</h3>
        <p className="apple-project-card-description">{description}</p>
        <div className="apple-project-tags">
          {tags.slice(0, 4).map((tag) => (
            <span key={tag} className="apple-project-tag">{tag}</span>
          ))}
        </div>
        <ProjectCTA proprietary={proprietary} github={github} />
      </div>
    </motion.article>
  );
};

const ProjectsSection = () => {
  return (
    <section className="apple-projects">
      <div className="apple-projects-inner">
        <motion.div
          className="apple-about-header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease: APPLE_EASE }}
        >
          <div className="apple-projects-header-row">
            <div>
              <span className="apple-eyebrow">Work</span>
              <h2 className="apple-section-title">
                Selected <span className="apple-title-muted">projects.</span>
              </h2>
            </div>
            <Link to="/portfolio" className="apple-projects-see-all">
              See all work
              <FiArrowUpRight size={16} />
            </Link>
          </div>
        </motion.div>

        <ProjectHeroCard project={HERO_PROJECT} />

        <div className="apple-projects-grid">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
