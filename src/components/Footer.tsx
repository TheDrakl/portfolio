import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa6";

function Footer() {

    const scrollToTop = () => {
        window.scrollTo(0, 0)
    }

  return (
    <div className="relative pt-20 bg-grid px-4">
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-[#1C1C22] to-transparent z-10 pointer-events-none" />

      <div className="absolute top-0 left-0 h-full w-40 bg-gradient-to-r from-[#1C1C22] to-transparent z-10 pointer-events-none" />

      <div className="absolute top-0 right-0 h-full w-40 bg-gradient-to-l from-[#1C1C22] to-transparent z-10 pointer-events-none" />

      <footer className="relative z-20 flex justify-between max-w-[1440px] m-auto px-6 py-10 -mb-[20px] bg-transparent items-center">
        <div>
          <button onClick={scrollToTop} className="text-[26px] font-bold text-white">Denys</button>
        </div>
        <div className="flex flex-row items-center gap-4">
          <a
            href="https://github.com/TheDrakl"
            target="_blank"
            rel="noopener noreferrer"
            className="group border border-lightGreen rounded-full p-3 transition-all duration-300 hover:bg-lightGreen/20"
          >
            <FaGithub className="w-6 h-6 text-lightGreen group-hover:scale-110 transition-transform" />
          </a>
          <a
            href="https://www.linkedin.com/in/denys-melnyk7/"
            target="_blank"
            rel="noopener noreferrer"
            className="group border border-lightGreen rounded-full p-3 transition-all duration-300 hover:bg-lightGreen/20"
          >
            <FaLinkedin className="w-6 h-6 text-lightGreen group-hover:scale-110 transition-transform" />
          </a>
          <a
            href="mailto:denismelnyk@icloud.com"
            className="group border border-lightGreen rounded-full p-3 transition-all duration-300 hover:bg-lightGreen/20"
          >
            <FaEnvelope className="w-6 h-6 text-lightGreen group-hover:scale-110 transition-transform" />
          </a>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
