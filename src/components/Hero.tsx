import heroImg from "../assets/hero-img.jpeg";
import { FaDownload } from "react-icons/fa";

function Hero() {
  return (
    <section className="relative w-full min-h-[50vh] flex items-start justify-between text-white bg-grid overflow-hidden px-12 font-montserrat">
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-[#1C1C22] to-transparent z-10" />
      <div className="absolute top-0 left-0 w-40 h-full bg-gradient-to-r from-[#1C1C22] to-transparent z-10" />
      <div className="absolute top-0 right-0 w-40 h-full bg-gradient-to-l from-[#1C1C22] to-transparent z-10" />

      <div className="relative w-full max-w-[1280px] mx-auto flex justify-between mt-[10vh]">
        <div className="relative w-[400px] h-[400px] rounded-full overflow-hidden border-4 border-[#00ff95] shadow-lg shadow-[#00ff9570]">
          <img
            src={heroImg}
            alt=""
            className="w-full h-full object-cover object-[50%_30%] scale-110 transform origin-top"
          />
        </div>
        <div className="w-2/4 text-right mt-10">
          <h1 className="text-[80px] font-bold m-0 leading-none">Hello, I'm</h1>
          <h1 className="text-[80px] font-bold text-lighterGreen m-0 animate-pulse">
            Denys Melnyk
          </h1>
          <p className="mt-2 text-lg text-gray-300">
            Python Developer • Django
          </p>
          <button className="relative rounded-[60px] p-[1px] bg-gradient-to-r from-[#6DDCFF] to-[#7F60F9] mt-6">
            <span className="flex items-center justify-center gap-2 rounded-[60px] px-12 py-[1rem] bg-bgDark text-white font-poppins font-[600] hover:bg-transparent">
              Download CV <FaDownload />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
export default Hero;
