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
    <div className="my-28 p-8 m-8 gap-6 mx-4 sm:mx-10 text-white">
      {
        pages && pages.length > 0 ? (
          pages.length === 1 ? (
            <h2 className="text-3xl font-sans font-bold text-center mb-8">Próximo evento</h2>
          ) : (
            <h2 className="text-3xl font-sans font-bold text-center mb-8">Próximos eventos</h2>
          )
        ) : (
          <p className="text-center">No hay eventos próximos.</p>
        )
      }

      {
        pages && pages.length > 0 &&
        pages.map((item, index) => (
          <div key={item.id} className="flex flex-col justify-center items-center">
      <div className="container mx-auto text-white w-44 sm:w-68 hover:scale-105 transition-transform duration-500 ease-out">
            <Card
              href={item.pageLink}
              title={item.type}
              desc={``}
              touchDisabled={false}
            />
</div>

{/* 
            <div
              className={`
                                animate-[float3d_6s_ease-in-out_infinite]
                                hover:scale-103 transition-transform duration-500 ease-out
                                ring-2 ring-white/20
                                ${item.type === "ACTIVADOS" ? "bg-green-500/10 text-green-500" : ""}
                                ${item.type === "REUNIÓN DE ENSEÑANZA" ? "bg-blue-500/10 text-blue-500" : ""}
                                ${item.type === "ENCUENTRO DE ORACIÓN" ? "bg-orange-500/10 text-orange-500" : ""}
                                ${item.type === "ENCUENTRO DE JÓVENES" ? "bg-purple-500/10 text-purple-500" : ""}
                                ${item.type === "ENCUENTRO DE MUJERES" ? "bg-rose-500/10 text-rose-500" : ""}
                                ${item.type === "ENCUENTRO DE MATRIMONIOS" ? "bg-red-500/10 text-red-500" : ""}
                                ${!["ACTIVADOS", "REUNIÓN DE ENSEÑANZA", "ENCUENTRO DE ORACIÓN", "ENCUENTRO DE JÓVENES", "ENCUENTRO DE MUJERES", "ENCUENTRO DE MATRIMONIOS"].includes(item.type) ? "bg-custom-blue/10 text-custom-blue" : ""}
                                rounded-xl md:p-4 my-4
                            `}
            >
              <a href={item.pageLink}>
                <h1 className="text-3xl p-6 font-bold text-center">
                  {item.type}
                </h1>
              </a>
            </div>

*/}

            <p className="text-center font-sans text-gray-400 mt-4">{item.date}</p>

            {index < pages.length - 1 && (
              <div className="h-px w-full bg-white/30 my-4 mt-8" />
            )}
          </div>
        ))
      }
    </div>
  );
}