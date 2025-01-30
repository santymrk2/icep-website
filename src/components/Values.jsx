import { useRef, useEffect } from 'react';
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
    <section className="container flex-grow w-full py-4 sm:py-16 mx-auto overflow-hidden relative">
      <h1 className="text-center text-3xl mb-4 uppercase bg-white text-gray-700 mx-auto">
        Nuestros Valores
      </h1>
      
      <div className="mx-auto w-full">
        <div className="container my-8 relative">
          {/* Flechas de navegación */}
          <button 
            onClick={() => handleScroll('left')}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 z-10"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          
          <button 
            onClick={() => handleScroll('right')}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 z-10"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>

          {/* Fondos degradados */}
          <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-white to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-white to-transparent pointer-events-none" />

          {/* Contenedor scrollable */}
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-scroll scrolling-touch items-start p-20 no-scrollbar"
          >
            {listValues.map((value, index) => (
              <div 
                key={value.title}
                ref={index === 0 ? firstCardRef : null}
                className="flex-none h-96 w-80 mr-8 md:p-4 shadow-custom-blue rounded-xl"
              >
                <div className="space-y-4">
                  <div className="px-8 py-6">
                    <div className="leading-6 space-y-1">
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">
                        {value.title}
                      </h3>
                    </div>
                    <div>
                      <p className="text-base">
                        {value.content}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValuesCarousel;