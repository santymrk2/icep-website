import { useEffect, useMemo, useState, useRef } from "react";
import type { FC } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface ActivityCard {
  type: string;
  day: string;
  title: string;
  schedule: string;
  note?: string;
  startTime?: string;
  frequency?: string;
  image: string;
  alt: string;
}

const activities: ActivityCard[] = [
  {
    type: "SANTA CENA",
    day: "Domingos",
    title: "Santa Cena",
    schedule: "09:00 hs – 10:00 hs",
    startTime: "09:00",
    image: "/assets/Cena.jpg",
    alt: "Santa Cena en ICE Pilar",
  },
  {
    type: "REUNIÓN DE ENSEÑANZA",
    day: "Domingos",
    title: "Reunión de Enseñanza",
    schedule: "10:00 hs – 11:00 hs",
    startTime: "10:00",
    image: "/assets/Ensenianza.webp",
    alt: "Reunión de enseñanza dominical",
  },
  {
    type: "ESCUELA BÍBLICA DOMINICAL",
    day: "Domingos",
    title: "Escuela Bíblica Dominical",
    schedule: "11:30 hs – 13:00 hs",
    startTime: "11:30",
    image: "/assets/Escuelita.jpg",
    alt: "Escuela bíblica dominical para todas las edades",
  },
  {
    type: "ACTIVADOS",
    day: "Sábados",
    title: "Actividad de adolescentes",
    schedule: "14:30 hs",
    frequency: "1º y 3º sábados",
    startTime: "14:30",
    image: "/assets/adoloscentes.jpg",
    alt: "Grupo ActivAdos en la iglesia",
  },
  {
    type: "ENCUENTRO DE JÓVENES",
    day: "Sábados",
    title: "Encuentro de Jóvenes",
    schedule: "19:00 hs",
    frequency: "2º y 4º sábados",
    startTime: "19:00",
    image: "/assets/Jovenes.webp",
    alt: "Encuentro de jóvenes en ICE Pilar",
  },
  {
    type: "ENCUENTRO DE MUJERES",
    day: "Sábados",
    title: "Encuentro de Mujeres",
    schedule: "17:00 hs",
    frequency: "4º sábados",
    startTime: "17:00",
    image: "/assets/Mujeres.webp",
    alt: "Encuentro de mujeres de ICE Pilar",
  },
  {
    type: "ENCUENTRO DE MATRIMONIOS",
    day: "Sábados",
    title: "Encuentro de Matrimonios",
    schedule: "Consultar horarios",
    image: "/assets/Matrimonio.jpg",
    alt: "Encuentro de matrimonios en ICE Pilar",
  },
  {
    type: "ENCUENTRO DE ORACIÓN",
    day: "Miércoles",
    title: "Encuentro de Oración",
    schedule: "20:00 hs",
    startTime: "20:00",
    image: "/assets/Oracion.webp",
    alt: "Encuentro de oración entre semana",
  },
];

interface UpcomingMatch {
  badge: string;
  sortKey: number;
  scheduleOverride?: string;
}

const dayBadgeMap: Record<number, string> = {
  0: "Este domingo",
  1: "Este lunes",
  2: "Este martes",
  3: "Este miércoles",
  4: "Este jueves",
  5: "Este viernes",
  6: "Este sábado",
};

const Services: FC = () => {
  const [upcoming, setUpcoming] = useState<Record<string, UpcomingMatch>>({});
  const containerRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchUpcoming = async () => {
      try {
        const response = await fetch("/api/events");
        if (!response.ok) return;
        const events: Array<{ type?: string; startDate?: string }> = await response.json();
        if (!Array.isArray(events)) return;
        const matches: Record<string, UpcomingMatch> = {};
        const eventsByDate: Record<string, number> = {};
        events.forEach((event) => {
          const start = event.startDate ? new Date(event.startDate) : null;
          if (!start || !event.type) return;
          const dateKey = start.toISOString().split("T")[0];
          eventsByDate[dateKey] = (eventsByDate[dateKey] ?? 0) + 1;
        });
        const now = new Date();
        events.forEach((event) => {
          const eventType = event.type?.toUpperCase();
          const start = event.startDate ? new Date(event.startDate) : null;
          if (!eventType || !start || Number.isNaN(start.getTime())) return;
          if (start.getTime() <= now.getTime()) return;
          const activity = activities.find((item) => item.type === eventType);
          if (!activity) return;
          const dateKey = start.toISOString().split("T")[0];
          const multipleSameDay = (eventsByDate[dateKey] ?? 0) > 1;
          const notionTimeLabel = start.getHours() !== 0 || start.getMinutes() !== 0
            ? `${start.toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit", hour12: false })} hs`
            : undefined;
          const badgeBase = dayBadgeMap[start.getDay()];
          const badge = multipleSameDay && (notionTimeLabel || activity.startTime)
            ? `${badgeBase} · ${notionTimeLabel ?? activity.startTime}`
            : badgeBase;
          matches[activity.title] = { badge, sortKey: start.getTime(), scheduleOverride: notionTimeLabel };
        });
        setUpcoming(matches);
      } catch (error) { console.error("Error fetching upcoming events", error); }
    };
    fetchUpcoming();
  }, []);

  const sortedActivities = useMemo(() => {
    if (!Object.keys(upcoming).length) return activities;
    return [...activities].sort((a, b) => {
      const aMatch = upcoming[a.title];
      const bMatch = upcoming[b.title];
      if (aMatch && bMatch) return aMatch.sortKey - bMatch.sortKey;
      if (aMatch) return -1;
      if (bMatch) return 1;
      return 0;
    });
  }, [upcoming]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
        if (window.innerWidth < 1024) return;

        const cards = gsap.utils.toArray(".activity-card") as HTMLElement[];
        
        // --- THE MASTER TIMELINE ---
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: () => `+=${(cards.length + 2) * 80}%`, // Added duration for entrance and exit
                pin: true,
                scrub: 1,
                anticipatePin: 1,
            }
        });

        // 1. TITLE ENTRANCE (Occurs first, before cards arrive)
        tl.fromTo(".title-reveal", 
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out"
          }
        );

        // 2. CARDS STACKING SEQUENCE
        cards.forEach((card, i) => {
            gsap.set(card, { y: "100vh", opacity: 0 });

            tl.to(card, {
                y: i * 30,
                opacity: 1,
                duration: 1,
                ease: "power2.out"
            }, `+=${i === 0 ? 0.2 : 0}`); // Tiny gap after title finishes
        });

        // Add a small pause for the final stack
        tl.to({}, { duration: 0.5 });

        // 3. COMPLETE EXIT (Title and Stack disappear together)
        tl.to([".title-reveal", ".activity-card"], {
            opacity: 0,
            y: -80,
            duration: 1,
            stagger: 0.05,
            ease: "power3.in"
        });

    }, containerRef);

    return () => ctx.revert();
  }, [sortedActivities]);

  return (
    <section
      id="actividades"
      ref={containerRef}
      className="bg-neutral-100 px-6 dark:bg-neutral-900 overflow-hidden"
    >
      <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center min-h-screen">
        
        {/* Left Column: Fixed Centered Header */}
        <div ref={leftColRef} className="flex flex-col justify-center items-start space-y-6 py-12 lg:py-0">
            <div className="title-reveal opacity-0 inline-flex items-center gap-3 px-3 py-1 rounded-full bg-white dark:bg-neutral-800 shadow-sm border border-neutral-200 dark:border-neutral-700">
               <div className="size-1.5 rounded-full bg-blue-600" />
               <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500">
                 Participá
               </p>
            </div>
            
            <h2 className="title-reveal opacity-0 text-4xl lg:text-7xl font-bold text-neutral-900 dark:text-white leading-[1.1] tracking-tighter">
              Nuestras <br />
              <span className="text-blue-600 dark:text-blue-500">Actividades</span>
            </h2>
            
            <p className="title-reveal opacity-0 max-w-xs text-neutral-600 dark:text-neutral-400 text-sm sm:text-lg leading-relaxed">
                Descubrí los horarios y propuestas que tenemos para compartir cada semana en nuestra comunidad.
            </p>
        </div>

        {/* Right Column: Stacking Cards */}
        <div className="relative h-[60vh] lg:h-[80vh] w-full max-w-md mx-auto">
          {sortedActivities.map((activity, i) => {
            const highlight = upcoming[activity.title];
            const dayLabel = activity.frequency ?? activity.day;
            const displaySchedule = highlight?.scheduleOverride ?? activity.schedule;
            
            return (
              <article
                key={activity.title}
                className="activity-card absolute inset-0 group aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-neutral-200 dark:bg-neutral-800 shadow-xl border border-neutral-300 dark:border-white/10 lg:opacity-0"
              >
                <img
                  src={activity.image}
                  alt={activity.alt}
                  className="h-full w-full object-cover transition duration-1000 group-hover:scale-110"
                  loading="lazy"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-85" />
                
                <div className="absolute inset-x-0 bottom-0 p-8 sm:p-12 space-y-6 text-white">
                  <div className="flex flex-wrap gap-3">
                    {highlight ? (
                      <span className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-1.5 text-[9px] font-black uppercase tracking-widest text-white shadow-lg">
                        {highlight.badge}
                      </span>
                    ) : (
                      <span className="inline-flex items-center rounded-lg bg-white/10 backdrop-blur-md px-4 py-1.5 text-[9px] font-black uppercase tracking-widest text-white/90">
                        {dayLabel}
                      </span>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-2xl sm:text-4xl font-bold leading-tight tracking-tight">
                      {activity.title}
                    </h3>
                    <p className="text-blue-400 font-bold text-sm sm:text-lg">{displaySchedule}</p>
                  </div>

                  {activity.note && (
                    <p className="text-xs sm:text-sm text-white/50 italic max-w-xs line-clamp-2">
                       {activity.note}
                    </p>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
