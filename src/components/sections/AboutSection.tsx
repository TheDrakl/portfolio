import React from 'react';
import { useInView } from 'react-intersection-observer';

interface AboutSectionProps {
  isVisible: boolean;
}

const AboutSection: React.FC<AboutSectionProps> = ({ isVisible }) => {
  const [ref] = useInView({
    threshold: [0.15, 0.3, 0.45, 0.6],
    rootMargin: "-20% 0px -20% 0px",
    initialInView: true,
  });

  const getContentAnimationClasses = () => {
    if (!isVisible) return "opacity-0 transform translate-y-10";
    return "opacity-100 transform translate-x-0";
  };

  return (
    <div
      ref={ref}
      id='about'
      className={`text-2xl md:text-3xl font-inter leading-relaxed space-y-8 md:space-y-12 text-center mt-[10vh] md:mt-[20vh] min-h-[50vh] flex flex-col justify-center transition-all duration-500 px-4 ${getContentAnimationClasses()}`}
    >
      <div className="text-base sm:text-lg md:text-[1.5rem] font-[400] text-[#D4D4D4] font-inter leading-relaxed space-y-4 md:space-y-6 items-center text-center m-auto mt-[15%] md:mt-[25%] max-w-[90%] md:max-w-[80%]">
        <p>
          Hey, I'm <span className="text-lightGreen font-semibold">Denys</span>, a
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
  );
};

export default AboutSection; 