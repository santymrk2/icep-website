import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Lenis from "lenis";
import Services from "./Services";

const Home: React.FC = () => {
  // Hero parallax
  const heroRef = useRef<HTMLDivElement>(null);
  // Hero scroll animation (sube y se desvanece)
  const { scrollYProgress: heroScrollY } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroScale = useTransform(heroScrollY, [0, 1], [1.22, 1.04]);
  const heroYMove = useTransform(heroScrollY, [0, 0.6], [0, -40]);
  const heroOpacity = useTransform(heroScrollY, [0, 0.6], [1, 0]);
  const heroY = useTransform(heroScrollY, [0, 1], [0, -30]);

  // Imagen 1 parallax (antes segunda sección)
  const image2Ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: image2ScrollY } = useScroll({
    target: image2Ref,
    offset: ["start start", "end start"],
  });
  const image2Scale = useTransform(image2ScrollY, [0, 1], [1.18, 1.04]);
  const image2Y = useTransform(image2ScrollY, [0, 1], [0, -50]);

  // Imagen 3 parallax
  const image3Ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: image3ScrollY } = useScroll({
    target: image3Ref,
    offset: ["start start", "end start"],
  });
  const image3Scale = useTransform(image3ScrollY, [0, 1], [1.18, 1.04]);
  const image3Y = useTransform(image3ScrollY, [0, 1], [0, -50]);

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
        className="relative flex w-full items-center justify-center overflow-hidden bg-white dark:bg-neutral-900"
        style={{
          minHeight: "100vh",
          paddingTop: "6rem",
          paddingBottom: "4rem",
        }}
      >
        <motion.img
          src="/assets/General.JPG"
          alt="Interior de la Iglesia Cristiana Evangélica en Pilar"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ y: heroY, scale: heroScale }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
        <div className="absolute inset-0 bg-black/50" aria-hidden="true" />
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/40 to-transparent"
          aria-hidden="true"
        />
        <motion.div
          className="relative z-10 mx-auto flex max-w-4xl flex-col items-center justify-center gap-6 px-6 text-center text-white sm:px-12"
          style={{
            y: heroYMove,
            opacity: heroOpacity,
          }}
        >
          <motion.p
            className="text-lg font-sans uppercase tracking-widest text-white/80"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Bienvenidos a la Iglesia Cristiana Evangélica Pilar
          </motion.p>
          <motion.h1
            className="text-4xl font-sans font-bold leading-tight sm:text-5xl md:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Un lugar para crecer en fe, comunidad y servicio
          </motion.h1>
          <motion.div
            className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <motion.a
              href="#actividades"
              className="rounded-full bg-white text-slate-900 font-semibold px-8 py-3 text-sm sm:text-base shadow-lg  hover:bg-gray-200/90 transition"
              whileTap={{ scale: 0.98 }}
            >
              Unirme a las actividades
            </motion.a>

            <motion.a
              href="/contacto"
              className="rounded-full border border-white/40 px-8 py-3 text-sm sm:text-base text-white/90 hover:border-white hover:text-white transition"
            >
              Quiero contactarme
            </motion.a>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Story Section */}
      <motion.section
        id="historia"
        className="bg-neutral-100 px-6 py-36 dark:bg-neutral-900 sm:py-48"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-50px" }}
      >
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 md:grid-cols-2">
          <div className="space-y-6 text-neutral-900 dark:text-neutral-100">
            <h2 className="text-4xl font-extrabold">Nuestra Historia</h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-300">
              La Iglesia Cristiana Evangélica de Pilar tiene sus raíces en la
              visión de un pequeño grupo de creyentes que en 1985 sintieron el
              llamado de establecer una comunidad de fe en el corazón de la
              ciudad. Con humildes comienzos en una casa particular, la
              congregación creció gracias a la fidelidad de Dios y al testimonio
              de sus miembros. En 1995, se adquirió el terreno actual y se
              construyó el primer templo, un hito que marcó el inicio de una
              nueva etapa de expansión y servicio a la comunidad.
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
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            viewport={{ once: true }}
            style={{ scale: image2Scale, y: image2Y }}
          />
        </div>
      </motion.section>

      {/* Activities Section */}
      <motion.section
        className="py-16"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-50px" }}
      >
        <Services />
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
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            viewport={{ once: true }}
            style={{ scale: image3Scale, y: image3Y }}
          />
        </div>
      </motion.section>

      <motion.section
        ref={contactRef}
        className="py-64 bg-neutral-900"
        style={{
          y: contactY,
          opacity: contactOpacity,
        }}
      ></motion.section>
    </main>
  );
};

export default Home;
