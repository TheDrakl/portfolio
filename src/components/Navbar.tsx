import { useState } from "react";

function Navbar() {
  const [activeLink, setActiveLink] = useState("home");

  const handleLinkClick = (link: string) => {
    setActiveLink(link);
  };

  return (
    <nav className="flex flex-row justify-between gap-40 font-inter items-center">
      <div>
        <a href="#home" onClick={() => handleLinkClick('home')} className="text-[28px] font-poppins font-[600] cursor-pointer">
          DENYS
        </a>
      </div>

      <div className="flex gap-12">
        {["home", "projects", "skills", "resume"].map((link) => (
          <a
            key={link}
            href={`#${link}`}
            onClick={() => handleLinkClick(link)}
            className={`nav-link text-white hover:text-lightGreen ${
              activeLink === link ? "active text-lightGreen underline decoration-[2.5px] underline-offset-4" : ""
            }`}
          >
            {link.charAt(0).toUpperCase() + link.slice(1)}
          </a>
        ))}
      </div>

      <div>
        <button className="relative rounded-[60px] p-[1px] bg-gradient-to-r from-[#6DDCFF] to-[#7F60F9]">
          <span className="block rounded-[60px] px-8 py-[0.8rem] bg-bgDark text-white font-poppins font-[600] hover:bg-transparent">
            Contact Me
          </span>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
