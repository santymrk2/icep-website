import React, { useEffect, useRef } from "react";
import Services from "./Services";
import { useSiteLoaded } from "../hooks/useSiteLoaded";

const Home: React.FC = () => {
  const isLoaded = useSiteLoaded();

  // Section refs
  const heroRef = useRef<HTMLDivElement>(null);
  const heroImgRef = useRef<HTMLImageElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const image2Ref = useRef<HTMLDivElement>(null);
  const image2ImgRef = useRef<HTMLImageElement>(null);
  const activitiesRef = useRef<HTMLDivElement>(null);
  const image3Ref = useRef<HTMLDivElement>(null);
  const image3ImgRef = useRef<HTMLImageElement>(null);

  const yearsOfService = (() => {
    const foundingYear = 1980;
    const anniversaryMonth = 9; // octubre (0-index)
    const anniversaryDay = 11;
    const today = new Date();

    let years = today.getFullYear() - foundingYear;
    const anniversaryThisYear = new Date(
      today.getFullYear(),
      anniversaryMonth,
      anniversaryDay,
    );

    if (today < anniversaryThisYear) {
      years -= 1;
    }

    return years;
  })();

  useEffect(() => {
    let lenis: any;
    const run = async () => {
      const { default: gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      const { default: Lenis } = await import("lenis");

      gsap.registerPlugin(ScrollTrigger);

      // ── Lenis smooth scrolling + GSAP ScrollTrigger sync ────────────
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });

      lenis.on("scroll", ScrollTrigger.update);

      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);

      // ── Hero parallax on scroll ─────────────────────────────────────
      const heroImg = heroImgRef.current;
      if (heroRef.current && heroImg) {
        gsap.to(heroImg, {
          scale: 1.04,
          y: -30,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
        // Set initial scale
        gsap.set(heroImg, { scale: 1.22 });
      }

      // ── Hero content fade-out on scroll ─────────────────────────────
      const heroContent = heroContentRef.current;
      if (heroRef.current && heroContent) {
        gsap.to(heroContent, {
          y: -40,
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "60% top",
            scrub: true,
          },
        });
      }

      // ── Story section reveal ────────────────────────────────────────
      if (storyRef.current) {
        gsap.from(storyRef.current, {
          opacity: 0,
          y: 50,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: storyRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      }

      // ── Image 2 parallax ────────────────────────────────────────────
      if (image2Ref.current && image2ImgRef.current) {
        gsap.set(image2ImgRef.current, { scale: 1.18 });

        // Fade in
        gsap.from(image2ImgRef.current, {
          opacity: 0,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: image2Ref.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });

        // Parallax scrub
        gsap.to(image2ImgRef.current, {
          scale: 1.04,
          y: -50,
          ease: "none",
          scrollTrigger: {
            trigger: image2Ref.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // ── Image 3 parallax ────────────────────────────────────────────
      if (image3Ref.current && image3ImgRef.current) {
        gsap.set(image3ImgRef.current, { scale: 1.18 });

        // Fade in
        gsap.from(image3ImgRef.current, {
          opacity: 0,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: image3Ref.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });

        // Parallax scrub
        gsap.to(image3ImgRef.current, {
          scale: 1.04,
          y: -50,
          ease: "none",
          scrollTrigger: {
            trigger: image3Ref.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // ── Slider auto-play ────────────────────────────────────────────
      const btnLeft = document.getElementById("btn-left");
      const btnRight = document.getElementById("btn-right");
      const slider = document.getElementById("slider");
      const sliderSections = document.querySelectorAll(".slider-section");

      let counter = 0;
      const widthImg = 100 / sliderSections.length;

      function moveToRight() {
        counter = (counter + 1) % sliderSections.length;
        if (slider) {
          slider.style.transform = `translateX(-${counter * widthImg}%)`;
        }
      }

      function moveToLeft() {
        counter = (counter - 1 + sliderSections.length) % sliderSections.length;
        if (slider) {
          slider.style.transform = `translateX(-${counter * widthImg}%)`;
        }
      }

      btnLeft?.addEventListener("click", moveToLeft);
      btnRight?.addEventListener("click", moveToRight);

      const interval = setInterval(moveToRight, 4000);

      // Save for cleanup
      (run as any)._cleanup = () => {
        lenis?.destroy();
        gsap.ticker.remove(lenis?.raf as any);
        ScrollTrigger.getAll().forEach((st) => st.kill());
        btnLeft?.removeEventListener("click", moveToLeft);
        btnRight?.removeEventListener("click", moveToRight);
        clearInterval(interval);
      };
    };
    run();

    // ── Cleanup ─────────────────────────────────────────────────────
    return () => {
      if ((run as any)._cleanup) (run as any)._cleanup();
    };
  }, []);

  // ── Hero entrance animation (depends on isLoaded) ────────────────
  useEffect(() => {
    if (!isLoaded) return;

    const run = async () => {
      const { default: gsap } = await import("gsap");

      const heroImg = heroImgRef.current;
      const heroContent = heroContentRef.current;

      if (heroImg) {
        gsap.fromTo(
          heroImg,
          { opacity: 0 },
          { opacity: 1, duration: 1.2, ease: "power2.out" },
        );
      }

      if (heroContent) {
        const elements = heroContent.querySelectorAll(".hero-animate");
        gsap.fromTo(
          elements,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.2,
            ease: "power3.out",
            delay: 0.2,
          },
        );
      }
    };
    run();
  }, [isLoaded]);

  return (
    <div>
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative flex w-full items-end justify-start overflow-hidden bg-white dark:bg-neutral-900"
        style={{
          minHeight: "100vh",
          paddingTop: "6rem",
          paddingBottom: "4rem",
        }}
      >
        <img
          ref={heroImgRef}
          src="/assets/General.webp"
          alt="Interior de la Iglesia Cristiana Evangélica en Pilar"
          className="absolute inset-0 h-full w-full object-cover will-change-transform"
          style={{ opacity: 0 }}
        />
        <div className="absolute inset-0 bg-black/50" aria-hidden="true" />
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/40 to-transparent"
          aria-hidden="true"
        />
        <div
          ref={heroContentRef}
          className="relative z-10 w-full max-w-4xl flex flex-col items-start justify-end gap-6 px-6 text-left text-white sm:px-12"
        >
          <p className="hero-animate text-lg font-sans uppercase tracking-widest text-white/80 opacity-0">
            Bienvenidos a la Iglesia Cristiana Evangélica Pilar
          </p>
          <h1 className="hero-animate text-4xl font-sans font-bold leading-tight sm:text-5xl md:text-6xl opacity-0">
            Un lugar para crecer en fe, comunidad y servicio
          </h1>
          <div className="hero-animate flex flex-col sm:flex-row items-start gap-3 sm:gap-4 opacity-0">
            <a
              href="#actividades"
              className="rounded-full bg-white text-slate-900 font-semibold px-8 py-3 text-sm sm:text-base shadow-lg hover:bg-gray-200/90 transition active:scale-[0.98]"
            >
              Unirme a las actividades
            </a>

            <a
              href="/contacto"
              className="rounded-full border border-white/40 px-8 py-3 text-sm sm:text-base text-white/90 hover:border-white hover:text-white transition"
            >
              Quiero contactarme
            </a>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section
        ref={storyRef}
        id="historia"
        className="bg-neutral-100 px-6 py-36 dark:bg-neutral-900 sm:py-48"
      >
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 md:grid-cols-2">
          <div className="space-y-6 text-neutral-900 dark:text-neutral-100">
            <h2 className="text-4xl font-extrabold">Nuestra Historia</h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-300">
              La Iglesia Cristiana Evangélica de Pilar tiene sus raíces en la
              visión de un pequeño grupo de creyentes que en 1980 sintieron el
              llamado de establecer la iglesia cristiana evangélica a 2.8 km del
              casco de la ciudad. Desde los comienzos todo se centro en en el
              predio del Complejo Evangélico Pilar, la congregación creció
              gracias a la fidelidad de Dios y al testimonio de sus miembros. En
              1986, se inauguro el actual templo de reuniones y actividades, un
              hito que marcó el inicio de una nueva etapa de expansión y
              servicio a la comunidad.
            </p>
            <p className="text-lg text-neutral-600 dark:text-neutral-300">
              A lo largo de los años, hemos sido testigos de la mano de Dios
              obrando, transformando vidas y permitiéndonos ser un faro de
              esperanza en Pilar.
            </p>
          </div>
          <div className="relative">
            <div className="h-80 overflow-hidden rounded-lg shadow-xl sm:h-96 lg:h-[420px]">
              <img
                src="/assets/PG08.webp"
                alt="Integrantes de la iglesia frente al templo"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="mt-6 rounded-lg bg-white p-6 shadow-2xl dark:bg-neutral-800 sm:mt-8 md:absolute md:-bottom-8 md:right-0 md:mt-0 md:w-3/4 md:z-10">
              <p className="text-sm font-bold text-blue-600">Desde 1985</p>
              <h3 className="mt-1 text-lg font-bold text-neutral-900 dark:text-neutral-100">
                Creciendo en Fe y Comunidad
              </h3>
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
                {yearsOfService} años sirviendo en Pilar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Second Image Section */}
      <section
        ref={image2Ref}
        className="w-full h-full sm:h-screen overflow-hidden"
      >
        <div className="relative h-screen sm:h-full">
          <img
            ref={image2ImgRef}
            src="/assets/PG09.webp"
            alt="Grupo de integrantes de la iglesia en un campamento desde una sierra"
            className="w-full h-full object-cover drop-shadow-3xl brightness-50 will-change-transform"
            width={1920}
            height={1080}
          />
        </div>
      </section>

      {/* Activities Section */}
      <section ref={activitiesRef} className="py-16">
        <Services />
      </section>

      {/* Third Image Section */}
      <section
        ref={image3Ref}
        className="w-full h-full sm:h-screen overflow-hidden"
      >
        <div className="relative h-screen sm:h-full">
          <img
            ref={image3ImgRef}
            src="/assets/PG03.webp"
            alt="Personas caminando en el campamento de tandil 2025"
            className="w-full h-full object-cover drop-shadow-3xl brightness-50 will-change-transform"
          />
        </div>
      </section>

      {/* Contact spacer section */}
      <section className="py-64 bg-neutral-900" />
    </div>
  );
};

export default Home;
