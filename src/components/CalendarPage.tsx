import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Lenis from "lenis";
import Calendar from "./Calendar";

const CalendarPage: React.FC = () => {
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
    <motion.section
      className="py-8 sm:py-16 mb-24 sm:mb-36"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <header className="text-center mb-8 sm:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-3"
          >
            Descubrí lo que está pasando
          </motion.div>

          <motion.h1
            className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 text-neutral-900 dark:text-white"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Explorá el Calendario
          </motion.h1>

          <motion.p
            className="text-sm sm:text-base leading-relaxed text-neutral-500 dark:text-neutral-400 px-2 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Unite a nuestros servicios semanales, reuniones, eventos especiales y otros encuentros.
          </motion.p>
        </header>

        {/* Calendar Component */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Calendar />
        </motion.div>
      </div>
    </motion.section>
  );
};

export default CalendarPage;
