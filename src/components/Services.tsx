import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { FC } from "react";

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
    image: "/assets/Ensenianza.png",
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
    image: "/assets/Jovenes.jpg",
    alt: "Encuentro de jóvenes en ICE Pilar",
  },
  {
    type: "ENCUENTRO DE MUJERES",
    day: "Sábados",
    title: "Encuentro de Mujeres",
    schedule: "17:00 hs",
    frequency: "4º sábados",
    startTime: "17:00",
    image: "/assets/Mujeres.jpg",
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
    image: "/assets/Oracion.png",
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
  const sliderRef = useRef<HTMLDivElement>(null);
  const [upcoming, setUpcoming] = useState<Record<string, UpcomingMatch>>({});

  useEffect(() => {
    const fetchUpcoming = async () => {
      try {
        const response = await fetch("/api/events");
        if (!response.ok) return;
        const events: Array<{ type?: string; startDate?: string }> =
          await response.json();

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
          const hasCustomTime =
            start.getHours() !== 0 || start.getMinutes() !== 0;
          const notionTimeLabel = hasCustomTime
            ? `${start.toLocaleTimeString("es-AR", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })} hs`
            : undefined;

          const badgeBase = dayBadgeMap[start.getDay()];
          const badge =
            multipleSameDay && (notionTimeLabel || activity.startTime)
              ? `${badgeBase} · ${notionTimeLabel ?? activity.startTime}`
              : badgeBase;

          matches[activity.title] = {
            badge,
            sortKey: start.getTime(),
            scheduleOverride: notionTimeLabel,
          };
        });

        setUpcoming(matches);
      } catch (error) {
        console.error("Error fetching upcoming events", error);
      }
    };

    fetchUpcoming();
  }, []);

  const sortedActivities = useMemo(() => {
    if (!Object.keys(upcoming).length) return activities;

    return [...activities].sort((a, b) => {
      const aMatch = upcoming[a.title];
      const bMatch = upcoming[b.title];

      if (aMatch && bMatch) {
        return aMatch.sortKey - bMatch.sortKey;
      }

      if (aMatch) return -1;
      if (bMatch) return 1;
      return 0;
    });
  }, [upcoming]);

  useEffect(() => {
    if (!sliderRef.current) return;
    sliderRef.current.scrollTo({ left: 0, behavior: "auto" });
  }, [sortedActivities]);

  const scrollByCards = (direction: -1 | 1) => {
    const container = sliderRef.current;
    if (!container) return;

    const card = container.querySelector<HTMLElement>("article");
    const cardWidth = card
      ? card.getBoundingClientRect().width
      : container.clientWidth;
    const gapValue = parseFloat(getComputedStyle(container).columnGap || "0");
    const gap = Number.isNaN(gapValue) ? 24 : gapValue;

    container.scrollBy({
      left: direction * (cardWidth + gap),
      behavior: "smooth",
    });
  };

  return (
    <section
      id="actividades"
      className="bg-neutral-100 px-6 py-28 dark:bg-neutral-900 sm:py-40"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-10">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
              Actividades
            </p>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              Participa en Nuestra Comunidad
            </h2>
          </div>
          <div className="flex items-center space-x-3">
            <button
              type="button"
              className="rounded-full bg-white p-2 shadow transition hover:scale-105 dark:bg-neutral-800"
              aria-label="Actividades anteriores"
              onClick={() => scrollByCards(-1)}
            >
              <ChevronLeft className="h-5 w-5 text-gray-700 dark:text-gray-200" />
            </button>
            <button
              type="button"
              className="rounded-full bg-white p-2 shadow transition hover:scale-105 dark:bg-neutral-800"
              aria-label="Actividades siguientes"
              onClick={() => scrollByCards(1)}
            >
              <ChevronRight className="h-5 w-5 text-gray-700 dark:text-gray-200" />
            </button>
          </div>
        </div>

        <div
          ref={sliderRef}
          className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar snap-x snap-mandatory"
        >
          {sortedActivities.map((activity) => {
            const highlight = upcoming[activity.title];
            const dayLabel = activity.frequency ?? activity.day;
            const displaySchedule =
              highlight?.scheduleOverride ?? activity.schedule;
            return (
              <article
                key={activity.title}
                className="group relative h-80 min-w-[280px] flex-1 overflow-hidden rounded-2xl shadow-lg snap-start sm:min-w-[320px] lg:min-w-[360px]"
              >
                <img
                  src={activity.image}
                  alt={activity.alt}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  loading="lazy"
                />
                <div
                  className="absolute inset-0 bg-black/45 transition duration-300 group-hover:bg-black/60"
                  aria-hidden="true"
                />
                <div className="absolute bottom-4 left-4 right-4 space-y-1 text-white">
                  {highlight ? (
                    <span className="inline-flex items-center rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                      {highlight.badge}
                    </span>
                  ) : (
                    <span className="text-xs font-semibold uppercase tracking-wide text-white/70">
                      {dayLabel}
                    </span>
                  )}
                  <h3 className="text-lg font-bold leading-tight">
                    {activity.title}
                  </h3>
                  <p className="text-sm">{displaySchedule}</p>
                  {activity.note && (
                    <p className="text-xs text-white/80">{activity.note}</p>
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