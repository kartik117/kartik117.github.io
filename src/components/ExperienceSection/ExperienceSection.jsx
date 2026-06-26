import React from 'react';
import { motion } from 'framer-motion';
import './ExperienceSection.css';

const APPLE_EASE = [0.25, 0.46, 0.45, 0.94];

// Career timeline — chronological newest first. Each entry is one card
// on the right of the rail. The current role gets a "Now" badge + a
// pulsing ripple on its rail dot.
const EXPERIENCES = [
  {
    id: 'syracuse',
    date: 'Aug 2024 — May 2026',
    company: 'Syracuse University',
    role: "Master's in Computer Science",
    bullets: [
      'Focused on distributed systems, cloud-native architecture, AI engineering, and production software design.',
      'Built PA-Flow, PulsePay, PNWater, MedFineTune, and other project systems across AI, backend, and data engineering.',
      'Earned cloud and AI certifications across GCP, AWS, Confluent, Kubernetes, and Claude architecture.',
    ],
    tint: 'blue',
    current: true,
  },
  {
    id: 'ma-eoed',
    date: 'Jun — Aug 2025',
    company: 'Commonwealth of Massachusetts',
    role: 'Software Developer Intern · Executive Office of Economic Development',
    bullets: [
      'Modernized distributed enterprise search by migrating legacy IIS services to AWS Lambda and REST APIs with OpenSearch, cutting latency by about 40%.',
      'Built event-driven ingestion using AWS Lambda and SQS to process 1M+ records across integrated systems for near-real-time indexing.',
      'Implemented structured logging and CloudWatch metrics, reducing production incident MTTR by roughly 20%.',
    ],
    tint: 'green',
  },
  {
    id: 'tcs-se',
    date: 'Aug 2023 — Jun 2024',
    company: 'Tata Consultancy Services',
    role: 'Software Engineer',
    bullets: [
      'Spearheaded observability with OpenTelemetry, Prometheus, and NLP-based log parsing across 100+ services, cutting troubleshooting time by 80%.',
      'Architected a Kafka self-serve internal developer platform with Spring Boot and Python, reducing provisioning time by 90%.',
      'Automated Kubernetes secrets rotation with HashiCorp Vault Agent as a sidecar.',
    ],
    tint: 'purple',
  },
  {
    id: 'tcs-jse',
    date: 'Jul 2022 — Aug 2023',
    company: 'Tata Consultancy Services',
    role: 'Junior Software Engineer',
    bullets: [
      'Built an ETL pipeline automating terabytes of compliance data transfer to S3 Glacier Deep Archive, saving $1.2M annually.',
      'Delivered AWS Lambda and Step Functions orchestration for compliance case management, reducing manual workload by 95%.',
      'Authored automated tests with pytest and moto, achieving 90%+ coverage on serverless pipelines.',
    ],
    tint: 'pink',
  },
  {
    id: 'mumbai',
    date: '2018 — 2022',
    company: 'University of Mumbai',
    role: 'BE Computer Engineering',
    bullets: [
      'Built a foundation in algorithms, databases, distributed systems, networks, and software engineering.',
      'Found the satisfaction of shipping code that runs for real users and real workflows.',
    ],
    tint: 'amber',
  },
];

const TimelineItem = ({ exp, index }) => {
  const { date, company, role, bullets, tint, current } = exp;
  return (
    <motion.div
      className="apple-timeline-item"
      data-current={current ? 'true' : undefined}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.9,
        delay: index * 0.08,
        ease: APPLE_EASE,
      }}
    >
      {/* Date column (desktop only — hidden on mobile, repeated inside card) */}
      <div className="apple-timeline-aside">
        <span className="apple-timeline-date">{date}</span>
      </div>

      {/* Rail with vertical line + dot */}
      <div className="apple-timeline-rail" data-tint={tint}>
        <span className="apple-timeline-dot" aria-hidden="true" />
        {current && (
          <span className="apple-timeline-dot-pulse" aria-hidden="true" />
        )}
      </div>

      {/* Content card */}
      <div className="apple-timeline-content">
        <div className="apple-timeline-card" data-tint={tint}>
          <div className="apple-timeline-card-header">
            <div className="apple-timeline-card-meta">
              <div className="apple-timeline-date apple-timeline-date-mobile">
                {date}
              </div>
              <div className="apple-timeline-company">{company}</div>
              <div className="apple-timeline-role">{role}</div>
            </div>
            {current && (
              <div className="apple-timeline-now" aria-label="Currently here">
                <span className="apple-timeline-now-dot" />
                Now
              </div>
            )}
          </div>

          <ul className="apple-timeline-bullets">
            {bullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

const ExperienceSection = () => {
  return (
    <section className="apple-experience">
      <div className="apple-experience-inner">
        <motion.div
          className="apple-about-header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease: APPLE_EASE }}
        >
          <span className="apple-eyebrow">Experience</span>
          <h2 className="apple-section-title">
            From systems{' '}
            <span className="apple-title-muted">to production AI.</span>
          </h2>
        </motion.div>

        <div className="apple-timeline">
          {EXPERIENCES.map((exp, i) => (
            <TimelineItem key={exp.id} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
