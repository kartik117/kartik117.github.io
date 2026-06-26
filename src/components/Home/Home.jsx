import React from 'react';
import Hero from '../Hero/Hero';
import AboutSection from '../AboutSection/AboutSection';
import SkillsSection from '../SkillsSection/SkillsSection';
import ProjectsSection from '../ProjectsSection/ProjectsSection';
import ExperienceSection from '../ExperienceSection/ExperienceSection';
import ContactSection from '../ContactSection/ContactSection';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <Hero />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <ContactSection />
    </div>
  );
};

export default Home;
