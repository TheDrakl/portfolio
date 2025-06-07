import React from 'react';
import { useInView } from 'react-intersection-observer';
import {
  FaPython,
  FaReact,
  FaDocker,
  FaGit,
  FaWordpress,
  FaLinux,
  FaHtml5,
  FaCss3Alt,
  FaPhp,
  FaJs,
} from "react-icons/fa";
import {
  SiDjango,
  SiPostgresql,
  SiMysql,
  SiRedis,
  SiCelery,
  SiTypescript,
  SiTailwindcss,
  SiNginx,
} from "react-icons/si";

interface SkillsProps {
  isVisible: boolean;
}

const skillCategories = [
  {
    title: "Core Stack",
    theme: "from-[#3178C6] to-[#61DAFB]",
    skills: [
      { name: "Python", icon: FaPython, level: "Advanced" },
      { name: "Django", icon: SiDjango, level: "Advanced" },
      { name: "React", icon: FaReact, level: "Basic" },
      { name: "TypeScript", icon: SiTypescript, level: "Basic" },
      { name: "JavaScript", icon: FaJs, level: "Intermediate" },
    ],
  },
  {
    title: "Data & Storage",
    theme: "from-[#336791] to-[#DC382D]",
    skills: [
      { name: "PostgreSQL", icon: SiPostgresql, level: "Advanced" },
      { name: "MySQL", icon: SiMysql, level: "Intermediate" },
      { name: "Redis", icon: SiRedis, level: "Intermediate" },
      { name: "Celery", icon: SiCelery, level: "Intermediate" },
    ],
  },
  {
    title: "Frontend Craft",
    theme: "from-[#E34F26] to-[#38BDF8]",
    skills: [
      { name: "HTML5", icon: FaHtml5, level: "Advanced" },
      { name: "CSS3", icon: FaCss3Alt, level: "Advanced" },
      { name: "TailwindCSS", icon: SiTailwindcss, level: "Advanced" },
      { name: "WordPress", icon: FaWordpress, level: "Intermediate" },
      { name: "PHP", icon: FaPhp, level: "Basic" },
    ],
  },
  {
    title: "DevOps & Tools",
    theme: "from-[#2496ED] to-[#FF4F64]",
    skills: [
      { name: "Docker", icon: FaDocker, level: "Intermediate" },
      { name: "Git", icon: FaGit, level: "Advanced" },
      { name: "Nginx", icon: SiNginx, level: "Basic" },
      { name: "Linux", icon: FaLinux, level: "Intermediate" },
    ],
  },
];

const SkillsSection: React.FC<SkillsProps> = ({ isVisible }) => {
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
      id='skills'
      className={`text-2xl font-inter space-y-12 md:space-y-16 text-center min-h-[70vh] flex flex-col justify-center transition-all duration-500 px-4 ${getContentAnimationClasses()}`}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 lg:gap-16 max-w-[1400px] mx-auto">
        {skillCategories.map((category) => (
          <div
            key={category.title}
            className="p-4 sm:p-6 md:p-12 rounded-2xl bg-gradient-to-br from-bgDarker to-[#1C1C22] border border-[#2E2E34] shadow-lg relative group overflow-hidden"
          >
            <div
              className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none"
              style={{
                backgroundImage: `linear-gradient(${category.theme})`,
              }}
            ></div>

            <h3 className="text-xl sm:text-2xl md:text-3xl text-white font-semibold mb-6 sm:mb-8 md:mb-12 relative">
              <span
                className="bg-clip-text text-white bg-gradient-to-r pb-1"
                style={{
                  backgroundImage: `linear-gradient(${category.theme})`,
                }}
              >
                {category.title}
              </span>
            </h3>

            <div className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-12">
              {category.skills.map((skill) => (
                <div
                  key={skill.name}
                  className="group/icon relative flex items-center justify-center h-12 sm:h-16 md:h-24"
                >
                  <div className="relative">
                    <skill.icon className="w-7 h-7 sm:w-10 sm:h-10 md:w-16 md:h-16 text-gray-400 group-hover/icon:text-white transition-all duration-300 group-hover/icon:scale-110 relative z-10" />
                    <div className="absolute left-1/2 -translate-x-1/2 top-0 -translate-y-[calc(100%+0.75rem)] sm:-translate-y-[calc(100%+1rem)] md:-translate-y-[calc(100%+1.25rem)] w-max opacity-0 group-hover/icon:opacity-100 transition-all duration-300 pointer-events-none z-20">
                      <div className="bg-[#2A2A30]/95 backdrop-blur-sm text-white py-1.5 sm:py-2 md:py-3 px-3 sm:px-4 md:px-5 rounded-lg shadow-xl whitespace-nowrap border border-gray-700/50">
                        <div className="font-medium text-xs sm:text-sm md:text-base">{skill.name}</div>
                        <div className="text-[10px] sm:text-xs md:text-sm text-gray-400 mt-0.5 md:mt-1">
                          {skill.level}
                        </div>
                      </div>
                      <div className="w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 bg-[#2A2A30]/95 border-b border-r border-gray-700/50 absolute -bottom-1 sm:-bottom-1.5 md:-bottom-2 left-1/2 -translate-x-1/2 rotate-45"></div>
                    </div>
                    <div
                      className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover/icon:opacity-10 transition-opacity duration-300 rounded-full blur-md"
                      style={{
                        backgroundImage: `linear-gradient(${category.theme})`,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsSection; 