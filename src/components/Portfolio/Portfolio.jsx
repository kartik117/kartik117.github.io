import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiLock, FiGithub, FiArrowUpRight } from 'react-icons/fi';
import './Portfolio.css';

const APPLE_EASE = [0.25, 0.46, 0.45, 0.94];

// Project catalog — full set, used on /portfolio. The home page shows a
// curated subset via ProjectsSection.
const PROJECTS = [
  {
    id: 1,
    title: 'PA-Flow: Multi-Agent Prior Authorization System',
    eyebrow: 'AI Healthcare',
    description:
      'Automated insurance prior authorization using a 4-stage LangGraph multi-agent pipeline with hybrid RAG retrieval over pgvector. Achieved 0.83 F1 on 500+ clinical documents with zero hallucination escapes, RAGAS evaluation, and LangSmith tracing.',
    image: '/images/PA-Flow.gif',
    categories: ['ai', 'be'],
    tags: ['LangGraph', 'FastAPI', 'pgvector', 'RAGAS', 'LangSmith'],
    proprietary: true,
  },
  {
    id: 2,
    title: 'PulsePay: High-Throughput Payment Infrastructure',
    eyebrow: 'Backend Infrastructure',
    description:
      '5-microservice event-driven payment system sustaining 10K TPS at p99 118ms. Kafka + Avro for event streaming, Redis deduplication, Resilience4j circuit breakers, dead letter recovery, and Prometheus + Grafana monitoring.',
    image: '/images/pulsepay.gif',
    categories: ['be'],
    tags: ['Kafka', 'Spring Boot', 'Redis', 'Resilience4j', 'Grafana'],
    github: 'https://github.com/kartik117/pulsepay',
  },
  {
    id: 3,
    title: 'PNWater: IoT River Health Monitoring Pipeline',
    eyebrow: 'IoT · AI',
    description:
      'Real-time Pacific Northwest river health monitoring with simulated IoT sensors at 10 river locations. Streams through Kafka into TimescaleDB; XGBoost detects anomalies calibrated on USGS data; LangGraph generates alerts.',
    image: '/images/PNWater.gif',
    categories: ['ai', 'be', 'fs'],
    tags: ['Kafka', 'TimescaleDB', 'XGBoost', 'LangGraph', 'Mapbox'],
    github: 'https://github.com/kartik117/pnwater',
  },
  {
    id: 4,
    title: 'MedFineTune: Medical LLM Fine-Tuning',
    eyebrow: 'LLM Fine-Tuning',
    description:
      'Fine-tuned Mistral-7B on MedQA using QLoRA with 4-bit quantization and rank 64 on A100 GPU, improving benchmark accuracy from 45% to 57%, then serving inference via vLLM.',
    image: '/images/medfinetune.png',
    categories: ['ai'],
    tags: ['QLoRA', 'vLLM', 'Mistral-7B', 'PyTorch'],
    proprietary: true,
  },
  {
    id: 5,
    title: 'IntelliPatch: Automated Container Security Platform',
    eyebrow: 'Security Platform',
    description:
      'Automated container vulnerability management scanning 1000+ Docker/Kubernetes images with Trivy. ML prioritizes CVEs, an LLM generates remediation reports, and CI/CD gates block critical deployments.',
    image: '/images/intelli.png',
    categories: ['be', 'fs'],
    tags: ['Trivy', 'FastAPI', 'Kubernetes', 'OpenAI'],
    github: 'https://github.com/kartik117/intellipatch',
  },
  {
    id: 6,
    title: 'MedallionNYC: NYC Lakehouse Analytics Pipeline',
    eyebrow: 'Data Engineering',
    description:
      'Lakehouse pipeline processing 10M+ NYC TLC taxi trips from S3 through Bronze/Silver/Gold medallion architecture on Databricks Delta Lake, orchestrated by Apache Airflow DAGs.',
    image: '/images/meddalion.png',
    categories: ['be', 'ai'],
    tags: ['PySpark', 'Databricks', 'Delta Lake', 'Airflow'],
    github: 'https://github.com/kartik117/MedallionNYC',
  },
  {
    id: 7,
    title: "Reel 'em In AI: Fishing Regulation Assistant",
    eyebrow: 'RAG · Knowledge Graph',
    description:
      'Open-source RAG + Knowledge Graph assistant over 500+ US state fishing regulation PDFs. Neo4j connects species, location, season, and rules, with cited answers and Mapbox overlays.',
    image: '/images/reelemin.png',
    categories: ['ai', 'fs'],
    tags: ['Next.js', 'FastAPI', 'Neo4j', 'Mapbox'],
    github: 'https://github.com/kartik117/reel-em-in-ai',
  },
  {
    id: 8,
    title: 'RepoMind: Codebase Intelligence with GraphRAG',
    eyebrow: 'Developer Tools',
    description:
      'Developer tooling that maps GitHub repositories into a Neo4j function-class-dependency knowledge graph and answers multi-hop code questions with graph-grounded LLM responses.',
    image: '/images/repomind.gif',
    categories: ['ai', 'fs'],
    tags: ['Neo4j', 'LangChain', 'FastAPI', 'GitHub API'],
    github: 'https://github.com/kartik117/RepoMindMCP',
  },
  {
    id: 9,
    title: 'TaskForge: Project & Task Management Platform',
    eyebrow: 'Full-Stack · Auth',
    description:
      'Project and task management API and React kanban board built around a two-step OTP login — a password alone gets a user nowhere, a JWT is only minted after the matching email code is verified. Tested against a real in-memory MongoDB, not mocks.',
    image: '/images/taskforge.png',
    categories: ['be', 'fs'],
    tags: ['Node.js', 'Express', 'MongoDB', 'React', 'JWT', 'Docker'],
    github: 'https://github.com/kartik117/taskforge',
  },
  {
    id: 10,
    title: 'HuntQuest: Real-Time Map-Based Scavenger Hunt',
    eyebrow: 'Real-Time · Geo',
    description:
      'Teams walk to real Seattle landmarks while everyone on the hunt watches every team\'s live position on a shared map; Redis GEOADD/GEOSEARCH marks a checkpoint "found" the instant a team\'s GPS enters its radius, fanned out across replicas via Redis pub/sub.',
    image: '/images/huntquest.png',
    categories: ['be', 'fs'],
    tags: ['FastAPI', 'Redis', 'PostgreSQL', 'WebSockets', 'Kubernetes', 'React'],
    github: 'https://github.com/kartik117/huntquest',
  },
  {
    id: 11,
    title: 'PixelWave: Real-Time Collaborative Pixel Board',
    eyebrow: 'Real-Time · WebSockets',
    description:
      'An r/place-style shared 500x500 canvas where every paint from every connected user shows up on everyone else\'s screen in milliseconds — Go + gorilla/websocket fan-out through Redis BITFIELD and pub/sub, with Postgres as an append-only, replay-and-recovery-capable event log. Load-tested to 550 concurrent connections.',
    image: '/images/pixelwave.png',
    categories: ['be', 'fs'],
    tags: ['Go', 'WebSockets', 'Redis', 'PostgreSQL', 'React'],
    github: 'https://github.com/kartik117/pixelwave',
  },
  {
    id: 12,
    title: 'Provenance: Citation-Verified Research Assistant',
    eyebrow: 'Multi-Agent RAG',
    description:
      'Multi-agent academic research assistant that searches papers, filters relevance, synthesizes findings, and verifies every claim against its cited source before showing the answer. Built with LangGraph, Gemini, FastAPI, Streamlit, PostgreSQL, and RAGAS evaluation.',
    image: '/images/provenance.svg',
    categories: ['ai', 'be', 'fs'],
    tags: ['LangGraph', 'Gemini', 'FastAPI', 'RAGAS', 'PostgreSQL'],
    github: 'https://github.com/kartik117/Provenance',
  },
  {
    id: 13,
    title: 'ESG Disclosure Analyzer',
    eyebrow: 'AI · Document Intelligence',
    description:
      'Full-stack ESG disclosure analysis app with a Next.js frontend and FastAPI backend. Uploads corporate disclosures, supports optional Gemini-powered RAG, and provides analyst-friendly Q&A over extracted sustainability content.',
    image: '/images/esg-disclosure.png',
    categories: ['ai', 'fs'],
    tags: ['Next.js', 'FastAPI', 'Gemini', 'RAG', 'Vercel'],
    github: 'https://github.com/kartik117/esg-disclosure-analyzer',
  },
  {
    id: 14,
    title: 'IoT Energy Optimization: Smart Home ML Pipeline',
    eyebrow: 'IoT · ML Optimization',
    description:
      'AI-driven IoT system for residential energy optimization combining a smart-home simulator, AWS IoT telemetry pipeline, ML forecasting, rule-based optimization, Q-learning experiments, and a Streamlit dashboard. Reduced cost by 10.25% and peak power by 13.93% without new comfort violations.',
    image: '/images/iot-energy.svg',
    categories: ['ai', 'be'],
    tags: ['AWS IoT', 'Python', 'scikit-learn', 'Streamlit', 'Q-learning'],
    github: 'https://github.com/kartik117/iot-energy-optimization',
  },
];

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'ai', label: 'AI / ML' },
  { id: 'be', label: 'Backend' },
  { id: 'fs', label: 'Full Stack' },
];

// Apple system color tints rotated per card for visual variety
const TINTS = ['blue', 'purple', 'green', 'pink', 'amber', 'teal'];
const tintFor = (idx) => TINTS[idx % TINTS.length];

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

const PortfolioCard = ({ project, tint }) => (
  <article className="apple-project-card apple-portfolio-card" data-tint={tint}>
    <div
      className="apple-project-card-image"
      style={{ backgroundImage: `url(${project.image})` }}
    >
      <div className="apple-project-card-image-tint" aria-hidden="true" />
    </div>
    <div className="apple-project-card-content">
      <div className="apple-project-eyebrow">{project.eyebrow}</div>
      <h3 className="apple-project-card-title">{project.title}</h3>
      <p className="apple-project-card-description apple-portfolio-description">
        {project.description}
      </p>
      <div className="apple-project-tags">
        {project.tags.slice(0, 4).map((t) => (
          <span key={t} className="apple-project-tag">{t}</span>
        ))}
      </div>
      <ProjectCTA proprietary={project.proprietary} github={project.github} />
    </div>
  </article>
);

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') return PROJECTS;
    return PROJECTS.filter((p) => (p.categories || []).includes(activeFilter));
  }, [activeFilter]);

  return (
    <div className="apple-portfolio-page">
      {/* ─── Hero header ───────────────────────────────────── */}
      <section className="apple-portfolio-hero">
        <div className="apple-portfolio-hero-glow" aria-hidden="true" />
        <div className="apple-portfolio-hero-inner">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: APPLE_EASE }}
          >
            <span className="apple-eyebrow">Work</span>
            <h1 className="apple-portfolio-title">
              Projects, end{' '}
              <span className="apple-title-muted">to end.</span>
            </h1>
            <p className="apple-portfolio-subtitle">
              A catalog of the systems I've built — from multi-agent AI and
              event-driven backends to lakehouse pipelines and full-stack tools.
            </p>
          </motion.div>

          {/* Apple-style segmented filter */}
          <motion.div
            className="apple-portfolio-filters"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: APPLE_EASE }}
            role="tablist"
            aria-label="Filter projects by category"
          >
            {FILTERS.map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className={`apple-portfolio-filter${
                  activeFilter === f.id ? ' active' : ''
                }`}
                role="tab"
                aria-selected={activeFilter === f.id}
              >
                {f.label}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Grid ──────────────────────────────────────────── */}
      <section className="apple-portfolio-grid-section">
        <div className="apple-portfolio-grid-inner">
          <motion.div className="apple-portfolio-grid" layout>
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((p, i) => (
                <motion.div
                  key={p.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95, y: 24 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  transition={{
                    duration: 0.55,
                    delay: i * 0.04,
                    ease: APPLE_EASE,
                  }}
                >
                  <PortfolioCard project={p} tint={tintFor(i)} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredProjects.length === 0 && (
            <div className="apple-portfolio-empty">
              No projects in this category yet.
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
