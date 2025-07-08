import { useState, useEffect } from "react";
import Card from "./Card.tsx";


export default function NextEvent({ onLoaded }: { onLoaded?: () => void } = {}) {
  const [pages, setPages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/events");
        const data = await response.json();
        console.log(data);
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
        <div className=" w-12 h-12 border-5 border-white border-b-transparent rounded-full inline-block box-border animate-spin mx-auto"></div>
        </div>
      </div>

    );
  }

  return (
    <div className="my-28 px-4 md:px-0 w-full flex flex-col-reverse md:flex-row items-center justify-center max-w-5xl mx-auto gap-8 text-white">
      {/* Columna de eventos (izquierda) */}
      <div className="w-full md:w-3/4 flex flex-col gap-6 items-center md:items-start">
        {
          pages && pages.length > 0 &&
          pages.map((item, index) => (
            <div key={item.id} className="flex flex-col justify-center items-center md:items-start w-full">
              <div className="container text-white w-44 sm:w-80 hover:scale-105 transition-transform duration-500 ease-out">
                <Card
                  href={item.pageLink}
                  title={item.type}
                  desc={``}
                  touchDisabled={false}
                />
              </div>
              <p className="text-center font-sans text-gray-400 mt-4">{item.date}</p>
              {index < pages.length - 1 && (
                <div className="h-px w-full bg-white/30 my-4 mt-8" />
              )}
            </div>
          ))
        }
      </div>
      {/* Columna de título (derecha/arriba en mobile) */}
      <div className="w-full md:w-1/3 flex flex-col justify-center items-center md:items-end text-center md:text-right">
        {
          pages && pages.length > 0 ? (
            pages.length === 1 ? (
              <h2 className="text-5xl font-sans font-bold">Próximo evento</h2>
            ) : (
              <h2 className="text-5xl font-sans font-bold">Próximos eventos</h2>
            )
          ) : (
            <p className="text-5xl font-sans font-bold">No hay eventos próximos.</p>
          )
        }
      </div>
    </div>
  );
}