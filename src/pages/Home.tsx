import { useState } from "react";
import Nav from "@/components/sections/Nav";
import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import HowToOrder from "@/components/sections/HowToOrder";
import Work from "@/components/sections/Work";
import WhyWebsite from "@/components/sections/WhyWebsite";
import Founders from "@/components/sections/Founders";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import Intro from "@/components/Intro";
import LoginModal from "@/components/LoginModal";
import BusinessQueryModal from "@/components/BusinessQueryModal";

export default function Home() {
  const [introComplete, setIntroComplete] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [queryModalOpen, setQueryModalOpen] = useState(false);

  return (
    <div className="w-full overflow-hidden" style={{ background: "var(--c-bg)" }}>
      <Intro onComplete={() => setIntroComplete(true)} />

      <Nav onLogin={() => setLoginModalOpen(true)} />

      <main style={{ opacity: introComplete ? 1 : 0, transition: "opacity 0.4s ease" }}>
        <Hero animate={introComplete} onStartProject={() => setQueryModalOpen(true)} />
        <Stats />
        <HowToOrder onStartProject={() => setQueryModalOpen(true)} />
        <Work />
        <WhyWebsite />
        <Founders />
        <Testimonials />
        <Contact onStartProject={() => setQueryModalOpen(true)} />
      </main>
      <Footer />

      <LoginModal open={loginModalOpen} onClose={() => setLoginModalOpen(false)} />
      <BusinessQueryModal open={queryModalOpen} onClose={() => setQueryModalOpen(false)} />
    </div>
  );
}
