import { useState, useEffect } from 'preact/compat';

const allServices = [
  { name: "Santa Cena", time: "09:00hs - 10:00hs", day: "Domingos" },
  { name: "Reunión de Enseñanza", time: "10:00hs - 11:00hs", day: "Domingos" },
  { name: "Escuela Bíblica Dominical", time: "11:30hs - 13:00hs", day: "Domingos" },
  { name: "Encuentro de Oración", time: "20 hs", day: "Miércoles" },
  { name: "ActivAdos", time: "14:30 hs", day: "1º y 3º Sábados" },
  { name: "Encuentro de Jóvenes", time: "19 hs", day: "2º Sábados" },
  { name: "Encuentro de Mujeres", time: "17 hs", day: "4º Sábados" },
  { name: "Encuentro de Matrimonios", time: "Consultar Horarios", day: null }
];

export default function ServiceCarousel() {
  const [currentServiceIndex, setCurrentServiceIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentServiceIndex(prev => (prev + 1) % allServices.length);
        setIsVisible(true);
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleNext = () => {
    setIsVisible(false);
    setTimeout(() => {
      setCurrentServiceIndex(prev => (prev + 1) % allServices.length);
      setIsVisible(true);
    }, 500);
  };

  const handlePrev = () => {
    setIsVisible(false);
    setTimeout(() => {
      setCurrentServiceIndex(prev => (prev - 1 + allServices.length) % allServices.length);
      setIsVisible(true);
    }, 500);
  };

  const currentService = allServices[currentServiceIndex];

  return (
    <div className="relative h-96 w-full overflow-hidden text-white">
      {/* Service Card */}
      <div className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <h2 className="text-3xl font-bold mb-2 text-center font-sans">{currentService.name}</h2>
        <p className="text-lg mb-1 font-serif text-gray-400">{currentService.time}</p>
        <p className="text-md font-serif text-gray-400">{currentService.day}</p>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={handlePrev}
        className="absolute left-0 top-1/2 -translate-y-1/2 p-4 hover:bg-gray-800/50 transition-colors"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={handleNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 p-4 hover:bg-gray-800/50 transition-colors"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {allServices.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (index !== currentServiceIndex) {
                setIsVisible(false);
                setTimeout(() => {
                  setCurrentServiceIndex(index);
                  setIsVisible(true);
                }, 500);
              }
            }}
            className={`h-3 w-3 rounded-full transition-colors ${
              index === currentServiceIndex ? 'bg-white' : 'bg-gray-500'
            }`}
          />
        ))}
      </div>
    </div>
  );
}