import { useState, useEffect } from "react";

const baseUrl = import.meta.env.SITE || "http://localhost:4321";

const daysFolders = [
    { title: "Día 1", id: "16pnmFDDwwQ9cVN37U74mjFbt67uCQIys" },
    { title: "Día 2", id: "16mdcK6o6QtsiB4hsOvv35xHe6DSnWkJj" },
    { title: "Día 3", id: "16po3hsWDc1usM4KUNxV6t57T664L7rv5" },
    { title: "Día 4", id: "1YVTW1hApCK8kKsfMdAAEpEIb2AmkbIlL" }
];

const GaleryByDays = () => {
    const [idCarpeta, setIdCarpeta] = useState(daysFolders[0].id);
    const [imagenes, setImagenes] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchImages = async () => {
            setLoading(true);
            setError("");
            try {
                const response = await fetch(`${baseUrl}/api/drive-images-camp/?carpetaId=${idCarpeta}`);
                if (!response.ok) {
                    throw new Error("No se pudieron obtener las imágenes. Verifique el ID de la carpeta.");
                }
                const data = await response.json();
                if (!Array.isArray(data) || data.length === 0) {
                    throw new Error("No hay imágenes disponibles en esta carpeta.");
                }
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
        <section className="py-10 flex flex-col justify-center items-center">
            <h1 className="text-4xl font-black text-center mb-10">Imágenes</h1>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
                {daysFolders.map((dia) => (
                    <button
                        key={dia.id}
                        onClick={() => setIdCarpeta(dia.id)}
                        className={`motion-preset-expand  text-white uppercase no-underline ring-1 ring-white rounded-xl py-4 px-6 items-center text-center text-md font-bold relative z-10 transition-all duration-500 ease-[cubic-bezier(0.785,0.135,0.15,0.86)] tracking-wide font-sans-camp overflow-hidden before:content-[''] before:absolute before:top-0 before:right-0 before:w-0 before:h-full before:bg-white before:-z-10 before:transition-all before:duration-500 before:ease-[cubic-bezier(0.785,0.135,0.15,0.86)] hover:before:w-full hover:before:left-0 hover:before:right-auto hover:text-green-800 inline-flex`}
                    >
                        {dia.title}
                    </button>
                ))}
            </div>

            {error ? (
                <p className="text-red-500">{error}</p>
            ) : loading ? (
                <p className="text-gray-500">Cargando imágenes...</p>
            ) : imagenes.length === 0 ? (
                <p className="text-gray-500">No hay imágenes disponibles en esta carpeta.</p>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
                    {imagenes.map((imagen) => (
                        <a key={imagen.nombre} href={imagen.url} target="_blank" >
                            <div className="relative w-[150px] text-center hover:scale-103 animate duration-400 easy-out">
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
                        </a>
                    ))}
                </div>
            )}
        </section>
    );
};


export default GaleryByDays;
