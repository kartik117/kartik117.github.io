import React, { useRef, useMemo, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Billboard } from '@react-three/drei';
import {
  FiDatabase, FiCpu, FiBarChart2, FiCode, FiServer, FiTool,
} from 'react-icons/fi';
import './SkillsSection.css';

const APPLE_EASE = [0.25, 0.46, 0.45, 0.94];

// Bento layout grid areas — short codes so they line up with CSS
// grid-template-areas in SkillsSection.css.
const CATEGORIES = [
  {
    id: 'de',
    name: 'AI / LLM Engineering',
    tagline: 'Agents, retrieval, evaluation.',
    Icon: FiDatabase,
    tint: 'blue',
    skills: [
      'LangChain', 'LangGraph', 'RAG Pipelines', 'FAISS | pgvector',
      'Amazon OpenSearch', 'RAGAS', 'LangSmith', 'PyTorch',
      'Hugging Face PEFT', 'QLoRA | LoRA', 'vLLM', 'Amazon Bedrock',
      'Vertex AI', 'XGBoost', 'scikit-learn', 'Pydantic v2',
    ],
  },
  {
    id: 'ml',
    name: 'Backend & Distributed Systems',
    tagline: 'Services, streams, reliability.',
    Icon: FiCpu,
    tint: 'purple',
    skills: [
      'Java 21', 'Spring Boot', 'Python', 'FastAPI', 'Node.js',
      'REST APIs', 'gRPC', 'Apache Kafka', 'Avro | Schema Registry',
      'Redis', 'Resilience4j', 'Testcontainers', 'PostgreSQL',
      'TimescaleDB', 'Neo4j',
    ],
  },
  {
    id: 'da',
    name: 'Cloud & DevOps',
    tagline: 'Deploy, observe, recover.',
    Icon: FiBarChart2,
    tint: 'teal',
    skills: [
      'AWS Lambda | SQS | S3', 'AWS ECS Fargate', 'AWS EventBridge',
      'Azure AKS', 'Azure DevOps', 'GCP Cloud Run', 'Docker',
      'Kubernetes', 'Terraform', 'GitHub Actions', 'Prometheus | Grafana',
    ],
  },
  {
    id: 'fe',
    name: 'Data Engineering',
    tagline: 'Pipelines, lakehouses, scale.',
    Icon: FiCode,
    tint: 'pink',
    skills: ['Apache Airflow', 'PySpark', 'Databricks', 'Delta Lake', 'Medallion Architecture', 'SQL', 'Pandas | NumPy', 'DuckDB'],
  },
  {
    id: 'be',
    name: 'Frontend',
    tagline: 'Interfaces for real workflows.',
    Icon: FiServer,
    tint: 'green',
    skills: ['Next.js', 'React', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'Mapbox'],
  },
  {
    id: 'tools',
    name: 'Tools',
    tagline: 'The daily kit.',
    Icon: FiTool,
    tint: 'silver',
    skills: [
      'Git', 'Jupyter', 'Postman', 'JIRA', 'VS Code', 'Bash',
    ],
  },
];

// Curated list shown as orbiting labels in the 3D cloud (kept tight so the
// sphere stays readable). Order doesn't matter — they get distributed
// evenly via Fibonacci sphere math.
const CLOUD_SKILLS = [
  'Python', 'Java 21', 'Spring Boot', 'FastAPI', 'LangGraph',
  'LangChain', 'RAGAS', 'LangSmith', 'Amazon Bedrock', 'OpenSearch',
  'Kafka', 'Redis', 'Resilience4j', 'PostgreSQL', 'TimescaleDB',
  'Neo4j', 'AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes',
  'Terraform', 'PySpark', 'Databricks', 'Delta Lake', 'Airflow',
  'React', 'Next.js', 'TypeScript', 'Mapbox', 'Prometheus', 'Grafana',
];

// Even point distribution on a sphere surface. Used to place each skill
// label so they don't clump — gives that satisfying orbiting-tag-cloud feel.
const useSpherePoints = (count, radius) => {
  return useMemo(() => {
    const golden = Math.PI * (1 + Math.sqrt(5));
    const pts = [];
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / count);
      const theta = golden * i;
      pts.push([
        Math.cos(theta) * Math.sin(phi) * radius,
        Math.sin(theta) * Math.sin(phi) * radius,
        Math.cos(phi) * radius,
      ]);
    }
    return pts;
  }, [count, radius]);
};

const SkillLabel = ({ position, text }) => (
  <Billboard position={position}>
    <Text
      fontSize={0.3}
      color="#f5f5f7"
      anchorX="center"
      anchorY="middle"
      letterSpacing={-0.01}
      material-toneMapped={false}
      outlineWidth={0.005}
      outlineColor="#000000"
      outlineOpacity={0.4}
    >
      {text}
    </Text>
  </Billboard>
);

const SkillCloud = ({ mouseRef }) => {
  const groupRef = useRef();
  const positions = useSpherePoints(CLOUD_SKILLS.length, 3.4);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.18;
    const targetX = (mouseRef.current?.y || 0) * 0.35;
    groupRef.current.rotation.x +=
      (targetX - groupRef.current.rotation.x) * 0.04;
  });

  return (
    <group ref={groupRef}>
      {CLOUD_SKILLS.map((skill, i) => (
        <SkillLabel key={skill} position={positions[i]} text={skill} />
      ))}
    </group>
  );
};

const SkillsSection = () => {
  const mouseRef = useRef({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;
    mouseRef.current.x = x;
    mouseRef.current.y = y;
  };

  return (
    <section className="apple-skills" onMouseMove={handleMouseMove}>
      <div className="apple-skills-inner">
        <motion.div
          className="apple-about-header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease: APPLE_EASE }}
        >
          <span className="apple-eyebrow">Skills</span>
          <h2 className="apple-section-title">
            The toolkit, <span className="apple-title-muted">end to end.</span>
          </h2>
        </motion.div>

        {/* 3D tag cloud */}
        <motion.div
          className="apple-skill-cloud-container"
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.2, ease: APPLE_EASE }}
        >
          <Canvas
            dpr={[1, 2]}
            camera={{ position: [0, 0, 8], fov: 45 }}
            gl={{ antialias: true, alpha: true }}
          >
            <fog attach="fog" args={['#050505', 6, 12]} />
            <Suspense fallback={null}>
              <SkillCloud mouseRef={mouseRef} />
            </Suspense>
          </Canvas>
          <div className="apple-skill-cloud-glow" aria-hidden="true" />
          <div className="apple-skill-cloud-edge" aria-hidden="true" />
        </motion.div>

        {/* Bento grid of category cards */}
        <div className="apple-skill-bento">
          {CATEGORIES.map(({ id, name, tagline, Icon, tint, skills }, i) => (
            <motion.div
              key={id}
              className="apple-skill-bento-card"
              data-tint={tint}
              style={{ gridArea: id }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.9,
                delay: i * 0.07,
                ease: APPLE_EASE,
              }}
            >
              <div className="apple-skill-card-header">
                <div className="apple-skill-card-icon" aria-hidden="true">
                  <Icon size={20} strokeWidth={1.8} />
                </div>
                <div className="apple-skill-card-meta">
                  <div className="apple-skill-card-title">{name}</div>
                  <div className="apple-skill-card-tagline">{tagline}</div>
                </div>
              </div>

              <div className="apple-skill-pills">
                {skills.map((skill) => (
                  <span key={skill} className="apple-skill-pill">{skill}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
