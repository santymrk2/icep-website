import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Lenis from "lenis";

const ContactPage: React.FC = () => {
  const highlightCards = [
    {
      title: "Escribinos hoy mismo",
      description:
        "Respondemos cada mensaje y redirigimos tu consulta al ministerio que necesites.",
      action: "info@icepilar.org",
      href: "mailto:info@icepilar.org",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="size-10 fill-neutral-900 dark:fill-white"
        >
          <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
          <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
        </svg>
      ),
    },
    {
      title: "Planificá tu visita",
      description:
        "Acercate los domingos: te recibimos para compartir la reunión y responder tus dudas.",
      action: "Av. Honorio Pueyrredón 2775",
      href: "https://maps.app.goo.gl/TEdvqX2pNJz34sfn8",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="size-10 fill-neutral-900 dark:fill-white"
        >
          <path
            fillRule="evenodd"
            d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
          ></path>
        </svg>
      ),
    },
    {
      title: "Seguinos en vivo",
      description:
        "Encontranos en YouTube para ver reuniones, mensajes y recursos actualizados.",
      action: "@icepilar",
      href: "https://www.youtube.com/@icepilar",
      icon: (
        <svg
          className="size-10 fill-neutral-900 dark:fill-white"
          viewBox="0 0 24 24"
        >
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"></path>
        </svg>
      ),
    },
  ];

  const socialCards = [
    {
      label: "Email",
      handle: "info@icepilar.org",
      href: "mailto:info@icepilar.org",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="size-12 fill-neutral-900 dark:fill-white group-hover:fill-neutral-600 dark:group-hover:fill-neutral-200 transition-colors"
        >
          <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
          <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
        </svg>
      ),
    },
    {
      label: "Facebook",
      handle: "@icepilar",
      href: "https://www.facebook.com/profile.php?id=61574986704374",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="-5 0 20 20"
          className="size-12 fill-neutral-900 dark:fill-white group-hover:fill-neutral-600 dark:group-hover:fill-neutral-200 transition-colors"
        >
          <path d="M6.821 20v-9h2.733L10 7H6.821V5.052C6.821 4.022 6.848 3 8.287 3h1.458V.14c0-.043-1.253-.14-2.52-.14C4.58 0 2.924 1.657 2.924 4.7V7H0v4h2.923v9h3.898Z" />
        </svg>
      ),
    },
    {
      label: "Instagram",
      handle: "@ice_pilar",
      href: "https://www.instagram.com/ice_pilar?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
      icon: (
        <svg
          className="size-12 fill-neutral-900 dark:fill-white group-hover:fill-neutral-600 dark:group-hover:fill-neutral-200 transition-colors"
          viewBox="0 0 24 24"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6.5-.25a1.25 1.25 0 0 0-2.5 0 1.25 1.25 0 0 0 2.5 0zM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" />
        </svg>
      ),
    },
    {
      label: "YouTube",
      handle: "@icepilar",
      href: "https://www.youtube.com/@icepilar",
      icon: (
        <svg
          className="size-12 fill-neutral-900 dark:fill-white group-hover:fill-neutral-600 dark:group-hover:fill-neutral-200 transition-colors"
          viewBox="0 0 24 24"
        >
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"></path>
        </svg>
      ),
    },
  ];

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

  return (
    <>
      {/* Hero Section */}
      <motion.section
        className="min-h-[70vh] w-full flex flex-col justify-center items-center gap-8 px-4 text-center sm:px-6 pt-60 pb-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl font-bold font-sans leading-tight max-w-3xl mx-auto text-neutral-900 dark:text-white"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Conectemos y sigamos la conversación
        </motion.h1>

        <motion.p
          className="max-w-2xl text-sm sm:text-base text-neutral-600 dark:text-neutral-400 font-sans"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Contanos qué necesitás, coordinemos una visita o unite a nuestras
          reuniones en vivo. Queremos escucharte y acompañarte.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <a
            href="mailto:info@icepilar.org"
            className="rounded-full bg-neutral-900 dark:bg-white text-white dark:text-slate-900 font-semibold px-8 py-3 text-sm sm:text-base shadow-lg hover:bg-neutral-800 dark:hover:bg-gray-200 transition"
          >
            Escribinos ahora
          </a>
          <a
            href="#canales"
            className="rounded-full border border-neutral-300 dark:border-white/40 px-8 py-3 text-sm sm:text-base text-neutral-900 dark:text-white/90 hover:bg-neutral-50 dark:hover:bg-white/10 transition"
          >
            Ver canales disponibles
          </a>
        </motion.div>

        <motion.p
          className="text-neutral-400 dark:text-white/60 font-sans text-xs sm:text-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          Desliza para ver más ↓
        </motion.p>
      </motion.section>

      <div className="space-y-20 sm:space-y-24 mt-16 sm:mt-24">
        {/* Quick Highlights */}
        <motion.section
          id="canales"
          className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
        >
          <div className="grid gap-6 md:grid-cols-3">
            {highlightCards.map((card, index) => (
              <motion.a
                key={card.title}
                href={card.href}
                className="group rounded-3xl border border-neutral-200 dark:border-white/15 px-6 py-7 sm:px-7 sm:py-8 transition hover:border-neutral-300 dark:hover:border-white/35 hover:bg-neutral-50 dark:hover:bg-white/[0.05]"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 * index }}
                viewport={{ once: true }}
              >
                <div className="mb-6 flex size-16 items-center justify-center rounded-2xl bg-neutral-100 dark:bg-white/10">
                  {card.icon}
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 dark:text-white">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm text-neutral-600 dark:text-white/70">{card.description}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-neutral-700 dark:text-white/80">
                  {card.action}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="size-5 transition-transform group-hover:translate-x-1"
                  >
                    <path
                      fill="currentColor"
                      d="m7.293 17.293 1.414 1.414L18.414 9l-9.707-9.707-1.414 1.414L15.586 9z"
                    />
                  </svg>
                </span>
              </motion.a>
            ))}
          </div>
        </motion.section>

        {/* Seccion Redes */}
        <motion.section
          className="py-16 mx-4 sm:mx-10 flex flex-col justify-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <div className="flex flex-col md:flex-row sm:gap-10 lg:gap-24 m-2 md:items-center max-w-screen-lg mx-auto">
            <motion.div
              className="flex flex-col justify-center items-start md:items-end max-w-7xl mx-auto order-2 md:order-1 text-left md:text-right px-4"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="text-left md:text-right mb-10">
                <motion.h1
                  className="text-3xl font-bold font-sans md:text-right text-neutral-900 dark:text-white"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  Elegí el canal que más cómodo te quede
                </motion.h1>
                <motion.p
                  className="text-neutral-600 dark:text-white/70 font-sans mt-3 md:text-right"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  Escribinos por mail, redes sociales o enviá tu consulta desde
                  el canal que uses todos los días. Siempre hay alguien listo
                  para responder.
                </motion.p>
              </div>
            </motion.div>

            <motion.div
              className="order-2 md:order-2 flex justify-center w-full animate-float px-4"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="w-full max-w-3xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {socialCards.map((item, index) => (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      className="group flex flex-col items-start justify-between rounded-2xl border border-neutral-200 dark:border-white/15 p-6 transition hover:border-neutral-300 dark:hover:border-white/30 hover:bg-neutral-50 dark:hover:bg-white/[0.05]"
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.12 * index }}
                      viewport={{ once: true }}
                    >
                      <div className="mb-5">{item.icon}</div>
                      <div>
                        <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                          {item.label}
                        </h3>
                        <p className="text-sm text-neutral-600 dark:text-white/70 mt-1">
                          {item.handle}
                        </p>
                      </div>
                      <span className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-neutral-500 dark:text-white/50 transition-colors group-hover:text-neutral-900 dark:group-hover:text-white/80">
                        Escribir
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="size-4 transition-transform group-hover:translate-x-1"
                        >
                          <path
                            fill="currentColor"
                            d="M13 5v2h3.586L6.293 17.293l1.414 1.414L18 8.414V12h2V5z"
                          />
                        </svg>
                      </span>
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Seccion Direccion */}
        <motion.section
          className="py-16 mx-4 sm:mx-10 flex flex-col justify-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <div className="flex flex-col md:flex-row gap-6 lg:gap-24 m-2 md:items-center max-w-screen mx-auto">
            <motion.div
              className="flex flex-col justify-center items-start md:items-end max-w-8xl mx-auto order-2 md:order-1 text-left md:text-right px-4"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="text-left md:text-right mb-10">
                <motion.h1
                  className="text-3xl font-bold font-sans md:text-right text-neutral-900 dark:text-white"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  Visitá ICE Pilar y conversemos en persona
                </motion.h1>
                <p className="text-neutral-600 dark:text-white/70 font-sans mt-3 md:text-right">
                  Te esperamos cada domingo. Nuestro equipo de bienvenida puede
                  acompañarte, hay espacios para niños y un café para seguir la
                  charla después de la reunión.
                </p>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <a href="https://maps.app.goo.gl/TEdvqX2pNJz34sfn8">
                  <div className="flex flex-row gap-4 justify-start md:justify-end items-center">
                    <div className="order-2 md:order-1">
                      <h3 className="text-lg font-normal text-neutral-900 dark:text-white text-left md:text-right">
                        Dirección
                      </h3>
                      <p className="text-neutral-600 dark:text-white/70 font-sans text-left md:text-right">
                        Av. Honorio Pueyrredón 2775, <br />
                        Pilar, Buenos Aires
                      </p>
                      <p className="mt-2 text-xs uppercase tracking-[0.2em] text-neutral-400 dark:text-white/40 md:text-right">
                        Abrir en Google Maps
                      </p>
                    </div>
                    <div className="order-1 md:order-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="size-16 fill-neutral-900 dark:fill-white"
                      >
                        <path
                          fillRule="evenodd"
                          d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </a>
              </motion.div>
            </motion.div>

            <motion.div
              className="order-2 md:order-2 pt-4 flex justify-center items-center w-full animate-float relative px-4"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div
                id="skeleton"
                className="absolute inset-0 bg-neutral-400 dark:bg-neutral-700 rounded-lg animate-pulse"
              ></div>

              <iframe
                id="mapIframe"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3290.8116776545207!2d-58.9129872!3d-34.4587799!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bc9d0a8b6bea3b%3A0x8f6a1a0b5f8c0a0e!2sAv.%20Dr.%20Honorio%20Pueyrred%C3%B3n%202775%2C%20B1631FZJ%20Pilar%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1625147200000!5m2!1ses!2sar"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                className="h-[22rem] w-full max-w-xl mx-auto rounded-2xl shadow-[0_30px_60px_-30px_rgba(15,23,42,0.8)] opacity-0 transition-opacity duration-300"
                onLoad={(e) => {
                  e.currentTarget.classList.remove("opacity-0");
                  const skeleton = document.getElementById("skeleton");
                  if (skeleton) skeleton.remove();
                }}
              ></iframe>
            </motion.div>
          </div>
        </motion.section>

        {/* Seccion Youtube */}
        <motion.section
          className="pt-16 pb-60 sm:pb-80 mx-4 sm:mx-10 flex flex-col justify-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <div className="flex flex-col md:flex-row gap-8 sm:gap-10 lg:gap-24 m-2 md:items-center max-w-screen-lg mx-auto">
            <motion.div
              className="flex flex-col justify-center items-start max-w-7xl mx-auto order-1 md:order-2 text-left px-4"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="text-left mb-10">
                <motion.h1
                  className="text-3xl font-bold font-sans text-neutral-900 dark:text-white"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  Unite a nuestras reuniones desde donde estés
                </motion.h1>
                <motion.p
                  className="text-neutral-600 dark:text-white/70 mt-3 font-sans"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  Accedé a las transmisiones en vivo, volvés a ver mensajes y
                  encontrá recursos para crecer en tu fe durante la semana.
                </motion.p>

                <ul className="mt-5 space-y-3 text-sm text-neutral-600 dark:text-white/70">
                  <li className="flex items-start gap-3">
                    <span className="mt-1 size-2 rounded-full bg-teal-500 dark:bg-teal-300" />
                    Reseñas de reuniones, testimonios y actividades especiales.
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 size-2 rounded-full bg-rose-500 dark:bg-rose-300" />
                    Recibí alertas cuando empecemos a transmitir en vivo.
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 size-2 rounded-full bg-indigo-500 dark:bg-indigo-300" />
                    Compartí los videos con tu familia y amigos.
                  </li>
                </ul>
              </div>
              <motion.div
                className=""
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <a
                  href="https://www.youtube.com/@icepilar"
                  className="inline-flex items-center gap-3 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-slate-900 px-5 py-3 text-sm font-semibold shadow-lg shadow-slate-900/30 dark:shadow-none transition hover:bg-neutral-800 dark:hover:bg-gray-200"
                >
                  Suscribirme al canal
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="size-5 fill-white dark:fill-slate-900"
                  >
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"></path>
                  </svg>
                </a>
              </motion.div>
            </motion.div>

            <motion.div
              className="order-1 md:order-1 flex justify-center items-center w-full animate-float relative px-4"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div
                id="youtube-skeleton"
                className="absolute inset-0 bg-neutral-400 dark:bg-neutral-700 rounded-lg animate-pulse"
              ></div>

              <iframe
                id="youtubeIframe"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                className="h-[22rem] w-full mx-auto rounded-2xl shadow-[0_30px_60px_-30px_rgba(15,23,42,0.8)] opacity-0 transition-opacity duration-300"
                src="https://www.youtube.com/embed/b2eudGDe5J8?si=ZOhH9lo7IFMduJAJ"
                title="YouTube video player"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                onLoad={(e) => {
                  e.currentTarget.classList.remove("opacity-0");
                  const skeleton = document.getElementById("youtube-skeleton");
                  if (skeleton) skeleton.remove();
                }}
              ></iframe>
            </motion.div>
          </div>
        </motion.section>
      </div>
    </>
  );
};

export default ContactPage;