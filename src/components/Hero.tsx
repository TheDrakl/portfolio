import { useEffect, useState } from "react";
import { FaEnvelope } from "react-icons/fa6";
import heroImg from "../assets/hero-img.jpeg";
import { FaDownload, FaGithub, FaLinkedin } from "react-icons/fa";
import cvFile from "../assets/CV.pdf";

type CounterProps = {
  target: number;
  duration?: number;
};

function Counter({ target, duration = 2000 }: CounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = target / (duration / 30);
    const interval = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(interval);
      } else {
        setCount(Math.floor(start));
      }
    }, 30);

    return () => clearInterval(interval);
  }, [target, duration]);

  return (
    <h2 className="text-[60px] font-[700]">
      {count}
      {target % 1 !== 0 ? "+" : ""}
    </h2>
  );
}

function Hero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative w-full min-h-[47vh] flex flex-col items-start justify-between text-white bg-grid overflow-hidden px-4 md:px-12 font-montserrat">
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-[#1C1C22] to-transparent z-10" />
      <div className="absolute top-0 left-0 w-20 md:w-40 h-full bg-gradient-to-r from-[#1C1C22] to-transparent z-10" />
      <div className="absolute top-0 right-0 w-20 md:w-40 h-full bg-gradient-to-l from-[#1C1C22] to-transparent z-10" />

      <div
        className={`relative w-full max-w-[1440px] mx-auto flex flex-col md:flex-row items-center md:items-start md:justify-between mt-[5vh] md:mt-[10vh] transition-all duration-700 ease-out ${
          loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="relative w-[220px] h-[220px] sm:w-[280px] sm:h-[280px] md:w-[400px] md:h-[400px] rounded-full overflow-hidden border-4 border-[#00ff95] shadow-lg shadow-[#00ff9570] transition-transform duration-500 hover:scale-105 hover:shadow-[0_0_20px_#00ff95]">
          <img
            src={heroImg}
            alt="hero img"
            className="w-full h-full object-cover object-[60%_40%] scale-110 transform origin-top"
            draggable="false"
          />
        </div>
        <div className="w-full md:w-2/4 text-center md:text-right mt-6 md:mt-10">
          <h1 className="text-[32px] sm:text-[40px] md:text-[80px] font-bold m-0 leading-none">Hello, I'm</h1>
          <h1 className="text-[32px] sm:text-[40px] md:text-[80px] font-bold text-lighterGreen m-0 animate-pulse">
            Denys Melnyk
          </h1>
          <p className="mt-3 md:mt-6 text-base md:text-lg text-white">Python Developer • Django</p>
          <div className="flex flex-col md:flex-row justify-center md:justify-end items-center mt-6 md:mt-12 gap-4 md:gap-6">
            <div className="flex flex-row items-center gap-3 md:gap-4 md:mr-4">
              <a
                href="https://github.com/TheDrakl"
                target="_blank"
                rel="noopener noreferrer"
                className="group border border-lightGreen rounded-full p-2.5 md:p-3 transition-all duration-300 hover:bg-lightGreen/20"
              >
                <FaGithub className="w-5 h-5 md:w-6 md:h-6 text-lightGreen group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="https://www.linkedin.com/in/denys-melnyk7/"
                target="_blank"
                rel="noopener noreferrer"
                className="group border border-lightGreen rounded-full p-2.5 md:p-3 transition-all duration-300 hover:bg-lightGreen/20"
              >
                <FaLinkedin className="w-5 h-5 md:w-6 md:h-6 text-lightGreen group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="mailto:denismelnyk@icloud.com"
                className="group border border-lightGreen rounded-full p-2.5 md:p-3 transition-all duration-300 hover:bg-lightGreen/20"
              >
                <FaEnvelope className="w-5 h-5 md:w-6 md:h-6 text-lightGreen group-hover:scale-110 transition-transform" />
              </a>
            </div>
            <a
              href={cvFile}
              download="Denys_Melnyk_CV.pdf"
              className="relative rounded-[60px] p-[1px] bg-gradient-to-r from-[#6DDCFF] to-[#7F60F9] w-full sm:w-auto"
            >
              <span className="flex items-center justify-center gap-2 rounded-[60px] px-8 py-[0.8rem] md:px-10 md:py-[0.9rem] bg-bgDark text-white font-poppins font-[600] hover:bg-transparent transition-all duration-300">
                Download CV <FaDownload />
              </span>
            </a>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-y-6 md:flex w-full max-w-[1280px] m-auto mt-12 md:mt-[15vh] mb-[5vh] items-center text-center md:justify-between md:gap-0">
        <div className="flex flex-row items-center justify-center md:justify-start">
          <Counter target={2} />
          <h2 className="text-[14px] md:text-[16px] text-left ml-3 md:ml-4">
            Years of
            <br /> experience
          </h2>
        </div>
        <div className="flex flex-row items-center justify-center md:justify-start">
          <Counter target={5} />
          <h2 className="text-[14px] md:text-[16px] text-left ml-3 md:ml-4">
            Projects
            <br /> completed
          </h2>
        </div>
        <div className="flex flex-row items-center justify-center md:justify-start">
          <Counter target={3} />
          <h2 className="text-[14px] md:text-[16px] text-left ml-3 md:ml-4">
            Programming
            <br /> languages
          </h2>
        </div>
        <div className="flex flex-row items-center justify-center md:justify-start">
          <Counter target={2} />
          <h2 className="text-[14px] md:text-[16px] text-left ml-3 md:ml-4">
            Achieved
            <br /> certificates
          </h2>
        </div>
      </div>
    </section>
  );
}

export default Hero;
