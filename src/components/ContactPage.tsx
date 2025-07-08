import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Lenis from 'lenis';

const ContactPage: React.FC = () => {
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
      <motion.div 
        className="h-[calc(100vh-18rem)] flex flex-col justify-center items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className="text-4xl font-bold font-sans text-center uppercase p-8 transition-all"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          ¿Cómo puedo comunicarme?
        </motion.h1>
        <motion.p 
          className="text-white opacity-50 font-sans text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Desliza para ver más ↓
        </motion.p>
      </motion.div>

      {/* Seccion Direccion */}
      <motion.section
        className="py-16 mx-4 my-16 sm:mx-10 rounded-xl flex flex-col justify-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-50px" }}
      >
        <div className="flex flex-col md:flex-row gap-6 lg:gap-24 m-2 md:items-center max-w-screen mx-auto">
          <motion.div
            className="flex flex-col justify-center items-start max-w-8xl mx-auto order-2 md:order-1 text-left md:text-right"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="text-left mb-12 mx-4">
              <motion.h1 
                className="text-3xl font-bold font-sans md:text-right"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                Visitanos en nuestra iglesia
              </motion.h1>
              <p className="text-gray-400 font-sans mt-3 md:text-right"></p>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <a href="https://maps.app.goo.gl/TEdvqX2pNJz34sfn8">
                <div className="flex flex-row gap-2 justify-center items-center">
                  <div className="order-2 md:order-1">
                    <h3 className="text-lg font-normal text-white text-left md:text-right">
                      Dirección
                    </h3>
                    <p className="text-gray-400 font-sans text-left md:text-right prose">
                      Av. Honorio Pueyrredón 2775, <br />
                      Pilar, Buenos Aires
                    </p>
                  </div>

                  <div className="order-1 md:order-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="size-16 fill-white"
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

          {/* Contenedor del mapa */}
          <motion.div
            className="order-2 md:order-2 py-2 flex justify-center items-center w-full animate-float relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {/* Esqueleto de carga */}
            <div
              id="skeleton"
              className="absolute inset-0 bg-zinc-400 dark:bg-zinc-700 rounded-lg animate-pulse"
            ></div>

            {/* Mapa */}
            <iframe
              id="mapIframe"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3290.8116776545207!2d-58.9129872!3d-34.4587799!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bc9d0a8b6bea3b%3A0x8f6a1a0b5f8c0a0e!2sAv.%20Dr.%20Honorio%20Pueyrred%C3%B3n%202775%2C%20B1631FZJ%20Pilar%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1625147200000!5m2!1ses!2sar"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              className="h-75 w-full max-w-xl mx-auto rounded-lg shadow-lg opacity-0 transition-opacity duration-300"
              onLoad={(e) => {
                e.currentTarget.classList.remove('opacity-0');
                const skeleton = document.getElementById('skeleton');
                if (skeleton) skeleton.remove();
              }}
            ></iframe>
          </motion.div>
        </div>
      </motion.section>

      {/* Seccion Youtube */}
      <motion.section
        className="h-[calc(100vh-18rem)] mx-4 my-16 sm:mx-10 rounded-xl flex flex-col justify-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-50px" }}
      >
        <div className="flex flex-col md:flex-row gap-8 sm:gap-10 lg:gap-24 m-2 md:items-center max-w-screen-lg mx-auto">
          {/* Contenedor del texto */}
          <motion.div
            className="flex flex-col justify-center items-start max-w-7xl mx-auto order-1 md:order-2 text-left md:text-left"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="text-left mb-12 mx-4">
              <motion.h1 
                className="text-3xl font-bold font-sans"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                Miranos en nuestro Youtube
              </motion.h1>
              <motion.p 
                className="text-gray-400 mt-3 font-sans"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
              >
                También podés acceder a nuestras reuniones en vivo a través de
                nuestro canal de Youtube
              </motion.p>
            </div>
            <motion.div 
              className="px-3"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <a href="https://www.youtube.com/@icepilar">
                <div className="flex flex-row gap-2 justify-center items-center">
                  <div className="">
                    <svg className="size-12 fill-white" fill="" viewBox="0 0 24 24">
                      <path
                        d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
                      ></path>
                    </svg>
                  </div>
                  <div className="">
                    <h3 className="text-lg font-normal text-white text-left">
                      Youtube
                    </h3>
                    <p className="text-gray-400 text-left font-sans">@icepilar</p>
                  </div>
                </div>
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            className="order-1 md:order-1 flex justify-center items-center w-full animate-float relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {/* Esqueleto de carga */}
            <div
              id="youtube-skeleton"
              className="absolute inset-0 bg-zinc-400 dark:bg-zinc-700 rounded-lg animate-pulse"
            ></div>

            {/* Video de YouTube */}
            <iframe
              id="youtubeIframe"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              className="h-75 w-full mx-auto rounded-lg shadow-lg opacity-0 transition-opacity duration-300"
              src="https://www.youtube.com/embed/b2eudGDe5J8?si=ZOhH9lo7IFMduJAJ"
              title="YouTube video player"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              onLoad={(e) => {
                e.currentTarget.classList.remove('opacity-0');
                const skeleton = document.getElementById('youtube-skeleton');
                if (skeleton) skeleton.remove();
              }}
            ></iframe>
          </motion.div>
        </div>
      </motion.section>

      {/* Seccion Redes */}
      <motion.section
        className="py-16 mx-4 my-16 mb-60 sm:mx-10 rounded-xl flex flex-col justify-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-50px" }}
      >
        <div className="flex flex-col md:flex-row sm:gap-10 lg:gap-24 m-2 md:items-center max-w-screen-lg mx-auto">
          <motion.div
            className="flex flex-col justify-center items-start max-w-7xl mx-auto order-2 md:order-1 text-left md:text-right"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="text-left mb-12 mx-4">
              <motion.h1 
                className="text-3xl font-bold font-sans md:text-right"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                Escribinos en nuestras redes
              </motion.h1>
              <motion.p 
                className="text-gray-400 font-sans mt-3 md:text-right prose"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
              >
                Nos podés enviar un email o un mensaje directo para que podamos
                ayudarte
              </motion.p>
            </div>
          </motion.div>

          <motion.div 
            className="order-2 md:order-2 flex justify-center w-full animate-float"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="aspect-w-16 aspect-h-9 w-full max-w-xl mx-auto">
              <div className="">
                <div className="shadow-2xl rounded-xl p-12">
                  <div className="grid grid-cols-1 sm:grid-cols-2 justify-items-center items-content-center gap-8">
                    <motion.a
                      href="mailto:info@icepilar.org"
                      className="m-4 group hover:text-white hover:scale-105 transform transition-all duration-300 ease-in-out"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="flex flex-col justify-center items-center w-40">
                        <div className="">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            className="size-12 group-hover:fill-gray-300 fill-white"
                          >
                            <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                            <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                          </svg>
                        </div>
                        <div className="text-center">
                          <h3 className="text-lg font-normal text-white text-center">
                            Email
                          </h3>
                          <p className="text-gray-400 text-center font-sans">
                            info@icepilar.org
                          </p>
                        </div>
                      </div>
                    </motion.a>

                    <motion.a
                      href="https://www.facebook.com/profile.php?id=61574986704374"
                      className="m-4 group hover:text-white hover:scale-105 transform transition-all duration-300 ease-in-out"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="flex flex-col justify-center items-center w-40">
                        <div className="flex-shrink-0">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="size-12 group-hover:fill-gray-300 fill-white"
                            viewBox="-5 0 20 20"
                          >
                            <path d="M6.821 20v-9h2.733L10 7H6.821V5.052C6.821 4.022 6.848 3 8.287 3h1.458V.14c0-.043-1.253-.14-2.52-.14C4.58 0 2.924 1.657 2.924 4.7V7H0v4h2.923v9h3.898Z" />
                          </svg>
                        </div>
                        <div className="text-center">
                          <h3 className="text-lg font-normal text-white text-center">
                            Facebook
                          </h3>
                          <p className="text-gray-400 text-center font-sans">
                            @icepilar
                          </p>
                        </div>
                      </div>
                    </motion.a>

                    <motion.a
                      href="https://www.instagram.com/ice_pilar?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                      className="m-4 group hover:text-white hover:scale-105 transform transition-all duration-300 ease-in-out"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="flex flex-col justify-center items-center w-40">
                        <div className="">
                          <svg
                            className="size-12 group-hover:fill-gray-300 fill-white"
                            viewBox="0 0 24 24"
                          >
                            <path fill="none" d="M0 0h24v24H0z" />
                            <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6.5-.25a1.25 1.25 0 0 0-2.5 0 1.25 1.25 0 0 0 2.5 0zM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" />
                          </svg>
                        </div>
                        <div className="text-center">
                          <h3 className="text-lg font-normal text-white text-center">
                            Instagram
                          </h3>
                          <p className="text-gray-400 text-center font-sans">
                            @ice_pilar
                          </p>
                        </div>
                      </div>
                    </motion.a>

                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </>
  );
};

export default ContactPage; 