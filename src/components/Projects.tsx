'use client';

import { motion } from 'framer-motion';
import { projects } from '../data/portfolio';
import { TiltCard } from './TiltCard';
import { SectionHeading } from './SectionHeading';

export function Projects() {
  return (
    <section id="projects" className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title="Projects"
          subtitle="Complete applications shipped end-to-end with measurable impact"
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="space-y-8"
        >
          {projects.map((project) => (
            <TiltCard key={project.id} className="overflow-hidden">
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-full text-xs font-medium bg-[#7c5cff]/10 border border-[#7c5cff]/30 text-[#00e0c6]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <h3 className="font-heading text-2xl md:text-3xl font-bold text-white">
                    {project.title}
                  </h3>

                  <p className="text-gray-300 text-lg leading-relaxed">
                    {project.description}
                  </p>

                  <div className="space-y-3">
                    {project.highlights.map((highlight, highlightIndex) => (
                      <motion.div
                        key={highlightIndex}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-50px' }}
                        transition={{ duration: 0.5, ease: 'easeOut', delay: highlightIndex * 0.1 }}
                        className="flex items-start gap-3 p-4 rounded-xl bg-[#0f0f19]/50 border border-[#7c5cff]/10 hover:border-[#7c5cff]/30 transition-all duration-300"
                      >
                        <div className="w-6 h-6 mt-0.5 flex-shrink-0 flex items-center justify-center">
                          <svg className="w-5 h-5 text-[#00e0c6]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <p className="text-gray-300 leading-relaxed">{highlight}</p>
                      </motion.div>
                    ))}
                  </div>

                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-xl border border-[#7c5cff]/30 text-white font-semibold hover:border-[#7c5cff]/60 hover:bg-[#7c5cff]/10 transition-all duration-300"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                    </svg>
                    View on GitHub
                  </a>
                </div>

                <div className="lg:col-span-1">
                  <div className="aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-[#7c5cff]/20 to-[#00e0c6]/20 border border-[#7c5cff]/20 flex items-center justify-center relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#7c5cff]/10 to-[#00e0c6]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden="true" />
                    <div className="relative z-10 text-center p-8">
                      <svg className="w-16 h-16 md:w-24 md:h-24 mx-auto mb-4 text-[#7c5cff]/50 group-hover:text-[#00e0c6]/80 transition-colors duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                      <p className="text-gray-500 text-sm font-medium">Project Preview</p>
                      <p className="text-gray-700 text-xs mt-1">Add screenshot or demo</p>
                    </div>
                  </div>
                </div>
              </div>
            </TiltCard>
          ))}
        </motion.div>
      </div>
    </section>
  );
}