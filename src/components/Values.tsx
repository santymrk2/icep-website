import { useRef, useEffect } from 'preact/compat';
import listValues from '../data/values.json';

const ValuesCarousel = () => {
  const scrollContainerRef = useRef(null);
  const firstCardRef = useRef(null);

  const handleScroll = (direction) => {
    if (!scrollContainerRef.current || !firstCardRef.current) return;

    const card = firstCardRef.current;
    const style = window.getComputedStyle(card);
    const marginRight = parseInt(style.marginRight, 10);
    const scrollAmount = card.offsetWidth + marginRight;

    scrollContainerRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    const handleWheel = (e) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      e.preventDefault();
      container.scrollLeft += e.deltaY;
    };

    container?.addEventListener('wheel', handleWheel, { passive: false });
    return () => container?.removeEventListener('wheel', handleWheel);
  }, []);

  return (
    <section className="container flex-grow w-full py-24 mx-auto overflow-hidden relative">
      <div className="container mx-auto mb-16">
        <h1 className="text-3xl text-center font-sans font-extrabold mb-6 uppercase">Nuestros valores</h1>
        <p className="text-gray-400 mb-6 text-center font-sans">
          Estos son los valores que abrazamos como iglesia.
        </p>
      </div>

      <div className="mx-auto w-full">
        <div className="container relative">
          {/* Flechas de navegación */}
          <button
            onClick={() => handleScroll('left')}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 z-10 rounded-full bg-zinc-800/70"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>

          <button
            onClick={() => handleScroll('right')}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 z-10 rounded-full bg-zinc-800/70"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>

          {/* Fondos degradados */}
          <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-zinc-800 to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-zinc-800 to-transparent pointer-events-none" />

          {/* Contenedor scrollable */}
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-scroll scrolling-touch items-start p-10 no-scrollbar "
          >
            {listValues.map((value, index) => (




              <div
                key={value.title}
                ref={index === 0 ? firstCardRef : null}
                className="flex-none h-10/12 w-80 mr-8 md:p-4 bg-zinc-700 p-5 rounded-lg shadow-lg"
              >
                <p class="text-sm text-gray-400 font-semibold">
                </p>
                <h3 class="text-xl font-bold mb-2">{value.title}</h3>
                <p class="text-gray-300">{value.content}</p>


              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValuesCarousel;