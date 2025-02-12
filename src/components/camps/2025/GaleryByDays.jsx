import { useState, useEffect } from "react";

const baseUrl = import.meta.env.SITE || "http://localhost:4321";

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

    const [modalImage, setModalImage] = useState(null);
    const openModal = (image) => {
        setModalImage(image);
    };
    const closeModal = () => {
        setModalImage(null);
    };

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

    return (
        <section className="py-4 flex flex-col justify-center items-center">
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
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
                    {imagenes.map((imagen) => (
                        <div key={imagen.nombre} className="relative w-[150px] text-center hover:scale-103 animate duration-400 easy-out cursor-pointer" onClick={() => openModal(imagen)}> {/* Added onClick */}
                            <div className="absolute inset-0 flex items-center justify-center bg-gray-200 animate-pulse rounded-lg">
                                <span className="text-gray-500">Cargando...</span>
                            </div>
                            <img
                                src={imagen.miniatura}
                                alt={imagen.nombre}
                                className="w-[150px] h-auto rounded-lg opacity-0 transition-opacity duration-300"
                                onLoad={(e) => {
                                    e.target.previousElementSibling.classList.add('hidden');
                                    e.target.classList.remove('opacity-0');
                                }}
                            />
                        </div>
                    ))}
                </div>
            )}

            {/* Modal */}
            {modalImage && (
                <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50 backdrop-blur-[5px]" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}> {/* Added backdrop-blur and rgba background */}
                    <div className="flex flex-col justify-center items-center bg-white rounded-lg p-8 max-w-4xl max-h-screen overflow-y-auto relative">
                        <button onClick={closeModal} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <img src={modalImage.miniatura} alt={modalImage.nombre} className="w-full h-auto rounded-lg mb-8" /> {/* Display full image with correct link */}
                        <a
                            href={modalImage.urlDownload}
                            className={buttonClasses + "ring ring-1 ring-green-700 text-green-700 hover:text-white"}
                        >
                            Descargar
                        </a>
                    </div>
                </div>
            )}
        </section>
    );
};


export default GaleryByDays;