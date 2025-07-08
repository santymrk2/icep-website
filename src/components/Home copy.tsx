import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import Lenis from 'lenis';
import Services from './Services';
import NextEvent from './NextEvent';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined' && gsap && ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
}

const Home: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRefs = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)];
  const nextEventRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Parallax effects
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const image1Scale = useTransform(scrollYProgress, [0, 0.3], [1, 1.1]);
  const image2Scale = useTransform(scrollYProgress, [0.3, 0.6], [1, 1.1]);
  const image3Scale = useTransform(scrollYProgress, [0.6, 1], [1, 1.1]);

  // Hero scroll animation
  const heroSectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScrollY } = useScroll({ target: heroSectionRef, offset: ['start start', 'end start'] });
  const heroScale = useTransform(heroScrollY, [0, 0.3], [1, 0.6]);
  const heroYMove = useTransform(heroScrollY, [0, 0.3], [0, -120]);
  const heroOpacity = useTransform(heroScrollY, [0, 0.3], [1, 0]);

  // Initialize Lenis smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // GSAP pin para imágenes y reveal de NextEvent
  useEffect(() => {
    if (typeof window === 'undefined') return;
    // Pin de la primera imagen hasta que NextEvent la cubra
    if (imgRefs[0].current) {
      ScrollTrigger.create({
        trigger: imgRefs[0].current,
        start: 'top top',
        endTrigger: '#next-event-section',
        end: 'top top',
        pin: true,
        pinSpacing: false,
        scrub: true,
      });
    }
    // Pin de NextEvent para que quede sticky en el tope
    if (nextEventRef.current) {
      ScrollTrigger.create({
        trigger: nextEventRef.current,
        start: 'top top',
        end: '+=100%', // pin por 100vh
        pin: true,
        pinSpacing: true,
        scrub: true,
      });
    }
    // Pin de las otras imágenes
    [imgRefs[1], imgRefs[2]].forEach((ref) => {
      if (!ref.current) return;
      ScrollTrigger.create({
        trigger: ref.current,
        start: 'top top',
        end: '+=100%',
        pin: true,
        pinSpacing: true,
        scrub: true,
      });
    });
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  // Slider functionality
  useEffect(() => {
    const btnLeft = document.getElementById("btn-left"),
      btnRight = document.getElementById("btn-right"),
      slider = document.getElementById("slider"),
      sliderSections = document.querySelectorAll(".slider-section");

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

    return () => {
      btnLeft?.removeEventListener("click", moveToLeft);
      btnRight?.removeEventListener("click", moveToRight);
      clearInterval(interval);
    };
  }, []);

  // Estado de carga
  const [imagesLoaded, setImagesLoaded] = useState([false, false, false]);
  const [nextEventLoaded, setNextEventLoaded] = useState(false);
  const [servicesLoaded, setServicesLoaded] = useState(false);
  const [showContent, setShowContent] = useState(false);

  // Cuando todo está cargado, mostrar el contenido con transición
  useEffect(() => {
    if (
      imagesLoaded.every(Boolean) &&
      nextEventLoaded &&
      servicesLoaded
    ) {
      setTimeout(() => setShowContent(true), 300);
    }
  }, [imagesLoaded, nextEventLoaded, servicesLoaded]);

  // Handler para imágenes
  const handleImageLoad = (idx: number) => {
    setImagesLoaded(prev => {
      const next = [...prev];
      next[idx] = true;
      return next;
    });
  };

  // Detectar si las imágenes ya están en caché y marcarlas como cargadas
  useEffect(() => {
    imgElementRefs.forEach((ref, idx) => {
      const img = ref.current;
      if (img && img.complete && img.naturalWidth > 0 && !imagesLoaded[idx]) {
        handleImageLoad(idx);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const imgElementRefs = [useRef<HTMLImageElement>(null), useRef<HTMLImageElement>(null), useRef<HTMLImageElement>(null)];

  // Spinner CSS
  const Spinner = () => (
    <div style={{ position: 'fixed', zIndex: 10000, top: 0, left: 0, width: '100vw', height: '100vh', background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="loader-spinner" />
      <style>{`
        .loader-spinner {
          border: 8px solid #f3f3f3;
          border-top: 8px solid #222;
          border-radius: 50%;
          width: 60px;
          height: 60px;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );

  return (
    <main ref={containerRef}>
      {!showContent && <Spinner />}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showContent ? 1 : 0 }}
        transition={{ duration: 0.8 }}
        style={{ pointerEvents: showContent ? 'auto' : 'none' }}
      >
        {/* Hero Section */}
        <section
          ref={heroSectionRef}
          className="w-full bg-transparent relative p-0 m-0"
          style={{ height: 'calc(100vh - 80px)' }}
        >
          <div className="flex flex-col justify-center items-center h-full w-full">
            <motion.h1
              className="text-4xl md:text-7xl font-sans font-bold text-center m-0 p-0"
              style={{
                scale: heroScale,
                y: heroYMove,
                opacity: heroOpacity,
              }}
            >
              Bienvenidos a la <br /> Iglesia Cristiana <br /> Evangélica en Pilar
            </motion.h1>
          </div>
        </section>

        {/* First Image Section (pinned) */}
        <section ref={imgRefs[0]} className="w-full h-full sm:h-screen overflow-hidden">
          <div className="relative h-screen sm:h-full">
            <motion.img
              ref={imgElementRefs[0]}
              src="/assets/PG08.webp"
              alt="Fachada de la iglesia con los integrantes de la misma"
              className="w-full h-full object-cover drop-shadow-3xl brightness-50"
              width={1920}
              height={1080}
              initial={{ scale: 1.1 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              viewport={{ once: true }}
              style={{ scale: image1Scale }}
              onLoad={() => handleImageLoad(0)}
            />
            <motion.div 
              className="absolute top-1/2 right-10 sm:right-32 md:right-82"
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="text-center">
                <motion.h2
                  className="text-3xl sm:text-3xl md:text-5xl font-sans font-bold text-center sm:text-right"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  viewport={{ once: true }}
                >
                      No temas solo cree
                </motion.h2>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Next Event Section (sticky/pinned) */}
        <section
          id="next-event-section"
          ref={nextEventRef}
          className="h-screen min-h-screen w-full bg-neutral-900 relative z-10 shadow-xl flex items-center justify-center"
        >
          <NextEvent onLoaded={() => setNextEventLoaded(true)} />
        </section>

        {/* Second Image Section (pinned) */}
        <section ref={imgRefs[1]} className="w-full h-full sm:h-screen overflow-hidden">
          <div className="relative h-screen sm:h-full">
            <motion.img
              ref={imgElementRefs[1]}
              src="/assets/PG09.webp"
              alt="Grupo de integrantes de la iglesia en un campamento desde una sierra"
              className="w-full h-full object-cover drop-shadow-3xl brightness-50"
              width={1920}
              height={1080}
              initial={{ scale: 1.1 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              viewport={{ once: true }}
              style={{ scale: image2Scale }}
              onLoad={() => handleImageLoad(1)}
            />
            <motion.div 
              className="absolute top-1/2 left-10 sm:left-32 md:left-82"
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="text-center">
                <motion.h2
                  className="text-3xl sm:text-3xl md:text-5xl font-sans font-bold text-center sm:text-left"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  viewport={{ once: true }}
                >
                  Dios es amor
                </motion.h2>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Services Section */}
        <motion.section 
          className="py-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <Services onLoaded={() => setServicesLoaded(true)} />
        </motion.section>

        {/* Third Image Section (pinned) */}
        <section ref={imgRefs[2]} className="w-full h-full sm:h-screen overflow-hidden">
          <div className="relative h-screen sm:h-full">
            <motion.img
              ref={imgElementRefs[2]}
              src="/assets/PG03.webp"
              alt="Personas caminando en el campamento de tandil 2025"
              className="w-full h-full object-cover drop-shadow-3xl brightness-50"
              initial={{ scale: 1.1 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              viewport={{ once: true }}
              style={{ scale: image3Scale }}
              onLoad={() => handleImageLoad(2)}
            />
          </div>
        </section>

        {/* Contact Section */}
        <motion.section 
          className="py-64 bg-neutral-900"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <div className="max-w-2xl mx-auto px-8 text-center">
            <motion.div 
              className="mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <motion.h2
                className="text-3xl sm:text-4xl font-sans font-bold text-white mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                Contactanos
              </motion.h2>
              <motion.p
                className="text-lg sm:text-xl text-neutral-300 font-sans mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
              >
                Estamos para responder tus preguntas
              </motion.p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
                          <motion.a
                href="/contacto"
                className={` 
                      text-neutral-900
                      hover:scale-103
                      transition-all
                      uppercase
                      no-underline
                      ring-1
                      bg-white
                      rounded-xl
                      py-4
                      px-6
                      items-center
                      text-center
                      text-sm
                      font-bold
                      relative
                      z-10
                      font-sans
                      overflow-hidden
   
                      inline-flex`}
              >
                Quiero contactarme
              </motion.a>
            </motion.div>
          </div>
        </motion.section>
      </motion.div>
    </main>
  );
};

export default Home; 