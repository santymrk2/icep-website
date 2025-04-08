import { useState, useEffect } from "preact/hooks";


export default function NextEvent() {
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
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div class="my-28 p-8 m-8 flex justify-center items-center">
        <div class="relative h-16 w-16">
          {/* Background circle (light gray) */}
          <div class="absolute inset-0 rounded-full border-4 border-gray-500"></div>
          {/* Spinner (blue circle segment) */}
          <div class="absolute inset-0 rounded-full border-4 border-transparent border-t-[#2a38b2] animate-spin"></div>
        </div>
      </div>

    );
  }

  return (
    <div class="my-28 p-8 m-8 gap-6 mx-4 sm:mx-10 text-white">
      {
        pages && pages.length > 0 ? (
          pages.length === 1 ? (
            <h2 class="text-3xl font-sans font-extrabold text-center mb-8">Próximo evento</h2>
          ) : (
            <h2 class="text-3xl font-sans font-extrabold text-center mb-8">Próximos eventos</h2>
          )
        ) : (
          <p class="text-center">No hay eventos próximos.</p>
        )
      }

      {
        pages && pages.length > 0 &&
        pages.map((item, index) => (
          <div class="flex flex-col justify-center items-center">
            <div
              class={`
                                animate-[float3d_6s_ease-in-out_infinite]
                                hover:scale-103 transition-transform duration-500 ease-out
                                ring ring-1
                                ${item.type === "ACTIVADOS" ? "ring-green-500 shadow-green-500/60" : ""}
                                ${item.type === "REUNIÓN DE ENSEÑANZA" ? "ring-blue-500 shadow-blue-500/60" : ""}
                                ${item.type === "ENCUENTRO DE ORACIÓN" ? "ring-orange-500 shadow-orange-500/60" : ""}
                                ${item.type === "ENCUENTRO DE JÓVENES" ? "ring-purple-500 shadow-purple-500/60" : ""}
                                ${item.type === "ENCUENTRO DE MUJERES" ? "ring-rose-500 shadow-rose-500/60" : ""}
                                ${item.type === "ENCUENTRO DE MATRIMONIOS" ? "ring-red-500 shadow-red-500/60" : ""}
                                ${!["ACTIVADOS", "REUNIÓN DE ENSEÑANZA", "ENCUENTRO DE ORACIÓN", "ENCUENTRO DE JÓVENES", "ENCUENTRO DE MUJERES", "ENCUENTRO DE MATRIMONIOS"].includes(item.type) ? "ring-custom-blue shadow-custom-blue/60" : ""}
                                shadow-lg rounded-xl md:p-2 my-6
                            `}
            >
              <a href={item.pageLink}>
                <h1 class="text-4xl p-6 sm:text-6xl font-black text-center">
                  {item.type}
                </h1>
              </a>
            </div>
            <p class="text-center font-serif text-gray-400 mt-4">{item.date}</p>

            {index < pages.length - 1 && (
              <div class="h-px w-full bg-white/30 my-4 mt-8" />
            )}
          </div>
        ))
      }
    </div>
  );
}