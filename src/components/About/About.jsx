import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiTarget, FiFeather, FiCompass, FiBookOpen, FiArrowUpRight } from 'react-icons/fi';
import './About.css';

const APPLE_EASE = [0.25, 0.46, 0.45, 0.94];

// Long-form narrative split into clean chapters. The dedicated /about
// page goes deeper than the home About section — full journey + strengths.
const JOURNEY_CHAPTERS = [
  {
    year: '2018 — 2022',
    title: 'The foundation.',
    body:
      'I found my footing during my undergraduate Computer Engineering degree at the University of Mumbai: data structures, databases, distributed systems, and the satisfaction of shipping code that actually runs.',
  },
  {
    year: '2021 — 2022',
    title: 'Software reached real users.',
    body:
      'At DY Patil University School of Dentistry, I built web applications that modernized clinical record-keeping workflows. It was my first taste of software helping real people move faster.',
  },
  {
    year: '2022 — 2024',
    title: 'Enterprise systems at scale.',
    body:
      'At Tata Consultancy Services, I worked across REST and gRPC APIs, Kafka-based event pipelines, AKS-deployed microservices, observability, secrets rotation, and AWS serverless automation. That feedback loop gave me production instincts quickly.',
  },
  {
    year: '2024 — 2026',
    title: 'A deeper technical reset.',
    body:
      'I moved to the US for my Master\'s in Computer Science at Syracuse University, going deeper on distributed systems, cloud-native architecture, AI engineering, and the kind of project work that stretches every layer of the stack.',
  },
  {
    year: '2025',
    title: 'Government-scale AI workflows.',
    body:
      'At the Commonwealth of Massachusetts, I worked on enterprise search and document-processing systems with AWS Lambda, SQS, OpenSearch, Bedrock, ECS Fargate, RAGAS, and LangSmith.',
  },
  {
    year: 'Now',
    title: 'Production-grade AI and distributed systems.',
    body:
      'I am building systems like PA-Flow, PulsePay, PNWater, MedFineTune, IntelliPatch, and RepoMind: multi-agent AI, event-driven backends, lakehouse pipelines, graph RAG, and cloud-native infrastructure.',
  },
];

const STRENGTHS = [
  {
    icon: FiTarget,
    title: 'Systems thinker.',
    body:
      'I design for failure, scale, and maintainability. Circuit breakers, dead letter queues, idempotency, tracing, and rollback paths matter as much as the happy path.',
    tint: 'blue',
  },
  {
    icon: FiFeather,
    title: 'AI engineer.',
    body:
      'I build production AI systems: multi-agent pipelines, hybrid RAG retrieval, LLM evaluation, fine-tuned models, and interfaces that make the workflow useful.',
    tint: 'pink',
  },
  {
    icon: FiCompass,
    title: 'Cloud-native builder.',
    body:
      'AWS, Azure, GCP, Kubernetes, Terraform, and CI/CD are part of my everyday toolkit. I deploy systems to the cloud, not just localhost.',
    tint: 'purple',
  },
  {
    icon: FiBookOpen,
    title: 'Continuous learner.',
    body:
      'Six cloud and AI certifications keep me honest: GCP ACE, AWS, Confluent, Kubernetes, Claude Certified Architect, and Vertex AI.',
    tint: 'green',
  },
];

const About = () => {
  return (
    <div className="apple-about-page">
      {/* ─── Hero ──────────────────────────────────────────── */}
      <section className="apple-about-page-hero">
        <div className="apple-about-page-glow" aria-hidden="true" />

        <div className="apple-about-page-hero-inner">
          <motion.div
            className="apple-about-page-hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: APPLE_EASE }}
          >
            <span className="apple-eyebrow">About</span>
            <h1 className="apple-about-page-title">
              Software Engineer,{' '}
              <span className="apple-title-muted">building production AI.</span>
            </h1>
            <p className="apple-about-page-lead">
              I'm Kartik — a Software Engineer focused on AI/GenAI systems,
              distributed backends, and full-stack products that survive real
              production constraints.
            </p>
            <p className="apple-about-page-lead-secondary">
              Master's in Computer Science at Syracuse University. Previously
              at the Commonwealth of Massachusetts, Tata Consultancy Services,
              and DY Patil University.
            </p>
          </motion.div>

          <motion.div
            className="apple-about-page-headshot"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.2, ease: APPLE_EASE }}
          >
            <div className="apple-about-page-headshot-glow" aria-hidden="true" />
            <img src="/images/headshot.png?v=20260627" alt="Kartik Bamble" />
          </motion.div>
        </div>
      </section>

      {/* ─── Journey ───────────────────────────────────────── */}
      <section className="apple-about-page-journey">
        <div className="apple-about-page-section-inner">
          <motion.div
            className="apple-about-page-section-header"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9, ease: APPLE_EASE }}
          >
            <span className="apple-eyebrow">Journey</span>
            <h2 className="apple-section-title">
              From the first line{' '}
              <span className="apple-title-muted">to now.</span>
            </h2>
          </motion.div>

          <div className="apple-about-page-chapters">
            {JOURNEY_CHAPTERS.map((c, i) => (
              <motion.article
                key={c.year}
                className="apple-about-page-chapter"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.9,
                  delay: i * 0.05,
                  ease: APPLE_EASE,
                }}
              >
                <div className="apple-about-page-chapter-year">{c.year}</div>
                <div className="apple-about-page-chapter-body">
                  <h3>{c.title}</h3>
                  <p>{c.body}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Strengths ─────────────────────────────────────── */}
      <section className="apple-about-page-strengths">
        <div className="apple-about-page-section-inner">
          <motion.div
            className="apple-about-page-section-header"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9, ease: APPLE_EASE }}
          >
            <span className="apple-eyebrow">Strengths</span>
            <h2 className="apple-section-title">
              What I bring{' '}
              <span className="apple-title-muted">to the table.</span>
            </h2>
          </motion.div>

          <div className="apple-about-page-strengths-grid">
            {STRENGTHS.map(({ icon: Icon, title, body, tint }, i) => (
              <motion.div
                key={title}
                className="apple-about-page-strength-card"
                data-tint={tint}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.9,
                  delay: i * 0.08,
                  ease: APPLE_EASE,
                }}
              >
                <div className="apple-about-page-strength-icon" aria-hidden="true">
                  <Icon size={20} strokeWidth={1.8} />
                </div>
                <h3>{title}</h3>
                <p>{body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ───────────────────────────────────────────── */}
      <section className="apple-about-page-cta">
        <motion.div
          className="apple-about-page-cta-inner"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1, ease: APPLE_EASE }}
        >
          <span className="apple-eyebrow">Next</span>
          <h2 className="apple-about-page-cta-title">
            Want to build{' '}
            <span className="apple-title-muted">something together?</span>
          </h2>
          <Link to="/contact" className="apple-about-page-cta-btn">
            Get in touch
            <FiArrowUpRight size={18} />
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default About;
