// Importing Components
import About from "./components/sections/About";
import HeroSection from "./components/sections/HeroSection";
import Works from "./components/sections/Works";
import Logomarquee from "./components/ui/Logomarquee";

export default function Home() {
  return (
    <>
      <HeroSection />
      <Logomarquee />
      <About />
      <Works />
    </>
  );
}
