import React, { useState } from "react";
import { useInView } from "react-intersection-observer";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

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

const projects: Project[] = [
  {
    title: "5tar AI",
    description:
      "A collaborative AI prompt engineering platform built with a team at Chingu. Users can create prompts by filling structured fields and interact with Gemini API. Features include prompt management, API integration, and real-time responses.",
    tech: ["Django", "DRF", "Gemini API", "PostgreSQL", "JWT"],
    gradient: "from-[#00A67E] to-[#4285F4]",
    features: [
      "Google AI Integration",
      "Prompt Engineering",
      "Real-time Responses",
    ],
    role: "Backend Developer",
    demoLink: "https://5starai.netlify.app/",
    githubLink: "https://github.com/chingu-voyages/V54-tier2-team-21/",
    images: [
      {
        src: fiveStarAiHome,
        alt: "5tar AI Home Page",
      },
      {
        src: fiveStarAiBuildPrompt,
        alt: "Prompt Creation Interface",
      },
    ],
  },
  {
    title: "Resource Helper",
    description:
      "A collaborative platform to discover resources. Implemented authentication via Google/GitHub, resource management system with ratings and resource saving functionality",
    tech: ["Django", "DRF", "React", "OAuth", "PostgreSQL"],
    gradient: "from-[#3178C6] to-[#61DAFB]",
    features: ["Social Auth", "Resource Rating", "Bookmarking"],
    role: "Full Stack Developer",
    githubLink: "https://github.com/chingu-voyages/V55-tier2-team-23",
    images: [
      {
        src: resourceHelperHome,
        alt: "Resource Helper Home",
      },
      {
        src: resourceHelperLogin,
        alt: "Resource Helper Login",
      },
    ],
  },
  {
    title: "Clockly",
    description:
      "Advanced booking platform allowing service providers to manage their services and availability. Features include dynamic scheduling, email notifications, and service management.",
    tech: ["Django", "DRF", "React", "Celery", "Redis", "JWT"],
    gradient: "from-[#41B883] to-[#34495E]",
    features: [
      "Email Notifications",
      "Dynamic Scheduling",
      "Service Management",
    ],
    role: "Full Stack Developer",
    githubLink: "https://github.com/TheDrakl/Clockly",
    images: [
      {
        src: clocklyProfile,
        alt: "Profile Management",
      },
      {
        src: clocklySelectService,
        alt: "Service Selection",
      },
      {
        src: clocklyAvailableTimes,
        alt: "Available Time Slots",
      },
      {
        src: clocklyEmailSent,
        alt: "Email Notification",
      },
      {
        src: clocklyBookingConfirmed,
        alt: "Booking Confirmation",
      },
    ],
  },
  {
    title: "GreenCarLane (Upcoming)",
    description:
      "Upcoming project focused on sustainable transportation solutions. Will be working on developing and maintaining web systems with Django and DRF.",
    tech: ["Django", "GraphQL", "MongoDB"],
    gradient: "from-[#2E7D32] to-[#43A047]",
    features: ["System Architecture", "Deployment"],
    role: "Backend Developer Intern",
    images: [],
  },
];

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ isVisible }) => {
  const [ref, inView] = useInView({
    threshold: [0.1, 0.2, 0.3],
    rootMargin: "-20% 0px -20% 0px",
  });

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const getContentAnimationClasses = () => {
    if (!isVisible) return "opacity-0 transform translate-y-10";
    if (!inView) return "opacity-30 transform translate-x-0 blur-sm";
    return "opacity-100 transform translate-x-0";
  };

  const nextImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) =>
        prev === selectedProject.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? selectedProject.images.length - 1 : prev - 1
      );
    }
  };

  return (
    <>
      <div
        ref={ref}
        id="projects"
        className={`text-2xl font-inter space-y-12 text-center min-h-[60vh] flex flex-col justify-center transition-all duration-500 pb-24 ${getContentAnimationClasses()}`}
      >
        <div className="w-full max-w-[1200px] mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <div
                key={project.title}
                className="group relative p-8 rounded-2xl bg-gradient-to-br from-bgDarker to-[#1C1C22] border border-[#2E2E34] shadow-lg overflow-hidden h-full flex flex-col"
              >
                <div
                  className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-5 transition-opacity duration-500"
                  style={{
                    backgroundImage: `linear-gradient(${project.gradient})`,
                  }}
                ></div>
                <div className="relative z-10 flex flex-col flex-grow">
                  <div className="mb-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex flex-col items-start">
                        <h3 className="text-2xl font-bold text-white">
                          {project.title}
                        </h3>
                        <span className="text-sm text-gray-400 mt-2">
                          {project.role}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
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
                              className="w-4 h-4"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <rect
                                x="3"
                                y="3"
                                width="18"
                                height="18"
                                rx="2"
                                ry="2"
                              />
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
                            <FaExternalLinkAlt className="w-4 h-4" />
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
                            <FaGithub className="w-4 h-4" />
                          </a>
                        )}
                      </div>
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
      {selectedProject && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="relative max-w-[90vw] max-h-[90vh] bg-[#1C1C22 ] rounded-2xl p-6 shadow-2xl w-[50%]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              onClick={() => setSelectedProject(null)}
            >
              <IoClose className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-semibold mb-4">
              {selectedProject.title}
            </h2>
            {selectedProject.images.length > 0 && (
              <div className="relative">
                <img
                  src={selectedProject.images[currentImageIndex].src}
                  alt={selectedProject.images[currentImageIndex].alt}
                  className="rounded-lg max-h-[70vh] object-contain mx-auto"
                />
                {selectedProject.images.length > 1 && (
                  <>
                    <button
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                      onClick={prevImage}
                    >
                      ←
                    </button>
                    <button
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                      onClick={nextImage}
                    >
                      →
                    </button>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {selectedProject.images.map((_, index) => (
                        <button
                          key={index}
                          className={`w-2 h-2 rounded-full transition-colors ${
                            index === currentImageIndex
                              ? "bg-white"
                              : "bg-white/30 hover:bg-white/50"
                          }`}
                          onClick={() => setCurrentImageIndex(index)}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectsSection;
