import React, { useEffect, useRef } from "react";
import Calendar from "./Calendar";
import { useSiteLoaded } from "../hooks/useSiteLoaded";

const CalendarPage: React.FC = () => {
  const scopeRef = useRef<HTMLDivElement>(null);
  const isLoaded = useSiteLoaded();

  useEffect(() => {
    let ctx: any;
    let lenis: any;
    
    const run = async () => {
      const { default: gsap } = await import("gsap");
      const { default: Lenis } = await import("lenis");
      
      // Lenis Setup
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });

      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);

      // GSAP Animations (wait for isLoaded)
      if (isLoaded) {
        ctx = gsap.context(() => {
          const tl = gsap.timeline();
          // Target the section directly via class within the div scope
          tl.to(".calendar-section", { opacity: 1, duration: 0.8 })
            .to(".header-hint", { opacity: 1, y: 0, duration: 0.5 }, "-=0.6")
            .to(".header-title", { opacity: 1, y: 0, duration: 0.6 }, "-=0.4")
            .to(".header-desc", { opacity: 1, y: 0, duration: 0.6 }, "-=0.4")
            .to(".calendar-container", { opacity: 1, y: 0, duration: 0.8 }, "-=0.2");
        }, scopeRef);
      }
    };
    run();

    return () => {
      if (ctx) ctx.revert();
      if (lenis) lenis.destroy();
    };
  }, [isLoaded]);

  return (
    <div ref={scopeRef}>
      <section
        className="calendar-section pt-56 pb-20 sm:pt-80 sm:pb-32 mb-32 sm:mb-48 opacity-0"
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <header className="text-center mb-8 sm:mb-12">
            <div className="header-hint text-sm font-medium text-neutral-400 mb-3 opacity-0 translate-y-[20px]">
              Descubrí lo que está pasando
            </div>

            <h1 className="header-title text-3xl sm:text-4xl font-bold tracking-tight mb-4 text-white opacity-0 translate-y-[30px]">
              Explorá el Calendario
            </h1>

            <p className="header-desc text-sm sm:text-base leading-relaxed text-neutral-400 px-2 max-w-xl mx-auto opacity-0 translate-y-[20px]">
              Unite a nuestros servicios semanales, reuniones, eventos especiales y otros encuentros.
            </p>
          </header>

          {/* Calendar Component */}
          <div className="calendar-container opacity-0 translate-y-[50px]">
            <Calendar />
          </div>
        </div>
      </section>
    </div>
  );
};

export default CalendarPage;
