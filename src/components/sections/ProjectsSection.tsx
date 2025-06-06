import { useState } from "react";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { useInView } from "react-intersection-observer";
import { projects } from "../../data/projects";

// Project Images
import fiveStarAiHome from "../../assets/projects/5star-ai/home.png";
import fiveStarAiBuildPrompt from "../../assets/projects/5star-ai/buildprompt.png";
import resourceHelperHome from "../../assets/projects/resource-helper/home.png";
import resourceHelperLogin from "../../assets/projects/resource-helper/login.png";
import clocklyProfile from "../../assets/projects/clockly/profile.png";
import clocklyBookingConfirmed from "../../assets/projects/clockly/booking-confirmed-client.png";
import clocklyEmailSent from "../../assets/projects/clockly/email-sent.png";
import clocklyAvailableTimes from "../../assets/projects/clockly/available-times-client.png";
import clocklySelectService from "../../assets/projects/clockly/select-service-client.png";

interface ProjectImage {
  src: string;
  alt: string;
}

interface Project {
  title: string;
  description: string;
  tech: string[];
  gradient: string;
  features: string[];
  role: string;
  demoLink?: string;
  githubLink?: string;
  images: ProjectImage[];
}

interface ProjectsSectionProps {
  isVisible: boolean;
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ isVisible }) => {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(
    null
  );
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const getContentAnimationClasses = () => {
    if (!isVisible) return "opacity-0 transform translate-y-10";
    if (!inView) return "opacity-30 transform translate-x-0 blur-sm";
    return "opacity-100 transform translate-x-0";
  };

  return (
    <>
      <div
        ref={ref}
        id="projects"
        className={`text-2xl font-inter space-y-12 text-center min-h-[60vh] flex flex-col justify-center transition-all duration-500 pb-24 ${getContentAnimationClasses()}`}
      >
        <div className="w-full max-w-[1200px] mx-auto px-4 md:px-8">
          <h2 className="text-3xl font-bold text-white mb-8 md:hidden">My Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <div
                key={project.title}
                className="group relative p-6 md:p-8 rounded-2xl bg-gradient-to-br from-bgDarker to-[#1C1C22] border border-[#2E2E34] shadow-lg overflow-hidden h-full flex flex-col"
              >
                <div
                  className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-5 transition-opacity duration-500"
                  style={{
                    backgroundImage: `linear-gradient(${project.gradient})`,
                  }}
                ></div>

                <div className="relative z-10 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-white text-left">
                        {project.title}
                      </h3>
                      <span className="text-sm text-gray-400 mt-2 block text-left">
                        {project.role}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      {project.images.length > 0 && (
                        <button
                          onClick={() => {
                            setSelectedProject(project);
                            setCurrentImageIndex(0);
                          }}
                          className="text-gray-400 hover:text-white transition-colors"
                          title="View Screenshots"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                            <circle cx="8.5" cy="8.5" r="1.5" />
                            <polyline points="21 15 16 10 5 21" />
                          </svg>
                        </button>
                      )}
                      {project.demoLink && (
                        <a
                          href={project.demoLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-white transition-colors"
                          title="Live Demo"
                        >
                          <FaExternalLinkAlt className="w-5 h-5" />
                        </a>
                      )}
                      {project.githubLink && (
                        <a
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-white transition-colors"
                          title="View Code"
                        >
                          <FaGithub className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  </div>

                  <p className="text-base text-gray-400 mb-8 text-left">
                    {project.description}
                  </p>

                  <div className="mt-auto space-y-6">
                    <div className="flex flex-wrap gap-2">
                      {project.features.map((feature) => (
                        <span
                          key={feature}
                          className="text-xs text-gray-400 px-3 py-1"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-sm rounded-lg bg-[#1A1A1A] text-lightGreen border border-lightGreen/10"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Project Modal */}
      {selectedProject && selectedProject.images.length > 0 && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#1C1C22] rounded-2xl w-full max-w-4xl overflow-hidden">
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-white">
                  {selectedProject.title} Screenshots
                </h3>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-gray-400 hover:text-white"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="relative aspect-video">
                <img
                  src={selectedProject.images[currentImageIndex]}
                  alt={`${selectedProject.title} screenshot ${currentImageIndex + 1}`}
                  className="w-full h-full object-contain rounded-lg"
                />
                {selectedProject.images.length > 1 && (
                  <>
                    <button
                      onClick={() =>
                        setCurrentImageIndex(
                          (prev) =>
                            (prev - 1 + selectedProject.images.length) %
                            selectedProject.images.length
                        )
                      }
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() =>
                        setCurrentImageIndex(
                          (prev) => (prev + 1) % selectedProject.images.length
                        )
                      }
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </>
                )}
              </div>
              {selectedProject.images.length > 1 && (
                <div className="mt-4 flex justify-center gap-2">
                  {selectedProject.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2.5 h-2.5 rounded-full ${
                        currentImageIndex === index
                          ? "bg-lightGreen"
                          : "bg-gray-600"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectsSection;
