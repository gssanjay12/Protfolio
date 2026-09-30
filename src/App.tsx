import React, { useState, useEffect } from 'react';
import { CreativeNavigation } from './components/layout/CreativeNavigation';
import { CreativeHero } from './components/sections/CreativeHero';
import { CreativeProjectsSection } from './components/sections/CreativeProjectsSection';
import { CreativeAboutSection } from './components/sections/CreativeAboutSection';
import { CreativeSkillsSection } from './components/sections/CreativeSkillsSection';
import { CreativeExperienceSection } from './components/sections/CreativeExperienceSection';
import { CreativeAchievementsSection } from './components/sections/CreativeAchievementsSection';
import { CreativeContactSection } from './components/sections/CreativeContactSection';
import { CreativeFooter } from './components/layout/CreativeFooter';
import { CustomCursor } from './components/cursor/CustomCursor';

export const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero');

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Scroll-spy IntersectionObserver for active section highlight
  useEffect(() => {
    const sections = ['hero', 'projects', 'about', 'skills', 'experience', 'achievements', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0.05,
      }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#070709] text-[#E4E4E7] font-sans selection:bg-[#CCFF00] selection:text-black overflow-x-hidden relative">
      {/* Precision Custom Cursor for Desktop */}
      <CustomCursor />

      {/* Floating Minimal Navigation */}
      <CreativeNavigation
        activeSection={activeSection}
        onNavigate={scrollToSection}
      />

      {/* Main Single-Page Editorial Scroll Narrative */}
      <main className="w-full relative z-10 flex flex-col">
        {/* 00 // HERO */}
        <div id="hero">
          <CreativeHero
            onExploreWork={() => scrollToSection('projects')}
            onContact={() => scrollToSection('contact')}
          />
        </div>

        {/* 01 // SELECTED WORK: 3 FEATURED PROJECTS (ORCA, CLASSSYNC, ORTHOPEDIC AI) + GITHUB CTA */}
        <CreativeProjectsSection />

        {/* 02 // ABOUT & EDITORIAL PROFILE */}
        <CreativeAboutSection />

        {/* 03 // SKILLS MATRIX (TYPOGRAPHY BASED) */}
        <CreativeSkillsSection />

        {/* 04 // TIMELINE & EXPERIENCE */}
        <CreativeExperienceSection />

        {/* 05 // ACHIEVEMENTS & AWARDS */}
        <CreativeAchievementsSection />

        {/* 06 // CONTACT CLIMAX */}
        <CreativeContactSection />

        {/* FOOTER */}
        <CreativeFooter />
      </main>
    </div>
  );
};

export default App;
