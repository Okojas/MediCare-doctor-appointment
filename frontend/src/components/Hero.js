import React from 'react';
import { ArrowRight, Download, Github, Linkedin, Twitter } from 'lucide-react';
import { personalInfo } from '../data/mock';

const Hero = () => {
  const scrollToProjects = (e) => {
    e.preventDefault();
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = (e) => {
    e.preventDefault();
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-16 md:pt-0 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Greeting */}
          <div className="inline-block mb-4 md:mb-6 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium animate-fade-in">
            👋 Welcome to my portfolio
          </div>

          {/* Name */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 dark:text-white mb-4 md:mb-6 animate-slide-up">
            Hi, I'm <span className="text-blue-600 dark:text-blue-400">{personalInfo.name}</span>
          </h1>

          {/* Title */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-slate-700 dark:text-slate-300 mb-4 md:mb-6 animate-slide-up animation-delay-200">
            {personalInfo.title}
          </h2>

          {/* Tagline */}
          <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-8 md:mb-10 max-w-2xl mx-auto animate-slide-up animation-delay-400">
            {personalInfo.tagline}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 md:mb-12 animate-slide-up animation-delay-600">
            <button
              onClick={scrollToProjects}
              className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
            >
              View Projects
              <ArrowRight size={20} />
            </button>
            <button
              onClick={scrollToContact}
              className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-semibold rounded-lg shadow-lg hover:shadow-xl border-2 border-slate-200 dark:border-slate-700 hover:border-blue-600 dark:hover:border-blue-400 transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
            >
              Contact Me
            </button>
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-4 animate-slide-up animation-delay-800">
            <a
              href={personalInfo.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-blue-600 dark:hover:text-blue-400 transform hover:scale-110 transition-all duration-200 shadow-md"
              aria-label="GitHub"
            >
              <Github size={24} />
            </a>
            <a
              href={personalInfo.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-blue-600 dark:hover:text-blue-400 transform hover:scale-110 transition-all duration-200 shadow-md"
              aria-label="LinkedIn"
            >
              <Linkedin size={24} />
            </a>
            <a
              href={personalInfo.social.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-blue-600 dark:hover:text-blue-400 transform hover:scale-110 transition-all duration-200 shadow-md"
              aria-label="Twitter"
            >
              <Twitter size={24} />
            </a>
            <a
              href={personalInfo.resumeUrl}
              download
              className="p-3 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-blue-600 dark:hover:text-blue-400 transform hover:scale-110 transition-all duration-200 shadow-md"
              aria-label="Download Resume"
            >
              <Download size={24} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;