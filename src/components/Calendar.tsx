import { useState, useEffect, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Plus,
  Calendar as CalendarIcon,
  User,
  Music,
  BookOpen,
  Mic,
  Play,
} from "lucide-react";

function getMonthDays(year: number, month: number) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const days = [];
  for (let d = 1; d <= lastDay.getDate(); d++) {
    days.push(new Date(year, month, d));
  }
  return days;
}

const monthNames = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

const monthNamesShort = [
  "Ene",
  "Feb",
  "Mar",
  "Abr",
  "May",
  "Jun",
  "Jul",
  "Ago",
  "Sep",
  "Oct",
  "Nov",
  "Dic",
];

const formatDateISO = (d: Date) => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};

export default function Calendar() {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(today);
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [expandedEventId, setExpandedEventId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"month" | "week" | "year">("week");
  const containerRef = useRef<HTMLDivElement>(null);

  const getDateRange = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    if (viewMode === "month") {
      const start = new Date(year, month, 1);
      const end = new Date(year, month + 1, 0);
      return { start, end };
    } else if (viewMode === "week") {
      const day = currentDate.getDay();
      const start = new Date(currentDate);
      start.setDate(currentDate.getDate() - day);
      const end = new Date(start);
      end.setDate(start.getDate() + 6);
      return { start, end };
    } else {
      const start = new Date(year, 0, 1);
      const end = new Date(year, 11, 31);
      return { start, end };
    }
  };

  useEffect(() => {
    setLoading(true);
    const { start, end } = getDateRange();
    const startISO = formatDateISO(start);
    const endISO = formatDateISO(end);

    fetch(`/api/events?start=${startISO}&end=${endISO}`)
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
        if (data.length > 0) {
          const firstId = data[0].id || `${data[0].startDate}-0`;
          setExpandedEventId(firstId);
        }
      })
      .catch((err) => console.error("Error fetching events:", err))
      .finally(() => setLoading(false));
  }, [currentDate, viewMode]);

  const sortedEvents = [...events].sort((a, b) => {
    return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
  });

  // Animation for list items
  useEffect(() => {
    if (!loading && events.length > 0) {
      const run = async () => {
        const { default: gsap } = await import("gsap");
        gsap.fromTo(
          ".calendar-event-item",
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.08,
            ease: "power2.out",
          },
        );
      };
      run();
    }
  }, [loading, events]);

  // Animation for expansion
  useEffect(() => {
    if (loading) return;

    const run = async () => {
      const { default: gsap } = await import("gsap");
      // Use GSAP to handle all height transitions
      const items = containerRef.current?.querySelectorAll(
        ".calendar-event-item",
      );
      items?.forEach((item) => {
        const id = item.getAttribute("data-id");
        const content = item.querySelector(".event-details-content");
        if (!content) return;

        if (id === expandedEventId) {
          gsap.to(content, {
            height: "auto",
            opacity: 1,
            duration: 0.4,
            ease: "power2.inOut",
          });
        } else {
          gsap.to(content, {
            height: 0,
            opacity: 0,
            duration: 0.3,
            ease: "power2.inOut",
          });
        }
      });
    };
    run();
  }, [expandedEventId, loading]);

  function handlePrev() {
    const newDate = new Date(currentDate);
    if (viewMode === "month") newDate.setMonth(newDate.getMonth() - 1);
    else if (viewMode === "week") newDate.setDate(newDate.getDate() - 7);
    else newDate.setFullYear(newDate.getFullYear() - 1);
    setCurrentDate(newDate);
    setExpandedEventId(null);
  }

  function handleNext() {
    const newDate = new Date(currentDate);
    if (viewMode === "month") newDate.setMonth(newDate.getMonth() + 1);
    else if (viewMode === "week") newDate.setDate(newDate.getDate() + 7);
    else newDate.setFullYear(newDate.getFullYear() + 1);
    setCurrentDate(newDate);
    setExpandedEventId(null);
  }

  const { start, end } = getDateRange();
  const rangeText = `${start.getDate()} ${monthNamesShort[start.getMonth()]}, ${start.getFullYear()} – ${end.getDate()} ${monthNamesShort[end.getMonth()]}, ${end.getFullYear()}`;

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleTimeString("es-AR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("es-AR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const getEventId = (ev: any, idx: number) =>
    ev.id || `${ev.startDate}-${idx}`;

  const getViewLabel = () => {
    switch (viewMode) {
      case "week":
        return "Semanal";
      case "year":
        return "Anual";
      default:
        return "Mensual";
    }
  };

  return (
    <div
      ref={containerRef}
      className="w-full max-w-2xl mx-auto rounded-2xl overflow-hidden"
    >
      {/* Navigation */}
      <div className="mx-4 mb-8 rounded-2xl bg-neutral-100 dark:bg-neutral-800/80 backdrop-blur-sm p-4 flex items-center justify-between border border-neutral-200 dark:border-neutral-700/50 shadow-sm">
        <div className="flex flex-col">
          <div className="relative group">
            <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-bold flex items-center gap-1 group-hover:text-primary transition-colors">
              {getViewLabel()}
              <ChevronDown size={12} />
            </span>
            <select
              value={viewMode}
              onChange={(e) => setViewMode(e.target.value as any)}
              className="absolute inset-0 opacity-0 w-full cursor-pointer"
            >
              <option value="month">Mensual</option>
              <option value="week">Semanal</option>
              <option value="year">Anual</option>
            </select>
          </div>
          <span className="text-sm font-semibold text-neutral-900 dark:text-white mt-0.5">
            {rangeText}
          </span>
        </div>
        <div className="flex gap-1.5">
          <button
            onClick={handlePrev}
            className="w-9 h-9 flex items-center justify-center rounded-xl border border-neutral-300 dark:border-neutral-700 text-neutral-600 dark:text-white hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={handleNext}
            className="w-9 h-9 flex items-center justify-center rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:opacity-90 transition-opacity"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Events */}
      <div className="px-4 pb-12">
        {loading ? (
          <div className="flex justify-center items-center py-24">
            <div className="w-10 h-10 rounded-full border-3 border-neutral-200 dark:border-neutral-800 border-t-primary animate-spin" />
          </div>
        ) : sortedEvents.length === 0 ? (
          <div className="text-center py-24">
            <CalendarIcon className="w-12 h-12 mx-auto text-neutral-300 dark:text-neutral-700 mb-4" />
            <p className="text-neutral-500">No hay eventos para mostrar</p>
          </div>
        ) : (
          <div className="space-y-2">
            {sortedEvents.map((ev, idx) => {
              const eventId = getEventId(ev, idx);
              const isExpanded = expandedEventId === eventId;
              const eventDate = new Date(ev.startDate);

              const details = [
                { icon: BookOpen, label: "Enseñanza", value: ev.enseñanza },
                { icon: User, label: "Presidencia", value: ev.presidencia },
                { icon: Music, label: "Alabanza", value: ev.alabanza },
                { icon: Mic, label: "Predicación", value: ev.predicacion },
                {
                  icon: Music,
                  label: "Música",
                  value: ev.participacionMusical,
                },
              ].filter((d) => d.value);

              return (
                <div
                  key={eventId}
                  data-id={eventId}
                  className="calendar-event-item border-b border-neutral-100 dark:border-neutral-800/50"
                >
                  <button
                    onClick={() =>
                      setExpandedEventId(isExpanded ? null : eventId)
                    }
                    className="w-full py-5 flex items-center justify-between text-left group"
                  >
                    <div className="flex gap-5 items-center">
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex flex-col items-center justify-center border border-neutral-200 dark:border-neutral-700">
                        <span className="text-[10px] font-bold uppercase text-neutral-400 leading-none mb-1">
                          {monthNamesShort[eventDate.getMonth()]}
                        </span>
                        <span className="text-base font-bold text-neutral-900 dark:text-white leading-none">
                          {eventDate.getDate()}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-bold text-neutral-900 dark:text-white group-hover:text-neutral-500 transition-colors">
                          {ev.type || "Evento"}
                        </h3>
                        <p className="text-xs text-neutral-500 mt-0.5">
                          {formatTime(ev.startDate)} hs
                        </p>
                      </div>
                    </div>
                    <div
                      className={`text-neutral-300 dark:text-neutral-600 transition-transform duration-300 ${isExpanded ? "rotate-45 text-primary" : ""}`}
                    >
                      <Plus size={20} />
                    </div>
                  </button>

                  <div className="event-details-content overflow-hidden h-0 opacity-0">
                    <div className="pb-8 pl-[4.25rem] pr-4 space-y-6">
                      {ev.subtema && (
                        <p className="text-base text-neutral-800 dark:text-neutral-200 leading-relaxed font-medium">
                          {ev.subtema}
                        </p>
                      )}

                      {details.length > 0 && (
                        <div className="grid gap-3 sm:grid-cols-2">
                          {details.map((d, i) => (
                            <div
                              key={i}
                              className="flex items-center gap-3 p-3 bg-neutral-50 dark:bg-neutral-800/40 rounded-2xl border border-neutral-100 dark:border-neutral-700/30"
                            >
                              <div className="w-8 h-8 rounded-lg bg-white dark:bg-neutral-800 flex items-center justify-center shadow-sm">
                                <d.icon size={14} className="text-primary" />
                              </div>
                              <div>
                                <p className="text-[10px] uppercase tracking-wider text-neutral-400 font-bold">
                                  {d.label}
                                </p>
                                <p className="text-sm text-neutral-900 dark:text-white font-medium">
                                  {d.value}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {ev.contenido && (
                        <div className="p-4 bg-neutral-50 dark:bg-neutral-800/20 rounded-2xl border border-neutral-100 dark:border-neutral-700/30">
                          <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed whitespace-pre-wrap">
                            {ev.contenido}
                          </p>
                        </div>
                      )}

                      {ev.youtubeLink && (
                        <a
                          href={ev.youtubeLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 bg-red-600 text-white text-xs font-bold px-5 py-2.5 rounded-full hover:bg-red-700 transition-colors shadow-lg shadow-red-600/20"
                        >
                          <Play size={14} fill="currentColor" />
                          VER EN YOUTUBE
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
