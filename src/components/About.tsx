import React, { useState } from "react";
import { useInView } from "react-intersection-observer";
import {
  FaPython,
  FaReact,
  FaDocker,
  FaGit,
  FaWordpress,
  FaLinux,
  FaJira,
  FaHtml5,
  FaCss3Alt,
  FaPhp,
  FaJs,
  FaExternalLinkAlt,
  FaGithub,
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
  SiPostman,
} from "react-icons/si";
import { TbApi } from "react-icons/tb";
import { IoClose } from "react-icons/io5";
import fiveStarAiHome from "../assets/projects/5star-ai/home.png"
import fiveStarImg from "../assets/projects/5star-ai/img.png"


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

function About() {
  const [currentSection, setCurrentSection] = useState("About Me");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [slideDirection, setSlideDirection] = useState<"enter" | "exit">(
    "enter"
  );
  const [contentVisible, setContentVisible] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const observerOptions = {
    threshold: [0.15, 0.3, 0.45, 0.6],
    rootMargin: "-20% 0px -20% 0px",
  };

  const [aboutRef, aboutInView, aboutEntry] = useInView({
    ...observerOptions,
    initialInView: true,
  });

  const [experienceRef, experienceInView, experienceEntry] =
    useInView(observerOptions);
  const [skillsRef, skillsInView, skillsEntry] = useInView(observerOptions);
  const [projectsRef, projectsInView, projectsEntry] = useInView({
    ...observerOptions,
    threshold: [0.1, 0.2, 0.3],
    rootMargin: "-20% 0px -20% 0px",
  });

  const [viewedSections, setViewedSections] = useState<Set<string>>(
    new Set(["About Me"])
  );

  const sectionOrder = [
    "About Me",
    "My Experience",
    "My Skills",
    "My Projects",
  ];

  React.useEffect(() => {
    const getIntersectionRatio = (
      entry: IntersectionObserverEntry | undefined | null
    ) => entry?.intersectionRatio || 0;

    const ratios = {
      "About Me": getIntersectionRatio(aboutEntry),
      "My Experience": getIntersectionRatio(experienceEntry),
      "My Skills": getIntersectionRatio(skillsEntry),
      "My Projects": getIntersectionRatio(projectsEntry),
    };

    const maxRatio = Math.max(...Object.values(ratios));
    const mostVisibleSection = Object.entries(ratios).find(
      ([_, ratio]) => ratio === maxRatio && ratio > 0.15
    )?.[0];

    if (mostVisibleSection && mostVisibleSection !== currentSection) {
      setIsTransitioning(true);
      setSlideDirection("exit");
      setContentVisible(false);

      const transitionDelay = 200;

      setTimeout(() => {
        setCurrentSection(mostVisibleSection);
        setSlideDirection("enter");
        setViewedSections((prev) => new Set([...prev, mostVisibleSection]));

        setTimeout(() => {
          setContentVisible(true);
          setIsTransitioning(false);
        }, transitionDelay);
      }, transitionDelay);
    }
  }, [
    aboutInView,
    experienceInView,
    skillsInView,
    projectsInView,
    aboutEntry,
    experienceEntry,
    skillsEntry,
    projectsEntry,
  ]);

  const getTitleAnimationClasses = () => {
    if (!isTransitioning) return "opacity-100 transform translate-x-0";
    if (slideDirection === "exit")
      return "opacity-0 transform translate-x-full";
    return "opacity-0 transform -translate-x-full";
  };

  const getContentAnimationClasses = (sectionId: string) => {
    if (!viewedSections.has(sectionId))
      return "opacity-0 transform translate-y-10";
    if (currentSection !== sectionId)
      return "opacity-30 transform translate-x-0 blur-sm";
    if (!contentVisible) return "opacity-0 transform translate-x-full";
    return "opacity-100 transform translate-x-0";
  };

  const projects: Project[] = [
    {
      title: "5tar AI",
      description:
        "A collaborative AI prompt engineering platform built with a team at Chingu. Users can create prompts by filling structured fields and interact with Gemini API. Features include prompt management, API integration, and real-time responses.",
      tech: ["Django", "React", "Gemini API", "PostgreSQL", "JWT"],
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
          src: fiveStarImg,
          alt: "Prompt Creation Interface",
        },
      ],
    },
    {
      title: "Resource Helper",
      description:
        "A collaborative platform for developers to share and discover resources. Implemented authentication via Google/GitHub, resource management system with ratings, and bookmarking functionality.",
      tech: ["Django", "React", "OAuth", "PostgreSQL", "Redis"],
      gradient: "from-[#3178C6] to-[#61DAFB]",
      features: ["Social Auth", "Resource Rating", "Bookmarking"],
      role: "Full Stack Developer",
      githubLink: "https://github.com/chingu-voyages/V55-tier2-team-23",
      images: [
        {
          src: "/projects/resource-helper/home.png",
          alt: "Resource Helper Home",
        },
        {
          src: "/projects/resource-helper/resources.png",
          alt: "Resource Listing",
        },
      ],
    },
    {
      title: "Clockly",
      description:
        "Advanced booking platform allowing service providers to manage their services and availability. Features include dynamic scheduling, email notifications, and service management.",
      tech: ["Django", "React", "Celery", "Redis", "JWT"],
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
          src: "/projects/booking/calendar.png",
          alt: "Booking Calendar",
        },
        {
          src: "/projects/booking/services.png",
          alt: "Service Management",
        },
      ],
    },
    {
      title: "GreenCarLane (Upcoming)",
      description:
        "Upcoming project focused on sustainable transportation solutions. Will be working on developing and maintaining web systems with Django and DRF.",
      tech: ["Django", "DRF", "PostgreSQL", "Docker"],
      gradient: "from-[#2E7D32] to-[#43A047]",
      features: ["RESTful APIs", "System Architecture", "Deployment"],
      role: "Backend Developer Intern",
      images: [],
    },
  ];

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
    <section className="flex text-white min-h-[200vh] mt-[10%] px-8 max-w-[2560px] m-auto">
      <div className="w-1/3 relative">
        <div className="sticky top-1/2 transform -translate-y-1/2 flex flex-col items-center mt-[40%]">
          <h2
            className={`text-[60px] font-bold transition-all duration-500 ${getTitleAnimationClasses()}`}
          >
            {currentSection.split(" ")[0]}{" "}
            <span className="text-lightGreen">
              {currentSection.split(" ").slice(1).join(" ")}
            </span>
          </h2>

          <div className="mt-8 flex flex-col gap-3">
            {sectionOrder.map((section) => (
              <div
                key={section}
                className={`h-2 rounded-full transition-all duration-500 ${
                  currentSection === section
                    ? "bg-lightGreen w-24"
                    : viewedSections.has(section)
                    ? "bg-gray-500 w-16"
                    : "bg-gray-700 w-16"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
      {/* About me */}
      <div className="w-2/3 space-y-[30vh] py-16">
        <div
          id="about"
          ref={aboutRef}
          className={`text-3xl font-inter leading-relaxed space-y-12 text-center mt-[20vh] min-h-[50vh] flex flex-col justify-center transition-all duration-500 ${getContentAnimationClasses(
            "About Me"
          )}`}
        >
          <div className="text-[1.5rem] font-[400] text-[#D4D4D4] font-inter leading-relaxed space-y-6 items-center text-center m-auto mt-[25%]">
            <p>
              Hey, I'm{" "}
              <span className="text-lightGreen font-semibold">Denys</span>, a
              backend developer from Ukraine. I've been writing code for over 2
              years, mostly using Python and Django REST Framework.
            </p>
            <p>
              I work on things like API endpoints, PostgreSQL databases, and
              improving how fast and clean the backend runs. I also use React
              and TailwindCSS when the frontend needs it.
            </p>
          </div>
        </div>

        {/* Experience Section */}
        <div
          ref={experienceRef}
          className={`text-2xl font-inter leading-relaxed space-y-12 text-center min-h-[60vh] flex flex-col justify-center transition-all duration-500 ${getContentAnimationClasses(
            "My Experience"
          )}`}
        >
          <div className="max-w-[900px] mx-auto px-4">
            <div className="relative">
              <div className="absolute left-0 w-[2px] h-full bg-gradient-to-b from-lightGreen/50 via-lightGreen to-lightGreen/50 rounded-full"></div>
              <div className="space-y-12 ml-10">
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
                      {[
                        "Django",
                        "DRF",
                        "JWT",
                        "PostgreSQL",
                        "Docker",
                        "Git",
                      ].map((tech) => (
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
                      adjustments, and bug fixes. Developed custom PHP plugins
                      to extend functionality and refined site performance and
                      design.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {["WordPress", "PHP", "Docker", "MySQL"].map((tech) => (
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
                      Built full-stack web applications using Django, Django
                      Rest Framework and PostgreSQL. Collaborated with a remote
                      team to design and implement backend features using Django
                      and REST APIs, utilizing Jira for project management.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "Django",
                        "REST API",
                        "Celery",
                        "Redis",
                        "PostgreSQL",
                        "Git",
                      ].map((tech) => (
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

        {/* Skills Section */}
        <div
          id="skills"
          ref={skillsRef}
          className={`text-2xl font-inter space-y-16 text-center min-h-[70vh] flex flex-col justify-center transition-all duration-500 px-4 ${getContentAnimationClasses(
            "My Skills"
          )}`}
        >
          <div className="grid grid-cols-2 gap-16 max-w-[1400px] mx-auto">
            {[
              {
                title: "Core Stack",
                theme: "from-[#3178C6] to-[#61DAFB]",
                skills: [
                  { name: "Python", icon: FaPython, level: "Advanced" },
                  { name: "Django", icon: SiDjango, level: "Advanced" },
                  { name: "React", icon: FaReact, level: "Basic" },
                  { name: "TypeScript", icon: SiTypescript, level: "Basic" },
                  { name: "JavaScript", icon: FaJs, level: "Intermediate" },
                  { name: "REST APIs", icon: TbApi, level: "Advanced" },
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
                  {
                    name: "TailwindCSS",
                    icon: SiTailwindcss,
                    level: "Advanced",
                  },
                  {
                    name: "WordPress",
                    icon: FaWordpress,
                    level: "Intermediate",
                  },
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
                  { name: "Postman", icon: SiPostman, level: "Advanced" },
                  { name: "Jira", icon: FaJira, level: "Advanced" },
                ],
              },
            ].map((category) => (
              <div
                key={category.title}
                className="p-12 rounded-2xl bg-gradient-to-br from-bgDarker to-[#1C1C22] border border-[#2E2E34] shadow-lg relative group overflow-hidden"
              >
                <div
                  className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none"
                  style={{
                    backgroundImage: `linear-gradient(${category.theme})`,
                  }}
                ></div>

                <h3 className="text-white font-semibold text-3xl mb-12 relative">
                  <span
                    className="bg-clip-text text-white bg-gradient-to-r pb-1"
                    style={{
                      backgroundImage: `linear-gradient(${category.theme})`,
                    }}
                  >
                    {category.title}
                  </span>
                </h3>

                <div className="grid grid-cols-3 gap-12">
                  {category.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="group/icon relative flex items-center justify-center h-24"
                    >
                      <div className="relative">
                        <skill.icon className="w-16 h-16 text-gray-400 group-hover/icon:text-white transition-all duration-300 group-hover/icon:scale-110 relative z-10" />
                        <div className="absolute left-1/2 -translate-x-1/2 top-0 -translate-y-[calc(100%+1.25rem)] w-max opacity-0 group-hover/icon:opacity-100 transition-all duration-300 pointer-events-none z-20">
                          <div className="bg-[#2A2A30]/95 backdrop-blur-sm text-white py-3 px-5 rounded-lg shadow-xl whitespace-nowrap border border-gray-700/50">
                            <div className="font-medium text-base">
                              {skill.name}
                            </div>
                            <div className="text-sm text-gray-400 mt-1">
                              {skill.level}
                            </div>
                          </div>
                          <div className="w-4 h-4 bg-[#2A2A30]/95 border-b border-r border-gray-700/50 absolute -bottom-[8px] left-1/2 -translate-x-1/2 rotate-45"></div>
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

        {/* Projects Section */}
        <div
          id="projects"
          ref={projectsRef}
          className={`text-2xl font-inter space-y-12 text-center min-h-[60vh] flex flex-col justify-center transition-all duration-500 pb-24 ${getContentAnimationClasses(
            "My Projects"
          )}`}
        >
          <div className="max-w-[1100px] mx-auto px-4">
            <div className="grid grid-cols-2 gap-6">
              {projects.map((project) => (
                <div
                  key={project.title}
                  className="group relative p-6 rounded-2xl bg-gradient-to-br from-bgDarker to-[#1C1C22] border border-[#2E2E34] shadow-lg overflow-hidden h-full flex flex-col"
                >
                  <div
                    className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-5 transition-opacity duration-500"
                    style={{
                      backgroundImage: `linear-gradient(${project.gradient})`,
                    }}
                  ></div>
                  <div className="relative z-10 flex flex-col flex-grow">
                    <div className="mb-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex flex-col">
                          <h3 className="text-xl font-semibold">
                            <span
                              className="bg-clip-text text-white bg-gradient-to-r relative"
                              style={{
                                backgroundImage: `linear-gradient(${project.gradient})`,
                              }}
                            >
                              {project.title}
                            </span>
                          </h3>
                          <span className="text-sm text-gray-400 bg-[#1C1C22] px-3 py-1 rounded-full border border-gray-800 inline-block mt-2">
                            {project.role}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                          <div className="flex items-center gap-2 bg-[#1C1C22] px-3 py-1 rounded-lg border border-gray-800">
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
                    </div>
                    <p className="text-base text-gray-300 mb-4 text-left">
                      {project.description}
                    </p>
                    <div className="mt-auto space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {project.features.map((feature) => (
                          <span
                            key={feature}
                            className="text-xs text-gray-400 bg-[#1C1C22] px-2 py-1 rounded-full border border-gray-800"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech) => (
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
              ))}
            </div>
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
            className="relative max-w-[90vw] max-h-[90vh] bg-[#1C1C22] rounded-2xl p-6 shadow-2xl"
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
    </section>
  );
}

export default About;
