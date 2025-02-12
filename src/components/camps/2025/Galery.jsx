import React, { useState, useEffect, useRef } from "react";
import Lightbox from "photoswipe/lightbox";
import PhotoSwipe from "photoswipe";

// Importar CSS necesario
import "photoswipe/dist/photoswipe.css";


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
    let lightbox;
  
    if (imagenes.length > 0 && galleryRef.current) {
      lightbox = new Lightbox({
        gallery: galleryRef.current,
        children: "a",
        pswpModule: PhotoSwipe,
        showHideAnimationType: "fade",
        zoom: true,
        bgOpacity: 0.9,
      });
  
      // Registro de elementos personalizados en la UI
      lightbox.on("uiRegister", function () {
        lightbox.pswp.ui.registerElement({
          name: "download-button",
          order: 8,
          isButton: true,
          tagName: "a",
          html: {
            isCustomSVG: true,
            inner: '<path d="M20.5 14.3 17.1 18V10h-2.2v7.9l-3.4-3.6L10 16l6 6.1 6-6.1ZM23 23H9v2h14Z" id="pswp__icn-download"/>',
            outlineID: "pswp__icn-download",
          },
          onInit: (el, pswp) => {
            el.setAttribute("download", "");
            el.setAttribute("target", "_blank");
            el.setAttribute("rel", "noopener");
            pswp.on("change", () => {
              el.href = pswp.currSlide.data.src;
            });
          },
        });
      });
  
      lightbox.init();
    }
  
    // Función de limpieza: destruye el lightbox y el plugin cuando cambien las imágenes
    return () => {
      if (lightbox) {
        lightbox.destroy();
      }
    };
  }, [imagenes]);
  
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
        <div key={idCarpeta} ref={galleryRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {imagenes.map((imagen) => (
            <a
              key={imagen.nombre}
              href={imagen.urlContent}
              data-pswp-src={imagen.urlContent}
              data-pswp-width={1400}
              data-pswp-height={1400}
              className="relative text-center hover:scale-103 animate duration-400 easy-out cursor-pointer"
            >
              <img
                src={imagen.miniatura}
                alt={imagen.nombre}
                loading="lazy"
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