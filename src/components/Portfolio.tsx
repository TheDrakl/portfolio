import React, { useState } from "react";
import { useInView } from "react-intersection-observer";
import AboutSection from "./sections/AboutSection";
import ExperienceSection from "./sections/ExperienceSection";
import SkillsSection from "./sections/SkillsSection";
import ProjectsSection from "./sections/ProjectsSection";
import { IoClose } from "react-icons/io5";

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
  const [viewedSections, setViewedSections] = useState<Set<string>>(
    new Set(["About Me"])
  );

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

      <div className="w-2/3 space-y-[30vh] py-16">
        <div ref={aboutRef}>
          <AboutSection isVisible={currentSection === "About Me"} />
        </div>

        <div ref={experienceRef}>
          <ExperienceSection isVisible={currentSection === "My Experience"} />
        </div>

        <div ref={skillsRef}>
          <SkillsSection isVisible={currentSection === "My Skills"} />
        </div>

        <div ref={projectsRef}>
          <ProjectsSection isVisible={currentSection === "My Projects"} />
        </div>
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="relative max-w-[90vw] max-h-[90vh] bg-[#1C1C22] rounded-2xl p-6 shadow-2xl w-[50%]"
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
