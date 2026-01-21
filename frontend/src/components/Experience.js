import React from 'react';
import { Briefcase, GraduationCap, Award } from 'lucide-react';
import { experience, certifications } from '../data/mock';

const Experience = () => {
  return (
    <section id="experience" className="py-16 md:py-24 bg-slate-50 dark:bg-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              Experience & <span className="text-blue-600 dark:text-blue-400">Education</span>
            </h2>
            <div className="w-20 h-1 bg-blue-600 dark:bg-blue-400 mx-auto rounded-full mb-4"></div>
            <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              My journey in software development
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-blue-600 dark:bg-blue-400 transform md:-translate-x-1/2"></div>

            {/* Timeline Items */}
            <div className="space-y-8 md:space-y-12">
              {experience.map((item, index) => (
                <div
                  key={item.id}
                  className={`relative flex items-start md:items-center ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-4 md:left-1/2 w-8 h-8 bg-blue-600 dark:bg-blue-400 rounded-full transform md:-translate-x-1/2 flex items-center justify-center z-10">
                    {item.type === 'experience' ? (
                      <Briefcase size={16} className="text-white" />
                    ) : (
                      <GraduationCap size={16} className="text-white" />
                    )}
                  </div>

                  {/* Content Card */}
                  <div
                    className={`ml-16 md:ml-0 md:w-5/12 ${
                      index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'
                    }`}
                  >
                    <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <div className="mb-2">
                        <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-semibold rounded-full">
                          {item.duration}
                        </span>
                      </div>
                      <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white mb-2">
                        {item.title}
                      </h3>
                      <p className="text-base font-medium text-blue-600 dark:text-blue-400 mb-1">
                        {item.organization}
                      </p>
                      <p className="text-sm text-slate-500 dark:text-slate-500 mb-3">
                        {item.location}
                      </p>
                      <p className="text-sm md:text-base text-slate-600 dark:text-slate-400">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div className="mt-16 md:mt-20">
            <div className="text-center mb-8 md:mb-12">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                <span className="text-blue-600 dark:text-blue-400">Certifications</span>
              </h3>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {certifications.map((cert, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                      <Award size={24} className="text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-base md:text-lg font-bold text-slate-900 dark:text-white mb-1">
                        {cert.name}
                      </h4>
                      <p className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-1">
                        {cert.issuer}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-500">
                        {cert.date}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;