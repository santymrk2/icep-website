import { useState, useEffect } from "react";

const buttonClasses = `
motion-preset-expand 
no-underline
rounded-xl
py-2
px-4
items-center
text-center
font-extrabold
text-xl
relative
z-10
transition-all
duration-500
ease-[cubic-bezier(0.785,0.135,0.15,0.86)]
tracking-wide
font-sans-camp
overflow-hidden
before:content-['']
before:absolute
before:top-0
before:right-0
before:w-0
before:h-full
before:bg-green-700
before:-z-10
before:transition-all
before:duration-500
before:ease-[cubic-bezier(0.785,0.135,0.15,0.86)]
hover:before:w-full
hover:before:left-0
hover:before:right-auto

`;


const buttonSelectClasses = `
motion-preset-expand 
bg-white
text-green-800
no-underline
rounded-xl
py-2
px-4
items-center
text-center
font-extrabold
text-xl
relative
z-10
transition-all
duration-500
ease-[cubic-bezier(0.785,0.135,0.15,0.86)]
tracking-wide
font-sans-camp
overflow-hidden
before:content-['']
before:absolute
before:top-0
before:right-0
before:w-0
before:h-full
before:-z-10
before:transition-all
before:duration-500
before:ease-[cubic-bezier(0.785,0.135,0.15,0.86)]
hover:before:w-full
hover:before:left-0
hover:before:right-auto
`;

const daysFolders = [
  { title: "Día 1", id: "1X-gPP38cKcERrvaiNoK2JYIzNfrrYLkf" },
  { title: "Día 2", id: "16mdcK6o6QtsiB4hsOvv35xHe6DSnWkJj" },
  { title: "Día 3", id: "16po3hsWDc1usM4KUNxV6t57T664L7rv5" },
  { title: "Día 4", id: "1YVTW1hApCK8kKsfMdAAEpEIb2AmkbIlL" }
];

const GaleryByDays = () => {
  const [idCarpeta, setIdCarpeta] = useState(daysFolders[0].id);
  const [imagenes, setImagenes] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(`/api/drive-images-camp/?carpetaId=${idCarpeta}`);
        if (!response.ok) {
          throw new Error("No se pudieron obtener las imágenes. Verifique el ID de la carpeta.");
        }
        const data = await response.json();
        setImagenes(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, [idCarpeta]);


  // Efecto para detectar el scroll y mostrar/ocultar el botón
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };
  
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section className="py-4 flex flex-col justify-center items-center">
      <h1 className="font-bold text-2xl mb-8 ">Nuestra galeria</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        {daysFolders.map((dia) => (
          <button
            key={dia.id}
            onClick={() => setIdCarpeta(dia.id)}
            className={`${idCarpeta === dia.id ? buttonSelectClasses : buttonClasses}`}
          >
            {dia.title}
          </button>
        ))}
      </div>

      {error ? (
        <p className="text-gray-300">Hubo un error... {console.log(error)}</p>
      ) : loading ? (
        <p className="text-gray-300">Cargando imágenes...</p>
      ) : imagenes.length === 0 ? (
        <p className="text-gray-300">No hay imágenes disponibles en esta carpeta.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 m-3">
          {imagenes.map((imagen) => (
            <a
              key={imagen.nombre}
              href={imagen.url}
              onClick={() => openModal(imagen)}
              className="cursor-pointer"
            >
              {/* Contenedor cuadrado que garantiza el mismo espacio para cada imagen */}
              <div className="relative aspect-square w-full">
                {/* Placeholder de carga */}
                <div className="absolute inset-0 flex items-center justify-center bg-gray-200 animate-pulse rounded-lg">
                  <span className="text-gray-500">Cargando...</span>
                </div>
                {/* Imagen ajustada para cubrir todo el contenedor */}
                <img
                  src={imagen.miniatura}
                  alt={imagen.nombre}
                  className="object-cover w-full h-full rounded-lg opacity-0 transition-opacity duration-300"
                  onLoad={(e) => {
                    e.target.previousElementSibling.classList.add('hidden');
                    e.target.classList.remove('opacity-0');
                  }}
                />
              </div>
            </a>
          ))}
        </div>
      )}
      {showScrollButton && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-4 right-4 px-4 py-2 bg-white text-green-800 rounded-lg shadow-lg motion-preset-expand"
        >
          Volver Arriba
        </button>
      )}

    </section>

  );
};


export default GaleryByDays;