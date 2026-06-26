import { motion } from 'framer-motion';
import './About.css';

const timeline = [
  {
    date: 'Jun 2025 – Aug 2025',
    title: 'Software Developer Intern, Commonwealth of Massachusetts',
    points: [
      'Modernized a distributed enterprise search platform by migrating legacy IIS services to AWS Lambda and REST APIs with OpenSearch, cutting search latency by ~40%',
      'Built event-driven data ingestion pipelines using AWS Lambda and SQS, processing 1M+ records across 5 integrated systems for near-real-time indexing',
      'Implemented structured logging and CloudWatch metrics, reducing production incident MTTR by ~20%',
    ],
  },
  {
    date: 'Aug 2023 – Jun 2024',
    title: 'Software Engineer, Tata Consultancy Services',
    points: [
      'Spearheaded an org-wide observability initiative using OpenTelemetry and Prometheus with NLP-based log parsing for anomaly detection across 100+ services, cutting troubleshooting time by 80%',
      'Architected a Kafka self-serve internal developer platform (Spring Boot + Python), eliminating a JIRA-driven admin bottleneck and reducing provisioning time by 90%',
      'Automated Kubernetes secrets rotation with HashiCorp Vault Agent as a sidecar, preventing 150K+ annual security incidents',
    ],
  },
  {
    date: 'Jul 2022 – Aug 2023',
    title: 'Junior Software Engineer, Tata Consultancy Services',
    points: [
      'Built an ETL pipeline automating terabytes of compliance data transfer to S3 Glacier Deep Archive, saving $1.2M annually in storage costs',
      'Delivered pipeline orchestration with AWS Lambda and Step Functions for compliance case management, reducing manual workload by 95%',
      'Authored an automated test suite (pytest + moto) achieving 90%+ coverage on AWS Lambda/Step Functions pipelines',
    ],
  },
  {
    date: 'Aug 2020 – Mar 2021',
    title: 'Full Stack Developer, DY Patil University',
    points: [
      'Launched a student transcript management portal (Django + PostgreSQL + Angular/TypeScript) for 5,000+ students and alumni',
      'Built an ML-based course recommendation engine (collaborative filtering, scikit-learn) wired into Zoho CRM via FastAPI + Lambda webhooks, improving enrollment conversion from 18% to 35%',
    ],
  },
];

const skillCategories = [
  {
    title: 'Programming',
    skills: ['Python', 'Java', 'C#', 'Go', 'SQL', 'JavaScript', 'TypeScript', 'React', 'Node.js', 'GraphQL'],
  },
  {
    title: 'ML / AI',
    skills: ['PyTorch', 'Transformers', 'LangChain', 'RAG', 'Agentic AI', 'FastAPI', 'Spring Boot'],
  },
  {
    title: 'Data & Distributed Systems',
    skills: ['PostgreSQL', 'MongoDB', 'Neo4j', 'DuckDB', 'Redis', 'Kafka', 'Spark', 'Delta Lake', 'Airflow'],
  },
  {
    title: 'Cloud & Tools',
    skills: ['AWS', 'Azure', 'Kubernetes', 'Docker', 'Databricks', 'Elasticsearch', 'Jenkins', 'Terraform'],
  },
];

const certifications = [
  'AWS Certified Solutions Architect – Associate',
  'AWS Certified AI Practitioner',
  'Confluent Data Streaming Engineer',
  'HashiCorp Terraform Associate',
];

const About = () => {
  return (
    <motion.div
      className="about-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="page-header">
        <span className="section-tag">ABOUT</span>
        <h2 className="page-heading">About Me</h2>
      </div>

      <div className="about-content">
        <p className="intro-text">
          Full-stack engineer with 3 years of experience building scalable Java/Spring Boot
          and serverless applications with RESTful APIs and modern JavaScript frameworks.
        </p>
        <p>
          I've focused on automation and observability on AWS — using Lambda, OpenSearch,
          and CI/CD pipelines to improve reliability and reduce latency — including a
          distributed search migration that cut latency by 40%. Outside of work, I build
          and ship complete, real, end-to-end software projects on my own: multi-agent LLM
          pipelines, data-engineering lakehouses, and developer-tooling integrations.
        </p>

        <h3 className="section-subheading">Education</h3>
        <div className="education-list">
          <div className="education-item">
            <div>
              <h4>Syracuse University</h4>
              <p>Master's, Computer Science</p>
            </div>
            <span className="education-date">Aug 2024 – May 2026</span>
          </div>
          <div className="education-item">
            <div>
              <h4>University of Mumbai</h4>
              <p>Bachelor of Engineering, Computer Science</p>
            </div>
            <span className="education-date">Jun 2018 – May 2022</span>
          </div>
        </div>

        <h3 className="section-subheading">Experience</h3>
        <div className="timeline">
          {timeline.map((item) => (
            <div className="timeline-item" key={item.title}>
              <div className="timeline-dot"></div>
              <div className="timeline-date">{item.date}</div>
              <div className="timeline-content">
                <h4>{item.title}</h4>
                {item.points.map((point) => (
                  <p key={point}>{point}</p>
                ))}
              </div>
            </div>
          ))}
        </div>

        <h3 className="section-subheading">Skills</h3>
        <div className="skills-categories">
          {skillCategories.map((cat) => (
            <div className="skills-category" key={cat.title}>
              <h4>{cat.title}</h4>
              <div className="skills-grid">
                {cat.skills.map((skill) => (
                  <span className="skill-item" key={skill}>{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <h3 className="section-subheading">Certifications</h3>
        <div className="cert-list">
          {certifications.map((cert) => (
            <span className="cert-item" key={cert}>{cert}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default About;
