import { useEffect, useRef } from 'react';
import type { RefObject } from 'react';
import Lenis from 'lenis';

const servicesByDay = {
  Domingos: [
    { name: 'Santa Cena', time: '09:00hs - 10:00hs' },
    { name: 'Reunión de Enseñanza', time: '10:00hs - 11:00hs' },
    { name: 'Escuela Bíblica Dominical', time: '11:30hs - 13:00hs' },
  ],
  Sábados: [
    { name: 'ActivAdos', time: '14:30 hs', note: '1º y 3º Sábados' },
    { name: 'Encuentro de Jóvenes', time: '19 hs', note: '2º y 4º Sábados' },
    { name: 'Encuentro de Mujeres', time: '17 hs', note: '4º Sábados' },
    { name: 'Encuentro de Matrimonios', time: "Consultar Horarios" }
  ],
  Miércoles: [
    { name: 'Encuentro de Oración', time: '20 hs' }
  ]
};

const dayKeys = ['Domingos', 'Sábados', 'Miércoles'] as const;
type DayKey = typeof dayKeys[number];

export default function Services({ onLoaded }: { onLoaded?: () => void } = {}) {
  const dayRefs: Record<DayKey, RefObject<HTMLDivElement | null>> = {
    Domingos: useRef<HTMLDivElement>(null),
    Sábados: useRef<HTMLDivElement>(null),
    Miércoles: useRef<HTMLDivElement>(null),
  };

  useEffect(() => {
    if (onLoaded) onLoaded();
  }, [onLoaded]);

  useEffect(() => {
    // Lenis smooth scroll
    const lenis = new Lenis({ lerp: 0.08 });
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => { lenis.destroy(); };
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    import('gsap').then((gsapModule) => {
      const gsap = gsapModule.default;
      import('gsap/ScrollTrigger').then((stModule) => {
        const ScrollTrigger = stModule.ScrollTrigger;
        gsap.registerPlugin(ScrollTrigger);

        dayKeys.forEach((day) => {
          const section = dayRefs[day].current;
          if (!section) return;
          const title = section.querySelector('.day-title');
          const services = section.querySelectorAll('.service-item');

          // Entrada: fade+slide del día y servicios, sincronizada con el scroll (scrub)
          gsap.set([title, services], { opacity: 0, y: 40 });

          gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              end: 'center center', // Termina de aparecer en el centro de la pantalla
              scrub: true,
            }
          })
            .to([title, services], {
              opacity: 1,
              y: 0,
              stagger: 0.25,
              ease: 'none',
            });

          // Salida: fade+slide up de todo el bloque, comienza cuando el centro del bloque pasa el centro de la pantalla
          gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: 'center center', // Empieza la salida justo después del centro
              end: 'bottom 40%', // Termina la salida antes de que el bloque salga completamente
              scrub: true,
            }
          })
            .to([title, services], {
              opacity: 0,
              y: -40,
              stagger: 0.1,
              ease: 'none',
            });
        });
      });
    });
  }, []);

  return (
    <div className="w-full min-h-screen bg-neutral-900 flex flex-col items-center sm:px-25">
      {/* Domingos - animado */}
      <div ref={dayRefs.Domingos} className="w-full max-w-5xl flex flex-col md:flex-row items-center justify-center md:justify-between min-h-screen py-24 px-4 md:px-0">
        <h2 className="day-title text-5xl font-bold text-white w-full md:w-1/3 text-left mb-4 md:mb-0 py-24 md:py-0">Domingos</h2>
        <div className="flex flex-col gap-12 w-full md:w-3/4 md:ml-auto items-start md:items-end">
          {servicesByDay.Domingos.map((service) => (
            <div key={service.name} className="service-item flex flex-col items-start md:items-end text-left md:text-right">
              <span className="text-2xl font-bold text-white">{service.name}</span>
              <span className="text-lg text-gray-200">{service.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Sábados - animado */}
      <div ref={dayRefs.Sábados} className="w-full max-w-5xl flex flex-col md:flex-row-reverse items-center justify-center md:justify-between min-h-screen py-24 px-4 md:px-0">
        <h2 className="day-title text-5xl font-bold text-white w-full md:w-1/3 text-right mb-4 md:mb-0 py-24 md:py-0">Sábados</h2>
        <div className="flex flex-col gap-12 w-full md:w-3/4 md:ml-auto items-start md:items-start">
          {servicesByDay.Sábados.map((service) => (
            <div key={service.name} className="service-item flex flex-col items-start md:items-start text-left md:text-left">
              <span className="text-2xl font-bold text-white">{service.name}</span>
              <span className="text-lg text-gray-200">{service.time}</span>
              {service.note && (
                <span className="text-md text-gray-400 italic">{service.note}</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Miércoles - animado */}
      <div ref={dayRefs.Miércoles} className="w-full max-w-5xl flex flex-col md:flex-row items-center justify-center md:justify-between min-h-screen py-24 px-4 md:px-0">
        <h2 className="day-title text-5xl font-bold text-white w-full md:w-1/3 text-left mb-4 md:mb-0 py-24 md:py-0">Miércoles</h2>
        <div className="flex flex-col gap-12 w-full md:w-3/4 md:ml-auto items-start md:items-end">
          {servicesByDay.Miércoles.map((service) => (
            <div key={service.name} className="service-item flex flex-col items-start md:items-end text-left md:text-right">
              <span className="text-2xl font-bold text-white">{service.name}</span>
              <span className="text-lg text-gray-200">{service.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}