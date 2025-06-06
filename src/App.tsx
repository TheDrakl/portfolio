import "./App.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Portfolio from "./components/Portfolio";
import PageTransition from "./components/PageTransition";
import { useEffect, useState } from "react";

function App() {
  const [showTransition, setShowTransition] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowTransition(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <PageTransition isVisible={showTransition} />
      <div className={`${showTransition ? "overflow-hidden h-screen" : ""}`}>
        <Navbar />
        <Hero />
        <Portfolio />
      </div>
    </>
  );
}

export default App;
