import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Lenis from "lenis";
import Services from "./Services";
import NextEvent from "./NextEvent";

const Home: React.FC = () => {
  // Hero parallax
  const heroRef = useRef<HTMLDivElement>(null);
  // Hero scroll animation (sube, achica y se desvanece)
  const { scrollYProgress: heroScrollY } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroScale = useTransform(heroScrollY, [0, 0.6], [1, 0.6]);
  const heroYMove = useTransform(heroScrollY, [0, 0.6], [0, -120]);
  const heroOpacity = useTransform(heroScrollY, [0, 0.6], [1, 0]);
  const heroY = useTransform(heroScrollY, [0, 1], [0, -100]);

  // Imagen 1 parallax
  const image1Ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: image1ScrollY } = useScroll({
    target: image1Ref,
    offset: ["start start", "end start"],
  });
  const image1Scale = useTransform(image1ScrollY, [0, 1], [1, 1.1]);

  // Imagen 2 parallax
  const image2Ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: image2ScrollY } = useScroll({
    target: image2Ref,
    offset: ["start start", "end start"],
  });
  const image2Scale = useTransform(image2ScrollY, [0, 1], [1, 1.1]);

  // Imagen 3 parallax
  const image3Ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: image3ScrollY } = useScroll({
    target: image3Ref,
    offset: ["start start", "end start"],
  });
  const image3Scale = useTransform(image3ScrollY, [0, 1], [1, 1.1]);

  // Contact section scroll-based animation
  const contactRef = useRef<HTMLDivElement>(null);
  const contactScroll = useScroll({
    target: contactRef,
    offset: ["start center", "center center"],
  });
  const contactY = useTransform(
    contactScroll.scrollYProgress,
    [0, 1],
    [100, 0],
  );
  const contactOpacity = useTransform(
    contactScroll.scrollYProgress,
    [0, 1],
    [0, 1],
  );

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

  return (
    <main>
      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        className="relative flex w-full items-center justify-start overflow-hidden"
        style={{ height: "calc(100vh - 100px)" }}
      >
        <motion.img
          src="/assets/PG09.webp"
          alt="Interior de la iglesia durante una reunión"
          className="absolute inset-0 h-full w-full object-cover"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          style={{ scale: heroScale, y: heroY }}
        />
        <div className="absolute inset-0 bg-black/60" aria-hidden="true" />
        <motion.div
          className="relative z-10 mx-auto max-w-6xl px-6 sm:px-12"
          style={{ y: heroYMove, opacity: heroOpacity }}
        >
          <div className="max-w-xl rounded-2xl bg-white/10 p-8 backdrop-blur-sm shadow-lg">
            <p className="text-lg font-medium text-white">Bienvenidos a la Iglesia Cristiana Evangélica Pilar</p>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight text-white sm:text-5xl md:text-6xl">
              Un lugar de fe, comunidad y propósito
            </h1>
            <p className="mt-6 text-base text-gray-200 sm:text-lg">
              "Porque donde están dos o tres congregados en mi nombre, allí estoy yo en medio de ellos." - Mateo 18:20
            </p>
            <a
              href="#actividades"
              className="mt-8 inline-flex items-center rounded-full bg-primary px-6 py-3 text-base font-semibold text-white shadow-md transition hover:bg-blue-600"
            >
              Únete a nuestras actividades
            </a>
          </div>
        </motion.div>
      </motion.section>

      {/* First Image Section */}
      <motion.section
        ref={image1Ref}
        className="w-full h-full sm:h-screen overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="relative h-screen sm:h-full">
          <motion.img
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
          />
          <motion.div
            className="absolute top-1/2 right-10 sm:right-32 md:right-100"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="text-center">
              <motion.h2
                className="text-3xl sm:text-3xl md:text-4xl font-sans font-bold text-center sm:text-right"
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
      </motion.section>

      {/* Services Section */}
      <motion.section
        className="py-16"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-50px" }}
      >
        <Services />
      </motion.section>

      {/* Second Image Section */}
      <motion.section
        ref={image2Ref}
        className="w-full h-full sm:h-screen overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="relative h-screen sm:h-full">
          <motion.img
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
          />
          <motion.div
            className="absolute top-1/2 left-10 sm:left-32 md:left-100"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="text-center">
              <motion.h2
                className="text-3xl sm:text-3xl md:text-4xl font-sans font-bold text-center sm:text-left"
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
      </motion.section>

      {/* Next Event Section */}
      <motion.section
        className="py-16"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-50px" }}
      >
        <NextEvent />
      </motion.section>

      {/* Third Image Section */}
      <motion.section
        ref={image3Ref}
        className="w-full h-full sm:h-screen overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="relative h-screen sm:h-full">
          <motion.img
            src="/assets/PG03.webp"
            alt="Personas caminando en el campamento de tandil 2025"
            className="w-full h-full object-cover drop-shadow-3xl brightness-50"
            initial={{ scale: 1.1 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            viewport={{ once: true }}
            style={{ scale: image3Scale }}
          />
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section
        ref={contactRef}
        className="py-64 bg-neutral-900"
        style={{
          y: contactY,
          opacity: contactOpacity,
        }}
      >
        <div className="max-w-2xl mx-auto px-8 text-center">
          <motion.div
            className="mb-6"
            initial={false}
            animate={false}
            style={{ y: 0, opacity: 1 }}
          >
            <motion.h2
              className="text-3xl sm:text-4xl font-sans font-bold text-white mb-4"
              initial={false}
              animate={false}
              style={{ y: 0, opacity: 1 }}
            >
              Contactanos
            </motion.h2>
            <motion.p
              className="text-lg sm:text-xl text-neutral-300 font-sans mb-6"
              initial={false}
              animate={false}
              style={{ y: 0, opacity: 1 }}
            >
              Estamos para responder tus preguntas
            </motion.p>
          </motion.div>
          <motion.div
            initial={false}
            animate={false}
            style={{ y: 0, opacity: 1 }}
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
    </main>
  );
};

export default Home;

