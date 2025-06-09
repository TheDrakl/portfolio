import React, { useState } from "react";
import { useInView } from "react-intersection-observer";
import AboutSection from "./sections/AboutSection";
import ExperienceSection from "./sections/ExperienceSection";
import SkillsSection from "./sections/SkillsSection";
import ProjectsSection from "./sections/ProjectsSection";

function Portfolio() {
  const [currentSection, setCurrentSection] = useState("About Me");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [slideDirection, setSlideDirection] = useState<"enter" | "exit">("enter");
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

  const sectionOrder = ["About Me", "My Experience", "My Skills", "My Projects"];

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

      const transitionDelay = 200;

      setTimeout(() => {
        setCurrentSection(mostVisibleSection);
        setSlideDirection("enter");
        setViewedSections((prev) => new Set([...prev, mostVisibleSection]));

        setTimeout(() => {
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
    currentSection,
  ]);

  const getTitleAnimationClasses = () => {
    if (!isTransitioning) return "opacity-100 transform translate-x-0";
    if (slideDirection === "exit") return "opacity-0 transform translate-x-full";
    return "opacity-0 transform -translate-x-full";
  };

  return (
    <section className="flex md:flex-row flex-col text-white min-h-[200vh] mt-[10%] px-8 max-w-[2560px] m-auto">
      <div className="w-1/3 relative hidden md:block">
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

      <div className="w-full md:w-2/3 space-y-[15vh] md:space-y-[30vh] py-8 md:py-16">
        <div>
          <div className="md:hidden text-center mb-4">
            <h2 className="text-4xl font-bold">
              About <span className="text-lightGreen">Me</span>
            </h2>
          </div>
          <div ref={aboutRef}>
            <AboutSection isVisible={currentSection === "About Me"} />
          </div>
        </div>

        <div>
          <div className="md:hidden text-center mb-4">
            <h2 className="text-4xl font-bold">
              My <span className="text-lightGreen">Experience</span>
            </h2>
          </div>
          <div ref={experienceRef}>
            <ExperienceSection isVisible={currentSection === "My Experience"} />
          </div>
        </div>

        <div>
          <div className="md:hidden text-center mb-4">
            <h2 className="text-4xl font-bold">
              My <span className="text-lightGreen">Skills</span>
            </h2>
          </div>
          <div ref={skillsRef}>
            <SkillsSection isVisible={currentSection === "My Skills"} />
          </div>
        </div>

        <div>
          <div className="md:hidden text-center mb-4">
            <h2 className="text-4xl font-bold">
              My <span className="text-lightGreen">Projects</span>
            </h2>
          </div>
          <div ref={projectsRef}>
            <ProjectsSection isVisible={currentSection === "My Projects"} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Portfolio;
