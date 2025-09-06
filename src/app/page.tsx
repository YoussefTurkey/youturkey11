// Importing Components
import About from "./components/sections/About";
import Blogs from "./components/sections/Blogs";
import HeroSection from "./components/sections/HeroSection";
import Projects from "./components/sections/Projects";
import Logomarquee from "./components/ui/Logomarquee";
import MobileTabs from "./components/ui/MobileTabs";

export default function Home() {
  return (
    <>
      <HeroSection />
      <Logomarquee />
      <About />
      <Projects />
      <Blogs />
      <MobileTabs />
    </>
  );
}
