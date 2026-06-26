import { useRef, Suspense, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Environment } from '@react-three/drei';
import './Hero.css';

const EASE = [0.25, 0.46, 0.45, 0.94];

const HeroMesh = ({ mouseRef, isMobile }) => {
  const groupRef = useRef();

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.12;
    if (!isMobile) {
      const targetX = mouseRef.current.y * 0.4;
      const targetY = mouseRef.current.x * 0.4;
      groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.04;
      groupRef.current.rotation.z += (targetY * 0.3 - groupRef.current.rotation.z) * 0.04;
    }
  });

  return (
    <Float speed={1.4} rotationIntensity={0.35} floatIntensity={1.1}>
      <group ref={groupRef}>
        <mesh scale={isMobile ? 1.8 : 2.1}>
          <icosahedronGeometry args={[1, isMobile ? 5 : 8]} />
          <MeshDistortMaterial
            color="#5b5bf6"
            distort={0.42}
            speed={isMobile ? 1.0 : 1.3}
            roughness={0.15}
            metalness={0.9}
            envMapIntensity={1.2}
          />
        </mesh>
      </group>
    </Float>
  );
};

const Hero = () => {
  const mouseRef = useRef({ x: 0, y: 0 });
  const heroRef = useRef(null);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const sceneY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const sceneOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-15%']);

  const handleMouseMove = (e) => {
    mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
  };

  return (
    <section ref={heroRef} className="kb-hero" onMouseMove={handleMouseMove}>
      <motion.div className="hero-3d-layer" style={{ y: sceneY, opacity: sceneOpacity }}>
        <Canvas
          dpr={isMobile ? [1, 1.5] : [1, 2]}
          camera={{ position: [0, 0, 5], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.35} />
            <directionalLight position={[4, 4, 5]} intensity={1.1} color="#ffffff" />
            <pointLight position={[-5, -3, -2]} color="#8b8cf8" intensity={2.2} />
            <pointLight position={[0, 0, -4]} color="#5b5bf6" intensity={1.8} />
            <HeroMesh mouseRef={mouseRef} isMobile={isMobile} />
            <Environment preset="city" />
          </Suspense>
        </Canvas>
      </motion.div>

      <div className="hero-glow" aria-hidden="true" />
      <div className="hero-vignette" aria-hidden="true" />

      <motion.div className="hero-content" style={{ y: contentY }}>
        <motion.span
          className="kb-hero-eyebrow"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
        >
          Software Engineer · 2026
        </motion.span>

        <motion.h1
          className="kb-hero-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.35, ease: EASE }}
        >
          Kartik Bamble
        </motion.h1>

        <motion.p
          className="kb-hero-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.55, ease: EASE }}
        >
          Full-Stack Engineer <span className="dot-sep">·</span> Cloud &amp; AI Systems
        </motion.p>

        <motion.div
          className="kb-hero-cta-row"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.75, ease: EASE }}
        >
          <Link to="/portfolio" className="kb-cta-primary">
            View My Work
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M5.5 3L10.5 8L5.5 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
          <Link to="/contact" className="kb-cta-ghost">
            Get in touch
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        className="kb-scroll-hint"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
      >
        <span>Scroll</span>
        <div className="scroll-line" />
      </motion.div>
    </section>
  );
};

export default Hero;
