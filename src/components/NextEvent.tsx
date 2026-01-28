import { useState, useEffect } from "react";
import Card from "./Card.tsx";
import { motion, AnimatePresence } from "framer-motion";
import EventDetails from "../components/EventDetails"; // ruta según tu proyecto

export default function NextEvent({
  onLoaded,
}: { onLoaded?: () => void } = {}) {
  const [pages, setPages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalEvent, setModalEvent] = useState<any | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/events");
        const data = await response.json();
        setPages(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
        if (onLoaded) onLoaded();
      }
    };
    fetchData();
  }, [onLoaded]);

  if (loading) {
    return (
      <div className="my-28 p-8 m-8 flex justify-center items-center">
        <div className="relative h-16 w-16">
          <div className="w-12 h-12 border-5 border-neutral-900 dark:border-white light:border-neutral-900 border-b-transparent rounded-full inline-block box-border animate-spin mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <AnimatePresence>
        {!loading && (
          <motion.div
            key="next-event-block"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mx-8 my-28 px-4 md:px-0 w-full flex flex-col-reverse md:flex-row items-center justify-center max-w-5xl mx-auto gap-8 text-neutral-900 dark:text-white light:text-neutral-900"
          >
            {/* Columna de eventos (izquierda) */}
            <div className="w-full md:w-3/4 mx-8 flex flex-col gap-6 items-center md:items-start">
              {pages &&
                pages.length > 0 &&
                pages.map((item, index) => (
                  <div
                    key={item.id}
                    className="flex flex-col justify-center items-center md:items-start w-full "
                  >
                    <div className="container text-neutral-900 dark:text-white light:text-neutral-900 w-44 sm:w-80 hover:scale-105 transition-transform duration-500 ease-out">
                      <Card
                        href={item.pageLink}
                        title={item.type}
                        desc={``}
                        touchDisabled={true}
                        onClick={() => setModalEvent(item)}
                      />
                    </div>

                    {index < pages.length - 1 && (
                      <div className="h-px w-full bg-neutral-300 dark:bg-white/30 light:bg-neutral-300 my-4 mt-8" />
                    )}
                  </div>
                ))}
            </div>

            {/* Columna de título (derecha/arriba en mobile) */}
            <div className="w-full md:w-1/3 mx-8 flex flex-col justify-center items-center md:items-end text-center md:text-right">
              {pages && pages.length > 0 ? (
                pages.length === 1 ? (
                  <h2 className="text-3xl md:text-5xl font-sans font-bold">
                    Próximo evento
                  </h2>
                ) : (
                  <h2 className="text-3xl md:text-5xl font-sans font-bold">
                    Próximos eventos
                  </h2>
                )
              ) : (
                <p className="text-3xl md:text-5xl font-sans font-bold">
                  No hay eventos próximos.
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Aquí mostramos el modal de detalles */}
      {modalEvent && (
        <EventDetails
          events={[modalEvent]}
          onClose={() => setModalEvent(null)}
        />
      )}
    </>
  );
}

