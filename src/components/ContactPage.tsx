import React, { useEffect, useRef } from "react";
import { useSiteLoaded } from "../hooks/useSiteLoaded";

const ContactPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isLoaded = useSiteLoaded();

  useEffect(() => {
    let ctx: any;
    let lenis: any;
    
    const run = async () => {
      const { default: gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      const { default: Lenis } = await import("lenis");
      
      gsap.registerPlugin(ScrollTrigger);
      
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });

      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);

      if (isLoaded) {
        ctx = gsap.context(() => {
          gsap.to(".hero-reveal", {
            opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power3.out", delay: 0.2
          });

          const sections = gsap.utils.toArray<HTMLElement>(".reveal-section");
          sections.forEach((section) => {
            gsap.fromTo(section, 
              { opacity: 0, y: 40 },
              { 
                opacity: 1, y: 0, duration: 1, ease: "power3.out",
                scrollTrigger: {
                  trigger: section,
                  start: "top 85%",
                  end: "top 40%",
                  scrub: 1,
                }
              }
            );
          });
        }, containerRef);
      }
    };
    run();

    return () => {
      if (ctx) ctx.revert();
      if (lenis) lenis.destroy();
    };
  }, [isLoaded]);

  return (
    <div ref={containerRef} className="bg-neutral-50 dark:bg-neutral-950 transition-colors duration-500 overflow-x-hidden">
      
      {/* 1. HERO */}
      <section className="relative min-h-[60vh] flex flex-col justify-center items-center text-center px-6 pt-32 pb-20">
         <div className="max-w-4xl">
            <p className="hero-reveal opacity-0 translate-y-6 text-sm font-sans uppercase tracking-[0.4em] text-neutral-500 dark:text-neutral-400 mb-6">
               Estamos para escucharte
            </p>
            <h1 className="hero-reveal opacity-0 translate-y-6 text-4xl sm:text-6xl md:text-7xl font-sans font-extrabold tracking-tight text-neutral-900 dark:text-white leading-[1.1]">
               Conectemos y sigamos la conversación.
            </h1>
         </div>
      </section>

      {/* 2. DIGITAL CHANNELS */}
      <section className="reveal-section py-24 px-6 sm:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
           
           <a href="mailto:info@icepilar.org" className="group p-10 rounded-[2.5rem] bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-white/10 hover:border-neutral-900 dark:hover:border-white transition-all text-center">
              <div className="size-16 rounded-2xl bg-neutral-100 dark:bg-white/5 flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-500">
                 <svg className="size-8 fill-neutral-900 dark:fill-white" viewBox="0 0 24 24">
                    <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                    <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                 </svg>
              </div>
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2 font-sans">Email</h3>
              <p className="text-neutral-400 text-sm mb-6 font-sans">Consultas generales y ministerios.</p>
              <span className="text-sm font-bold text-neutral-900 dark:text-white border-b-2 border-neutral-100 dark:border-neutral-800 pb-1 group-hover:border-neutral-900 dark:group-hover:border-white transition-all font-sans">info@icepilar.org</span>
           </a>

           <a href="https://instagram.com/ice_pilar" className="group p-10 rounded-[2.5rem] bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-white/10 hover:border-neutral-900 dark:hover:border-white transition-all text-center">
              <div className="size-16 rounded-2xl bg-neutral-100 dark:bg-white/5 flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-500">
                 <svg className="size-8 fill-neutral-900 dark:fill-white" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 7c-2.761 0-5 2.239-5 5s2.239 5 5 5 5-2.239 5-5-2.239-5-5-5zm0 8.2c-1.767 0-3.2-1.433-3.2-3.2s1.433-3.2 3.2-3.2 3.2 1.433 3.2 3.2-1.433 3.2-3.2 3.2zm6.406-11.845c-.642 0-1.161.52-1.161 1.162s.519 1.161 1.161 1.161 1.162-.519 1.162-1.161-.519-1.162-1.162-1.162z" />
                 </svg>
              </div>
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2 font-sans">Instagram</h3>
              <p className="text-neutral-400 text-sm mb-6 font-sans">Día a día y comunidad.</p>
              <span className="text-sm font-bold text-neutral-900 dark:text-white border-b-2 border-neutral-100 dark:border-neutral-800 pb-1 group-hover:border-neutral-900 dark:group-hover:border-white transition-all font-sans">@ice_pilar</span>
           </a>

           <a href="https://facebook.com/icepilar" className="group p-10 rounded-[2.5rem] bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-white/10 hover:border-neutral-900 dark:hover:border-white transition-all text-center">
              <div className="size-16 rounded-2xl bg-neutral-100 dark:bg-white/5 flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-500">
                 <svg className="size-8 fill-neutral-900 dark:fill-white" viewBox="0 0 24 24">
                    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.324v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                 </svg>
              </div>
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2 font-sans">Facebook</h3>
              <p className="text-neutral-400 text-sm mb-6 font-sans">Novedades y recursos.</p>
              <span className="text-sm font-bold text-neutral-900 dark:text-white border-b-2 border-neutral-100 dark:border-neutral-800 pb-1 group-hover:border-neutral-900 dark:group-hover:border-white transition-all font-sans">@icepilar</span>
           </a>
        </div>
      </section>

      {/* 3. VISIT SECTION */}
      <section className="reveal-section py-32 px-6 sm:px-12 lg:px-24 bg-neutral-100 dark:bg-neutral-900">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl font-extrabold text-neutral-900 dark:text-white leading-tight font-sans">Vení a compartir una reunión con nosotros</h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-300 font-sans">
               Te esperamos cada domingo en nuestra sede de Pilar. No hace falta aviso previo, simplemente acercate para compartir un tiempo de comunidad y fe.
            </p>
            <div className="py-4">
               <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-2 font-sans">Reunión Principal</p>
               <p className="text-2xl font-bold text-neutral-900 dark:text-white font-sans">Domingos, 10:00 hs</p>
            </div>
            <a href="https://maps.app.goo.gl/TEdvqX2pNJz34sfn8" className="inline-flex items-center gap-3 rounded-full border border-neutral-900 dark:border-white px-8 py-3 font-bold text-neutral-900 dark:text-white hover:bg-neutral-900 dark:hover:bg-white hover:text-white dark:hover:text-neutral-900 transition-all font-sans">
               Ver ubicación en Maps
            </a>
          </div>
          <div className="h-80 sm:h-[450px] overflow-hidden rounded-[2.5rem] shadow-2xl border-4 border-white dark:border-neutral-800">
             <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3290.8116776545207!2d-58.9129872!3d-34.4587799!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bc9d0a8b6bea3b%3A0x8f6a1a0b5f8c0a0e!2sAv.%20Dr.%20Honorio%20Pueyrred%C3%B3n%202775%2C%20B1631FZJ%20Pilar%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1625147200000!5m2!1ses!2sar" style={{ border: 0 }} allowFullScreen={true} className="h-full w-full grayscale hover:grayscale-0 transition-all duration-700"></iframe>
          </div>
        </div>
      </section>

      {/* 4. YOUTUBE SECTION (Visual Alternative) */}
      <section className="reveal-section py-32 px-6 sm:px-12 lg:px-24">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-neutral-900 dark:text-white mb-8 font-sans">Sumate a la comunidad digital</h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-12 font-sans">
             Mirá nuestras últimas transmisiones, mensajes y contenido especial en nuestro canal oficial.
          </p>
          
          {/* Alternative: Interactive Preview Card */}
          <a 
            href="https://www.youtube.com/@icepilar" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative block aspect-video w-full rounded-[2.5rem] overflow-hidden shadow-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-900 transition-transform duration-500 hover:scale-[1.02]"
          >
            {/* Using a high-quality channel banner or fallback as preview */}
            <img 
              src="/assets/General.webp" 
              alt="ICE Pilar YouTube Preview" 
              className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-700 grayscale group-hover:grayscale-0"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
              <div className="size-24 rounded-full bg-red-600 flex items-center justify-center shadow-2xl shadow-red-600/40 group-hover:scale-110 transition-transform duration-500">
                <svg className="size-10 text-white fill-current" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <p className="text-white font-bold tracking-[0.2em] uppercase text-sm">Abrir Canal de YouTube</p>
            </div>
          </a>
          
          <div className="mt-12">
             <p className="text-neutral-400 text-sm font-sans italic">Hacé clic para ver los videos más recientes en una nueva pestaña.</p>
          </div>
        </div>
      </section>

      <section className="py-32" />
    </div>
  );
};

export default ContactPage;