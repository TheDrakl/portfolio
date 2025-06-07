import { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";

function Navbar() {
  const [activeLink, setActiveLink] = useState("home");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [emailStatus, setEmailStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });
  const modalRef = useRef<HTMLDivElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  const handleLinkClick = (link: string) => {
    setActiveLink(link);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        isModalOpen &&
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsModalOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isModalOpen]);

  useEffect(() => {
    document.body.style.overflow = isModalOpen || isMobileMenuOpen ? "hidden" : "auto";
  }, [isModalOpen, isMobileMenuOpen]);

  const resetForm = () => {
    if (formRef.current) {
      formRef.current.reset();
      setTimeout(() => {
        setEmailStatus({ type: null, message: "" });
      }, 3000);
    }
  };

  const handleSendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setEmailStatus({ type: null, message: "" });

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const userId = import.meta.env.VITE_EMAILJS_USER_ID;

    if (!serviceId || !templateId || !userId) {
      setEmailStatus({
        type: "error",
        message: "Email service is not properly configured. Please contact the administrator.",
      });
      setIsLoading(false);
      return;
    }

    try {
      const result = await emailjs.sendForm(
        serviceId,
        templateId,
        e.currentTarget,
        userId
      );

      if (result.text === "OK") {
        setEmailStatus({
          type: "success",
          message: "Message sent successfully! I'll get back to you soon.",
        });
        resetForm();
        setTimeout(() => setIsModalOpen(false), 2000);
      }
    } catch (error) {
      setEmailStatus({
        type: "error",
        message: "Failed to send message. Please try again later.",
      });
      console.error("Error sending email:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <nav className="flex flex-row justify-between gap-40 font-inter items-center max-w-[1440px] m-auto z-10 relative">
        <div>
          <a
            href="#home"
            onClick={() => handleLinkClick("home")}
            className="text-[30px] font-poppins font-[600] cursor-pointer transition-shadow duration-300"
            style={{
              textShadow: "0 0 0px rgba(0,0,0,0)",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.textShadow =
                "0 0 8px #a2f5a2, 0 0 20px #a2f5a2")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.textShadow = "0 0 0px rgba(0,0,0,0)")
            }
          >
            DENYS
          </a>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-12 shadow-lg bg-[#1a1a20] rounded-full py-4 px-8">
          {["home", "about", "projects", "skills"].map((link) => (
            <a
              key={link}
              href={`#${link}`}
              onClick={() => handleLinkClick(link)}
              className={`nav-link hover:text-lightGreen underline-offset-[6px] decoration-[2.5px] ${
                activeLink === link ? "text-lightGreen underline" : "text-white"
              }`}
            >
              {link.charAt(0).toUpperCase() + link.slice(1)}
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-white p-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isMobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        <div className="hidden md:block">
          <button
            onClick={() => setIsModalOpen(true)}
            className="relative rounded-[60px] p-[1px] bg-gradient-to-r from-[#6DDCFF] to-[#7F60F9]"
          >
            <span className="block rounded-[60px] px-8 py-[0.8rem] bg-bgDark text-white font-poppins font-[600] hover:bg-transparent">
              Contact Me
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-bgDark md:hidden z-20">
          <div className="flex justify-end p-4">
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-white p-2"
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
          <div className="flex flex-col items-center px-4 pt-16 gap-6">
            {["home", "about", "projects", "skills"].map((link) => (
              <a
                key={link}
                href={`#${link}`}
                onClick={() => {
                  handleLinkClick(link);
                  setIsMobileMenuOpen(false);
                }}
                className={`text-lg py-3 nav-link underline-offset-[6px] decoration-[2.5px] ${
                  activeLink === link ? "text-lightGreen underline" : "text-white"
                }`}
              >
                {link.charAt(0).toUpperCase() + link.slice(1)}
              </a>
            ))}
            <button
              onClick={() => {
                setIsModalOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="mt-8 py-4 bg-lightGreen text-black rounded-xl font-medium text-lg w-full"
            >
              Contact Me
            </button>
          </div>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-30 bg-black/80 backdrop-blur-sm flex justify-center items-center px-4">
          <div
            ref={modalRef}
            className="bg-[#1C1C22] rounded-2xl w-full max-w-md overflow-hidden"
          >
            <div className="p-8 space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-white">Contact Me</h2>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form ref={formRef} onSubmit={handleSendEmail} className="space-y-4">
                <input
                  type="email"
                  name="from_email"
                  required
                  disabled={isLoading}
                  className="w-full p-3 bg-[#292932] text-white rounded-xl outline-none transition-colors disabled:opacity-50"
                  placeholder="Your email"
                />

                <textarea
                  name="message"
                  required
                  disabled={isLoading}
                  className="w-full p-3 h-32 bg-[#292932] text-white rounded-xl outline-none transition-colors disabled:opacity-50 resize-none"
                  placeholder="Your message"
                ></textarea>

                {emailStatus.type && (
                  <div
                    className={`p-3 rounded-xl ${
                      emailStatus.type === "success"
                        ? "bg-green-500/10 text-green-300"
                        : "bg-red-500/10 text-red-300"
                    }`}
                  >
                    {emailStatus.message}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-lightGreen text-black font-medium py-3 px-6 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center"
                >
                  {isLoading ? (
                    <span className="inline-block w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
