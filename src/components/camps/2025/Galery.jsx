import React, { useState, useEffect, useRef } from "react";
import lightGallery from "lightgallery";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";

// Importar CSS necesario
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";

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
    
    const galleryRef = useRef(null);
  const lightGalleryInstance = useRef(null);

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


  useEffect(() => {
    const initGallery = () => {
      if (galleryRef.current && imagenes.length > 0) {
        if (lightGalleryInstance.current) {
          lightGalleryInstance.current.destroy(true);
        }
        
        lightGalleryInstance.current = lightGallery(galleryRef.current, {
          plugins: [lgThumbnail, lgZoom],
          selector: "a",
          download: true,
          thumbnail: true,
          showThumbByDefault: false,
          // Configuración adicional para mobile
          mobileSettings: {
            controls: false,
            showCloseIcon: true
          }
        });
        
        // Refresh la galería si hay cambios
        lightGalleryInstance.current.refresh();
      }
    };

    initGallery();
    
    return () => {
      if (lightGalleryInstance.current) {
        lightGalleryInstance.current.destroy(true);
      }
    };
  }, [imagenes]); // Solo se ejecuta cuando cambian las imágenes

  
  return (
    <section className="py-4 flex flex-col justify-center items-center">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        {daysFolders.map((dia) => (
          <button
            key={dia.id}
            onClick={() => setIdCarpeta(dia.id)}
            className={idCarpeta === dia.id ? buttonSelectClasses : buttonClasses}
          >
            {dia.title}
          </button>
        ))}
      </div>

      {error ? (
        <p className="text-gray-300">Hubo un error... {error}</p>
      ) : loading ? (
        <p className="text-gray-300">Cargando imágenes...</p>
      ) : imagenes.length === 0 ? (
        <p className="text-gray-300">No hay imágenes disponibles en esta carpeta.</p>
      ) : (
        // Contenedor que lightGallery utilizará para crear la galería
        <div ref={galleryRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
      {imagenes.map((imagen) => (
        <a
          key={imagen.nombre}
          href={imagen.urlContent}
          data-lg-size="1400-1400" // Añadir tamaño para mejor rendimiento
          data-sub-html={`<h4>${imagen.nombre}</h4>`}
          data-thumb={imagen.miniatura} // Especificar thumbnail
          className="relative text-center hover:scale-103 animate duration-400 easy-out cursor-pointer"
        >
          <img
            src={imagen.miniatura}
            alt={imagen.nombre}
            loading="lazy" // Mejorar performance
            className="w-[150px] h-auto rounded-lg"
          />
        </a>
      ))}

        </div>
      )}
    </section>
  );
};

export default GaleryByDays;