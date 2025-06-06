import React from "react";
import { useInView } from "react-intersection-observer";

interface ExperienceSectionProps {
  isVisible: boolean;
}

const ExperienceSection: React.FC<ExperienceSectionProps> = ({ isVisible }) => {
  const [ref, inView] = useInView({
    threshold: [0.15, 0.3, 0.45, 0.6],
    rootMargin: "-20% 0px -20% 0px",
  });

  const getContentAnimationClasses = () => {
    if (!isVisible) return "opacity-0 transform translate-y-10";
    if (!inView) return "opacity-30 transform translate-x-0 blur-sm";
    return "opacity-100 transform translate-x-0";
  };

  return (
    <div
      ref={ref}
      className={`text-2xl font-inter leading-relaxed space-y-12 text-center min-h-[60vh] flex flex-col justify-center transition-all duration-500 ${getContentAnimationClasses()}`}
    >
      <div className="max-w-[900px] mx-auto px-4">
        <div className="relative">
          <div className="absolute left-0 w-[2px] h-full bg-gradient-to-b from-lightGreen/50 via-lightGreen to-lightGreen/50 rounded-full"></div>
          <div className="space-y-12 ml-10">
            {/* GreenCarLane */}
            <div className="relative group">
              <div className="absolute -left-[3rem] w-5 h-5 rounded-full bg-lightGreen ring-6 ring-bgDarker group-hover:ring-[#1C1C22] transition-all duration-300"></div>
              <div className="p-6 rounded-2xl bg-gradient-to-br from-bgDarker to-[#1C1C22] border border-[#2E2E34] shadow-lg group-hover:border-lightGreen/20 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lightGreen font-semibold text-xl">
                    Backend Developer (Intern) at GreenCarLane
                  </h3>
                  <span className="text-gray-400 text-base">
                    2025 - Present
                  </span>
                </div>
                <p className="text-base text-gray-300 text-left mb-6">
                  Developing and supporting web systems with Django and DRF.
                  Writing RESTful APIs and handling deployment processes.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Django", "GraphQL", "JWT", "MongoDB", "Docker", "Git"].map(
                    (tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 text-sm rounded-lg bg-[#1C1C22] text-lightGreen border border-lightGreen/20"
                      >
                        {tech}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* WordPress */}
            <div className="relative group">
              <div className="absolute -left-[3rem] w-5 h-5 rounded-full bg-lightGreen ring-6 ring-bgDarker group-hover:ring-[#1C1C22] transition-all duration-300"></div>
              <div className="p-6 rounded-2xl bg-gradient-to-br from-bgDarker to-[#1C1C22] border border-[#2E2E34] shadow-lg group-hover:border-lightGreen/20 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lightGreen font-semibold text-xl">
                    Freelance WordPress Developer
                  </h3>
                  <span className="text-gray-400 text-base">
                    2025 - Present
                  </span>
                </div>
                <p className="text-base text-gray-300 text-left mb-6">
                  Successfully delivered two custom WordPress websites from
                  concept to deployment. Maintained and customized WordPress
                  websites with focus on theme customization, layout
                  adjustments, and bug fixes.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["WordPress", "PHP", "MySQL"].map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 text-sm rounded-lg bg-[#1C1C22] text-lightGreen border border-lightGreen/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Chingu */}
            <div className="relative group">
              <div className="absolute -left-[3rem] w-5 h-5 rounded-full bg-lightGreen ring-6 ring-bgDarker group-hover:ring-[#1C1C22] transition-all duration-300"></div>
              <div className="p-6 rounded-2xl bg-gradient-to-br from-bgDarker to-[#1C1C22] border border-[#2E2E34] shadow-lg group-hover:border-lightGreen/20 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lightGreen font-semibold text-xl">
                    Backend Developer at Chingu
                  </h3>
                  <span className="text-gray-400 text-base">
                    2024 - Present
                  </span>
                </div>
                <p className="text-base text-gray-300 text-left mb-6">
                  Built full-stack web applications using Django, Django Rest
                  Framework and PostgreSQL. Collaborated with a remote team to
                  design and implement backend features using Django and REST
                  APIs.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Django", "DRF", "PostgreSQL", "Git"].map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 text-sm rounded-lg bg-[#1C1C22] text-lightGreen border border-lightGreen/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceSection;
