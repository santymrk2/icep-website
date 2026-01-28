import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  X,
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

function sameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

const monthNames = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

const monthNamesShort = [
  "Ene", "Feb", "Mar", "Abr", "May", "Jun",
  "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"
];

// Helper para formatear fecha YYYY-MM-DD local
const formatDateISO = (d: Date) => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
};

export default function Calendar() {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(today);
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [expandedEventId, setExpandedEventId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"month" | "week" | "year">("month");

  // Calcular rango de fechas según la vista
  const getDateRange = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    if (viewMode === "month") {
      const start = new Date(year, month, 1);
      const end = new Date(year, month + 1, 0);
      return { start, end };
    } else if (viewMode === "week") {
      const day = currentDate.getDay(); // 0 (Domingo) - 6 (Sábado)
      const start = new Date(currentDate);
      start.setDate(currentDate.getDate() - day); // Ir al Domingo
      const end = new Date(start);
      end.setDate(start.getDate() + 6); // Ir al Sábado
      return { start, end };
    } else {
      // Anual
      const start = new Date(year, 0, 1);
      const end = new Date(year, 11, 31);
      return { start, end };
    }
  };

  // Cargar eventos cuando cambia fecha o vista
  useEffect(() => {
    setLoading(true);
    const { start, end } = getDateRange();
    const startISO = formatDateISO(start);
    const endISO = formatDateISO(end);

    fetch(`/api/events?start=${startISO}&end=${endISO}`)
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
        // Auto-expand first event if available
        if (data.length > 0) {
          setExpandedEventId(data[0].id || `${data[0].startDate}-0`);
        }
      })
      .catch(err => console.error("Error fetching events:", err))
      .finally(() => setLoading(false));
  }, [currentDate, viewMode]);

  // Group and sort events by date
  const sortedEvents = [...events].sort((a, b) => {
    return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
  });

  function handlePrev() {
    const newDate = new Date(currentDate);
    if (viewMode === "month") {
      newDate.setMonth(newDate.getMonth() - 1);
    } else if (viewMode === "week") {
      newDate.setDate(newDate.getDate() - 7);
    } else {
      newDate.setFullYear(newDate.getFullYear() - 1);
    }
    setCurrentDate(newDate);
    setExpandedEventId(null);
  }

  function handleNext() {
    const newDate = new Date(currentDate);
    if (viewMode === "month") {
      newDate.setMonth(newDate.getMonth() + 1);
    } else if (viewMode === "week") {
      newDate.setDate(newDate.getDate() + 7);
    } else {
      newDate.setFullYear(newDate.getFullYear() + 1);
    }
    setCurrentDate(newDate);
    setExpandedEventId(null);
  }

  // Range Text
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

  const getEventId = (ev: any, idx: number) => ev.id || `${ev.startDate}-${idx}`;

  const getViewLabel = () => {
    switch (viewMode) {
      case "week": return "Vista Semanal";
      case "year": return "Vista Anual";
      default: return "Vista Mensual";
    }
  };

  const getHeaderTitle = () => {
    if (viewMode === "year") return currentDate.getFullYear().toString();
    if (viewMode === "week") {
      // Si la semana cruza meses, mostrar "Ene - Feb 2026"
      const { start, end } = getDateRange();
      if (start.getMonth() !== end.getMonth()) {
        return `${monthNamesShort[start.getMonth()]} - ${monthNamesShort[end.getMonth()]} ${end.getFullYear()}`;
      }
    }
    return `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
  };

  return (
    <div className="w-full max-w-2xl mx-auto rounded-2xl overflow-hidden">
      {/* Navigation Bar */}
      <div className="mx-4 mb-6 rounded-xl bg-neutral-200 dark:bg-neutral-800/80 backdrop-blur-sm p-4 flex items-center justify-between shadow-lg border border-neutral-300 dark:border-neutral-700/50">
        <div className="flex flex-col items-start text-left relative">
          <div className="relative z-10">
            <span className="text-xs uppercase tracking-wide text-neutral-500 dark:text-neutral-400 font-semibold flex items-center gap-1 cursor-pointer hover:text-primary transition-colors">
              {getViewLabel()}
              <ChevronDown size={14} />
            </span>
            <select
              value={viewMode}
              onChange={(e) => setViewMode(e.target.value as any)}
              className="absolute inset-0 opacity-0 w-full h-full cursor-pointer appearance-none"
              aria-label="Seleccionar vista"
            >
              <option value="month">Vista Mensual</option>
              <option value="week">Vista Semanal</option>
              <option value="year">Vista Anual</option>
            </select>
          </div>
          <span className="text-sm font-medium text-neutral-900 dark:text-white mt-0.5">{rangeText}</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handlePrev}
            className="w-10 h-10 flex items-center justify-center rounded-lg border border-neutral-400 dark:border-neutral-600 text-neutral-700 dark:text-white hover:bg-neutral-300 dark:hover:bg-neutral-700 hover:border-neutral-500 transition-all duration-200"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={handleNext}
            className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary text-white hover:bg-primary/90 transition-all duration-200"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Title */}
      <div className="px-4 mb-4">
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
          {getHeaderTitle()}
        </h2>
      </div>

      {/* Events List */}
      <div className="px-4 pb-8">
        {loading ? (
          <div className="flex justify-center items-center py-16">
            <div className="relative">
              <div className="w-12 h-12 rounded-full border-4 border-neutral-300 dark:border-neutral-700 border-t-primary animate-spin"></div>
            </div>
          </div>
        ) : sortedEvents.length === 0 ? (
          <div className="text-center py-16">
            <CalendarIcon className="w-16 h-16 mx-auto text-neutral-400 dark:text-neutral-600 mb-4" />
            <p className="text-neutral-500 dark:text-neutral-400 text-lg">No hay eventos en este período</p>
          </div>
        ) : (
          <div className="space-y-0">
            <AnimatePresence mode="wait">
              {sortedEvents.map((ev, idx) => {
                const eventId = getEventId(ev, idx);
                const isExpanded = expandedEventId === eventId;
                const eventDate = new Date(ev.startDate);
                const dayNum = eventDate.getDate();
                const monthShort = monthNamesShort[eventDate.getMonth()];

                const details = [
                  { icon: BookOpen, label: "Enseñanza", value: ev.enseñanza },
                  { icon: User, label: "Presidencia", value: ev.presidencia },
                  { icon: Music, label: "Alabanza", value: ev.alabanza },
                  { icon: Mic, label: "Predicación", value: ev.predicacion },
                  { icon: Music, label: "Participación Musical", value: ev.participacionMusical },
                ].filter((d) => d.value);

                return (
                  <motion.div
                    key={eventId}
                    layout="position"
                    className="border-b border-neutral-300 dark:border-neutral-700/50 overflow-hidden"
                  >
                    {/* Header - Always visible, Clickable */}
                    <button
                      onClick={() => setExpandedEventId(isExpanded ? null : eventId)}
                      className="w-full py-4 flex items-center justify-between cursor-pointer -mx-4 px-4 text-left transition-colors"
                    >
                      <div className="flex gap-4 items-center">
                        {/* Date Badge */}
                        <div className="flex-shrink-0 w-12 h-12 border-2 border-neutral-700 dark:border-white/80 rounded-lg flex flex-col items-center justify-center opacity-80 decoration-0">
                          <span className="text-[0.55rem] font-bold uppercase leading-none text-neutral-500 dark:text-neutral-400">
                            {monthShort}
                          </span>
                          <span className="text-base font-bold leading-none text-neutral-900 dark:text-white">
                            {dayNum}
                          </span>
                        </div>
                        {/* Title & Time */}
                        <div>
                          <h3 className="font-bold text-lg text-neutral-900 dark:text-white">
                            {ev.type || "Evento"}
                          </h3>
                          <p className="text-xs text-neutral-500 dark:text-neutral-400">
                            {formatTime(ev.startDate)} (ARG)
                          </p>
                        </div>
                      </div>

                      {/* Rotating Plus Icon */}
                      <motion.div
                        animate={{ rotate: isExpanded ? 45 : 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="text-neutral-500 dark:text-neutral-400 flex-shrink-0 ml-4"
                      >
                        <Plus size={24} />
                      </motion.div>
                    </button>

                    {/* Expanded Details */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                          <div className="pb-6 pl-[4.5rem] space-y-4">
                            {ev.subtema && (
                              <p className="text-base leading-snug text-neutral-800 dark:text-white">
                                {ev.subtema}
                              </p>
                            )}

                            <div className="space-y-2 text-sm">
                              <div className="flex gap-3">
                                <span className="font-bold text-neutral-900 dark:text-white w-20">Fecha:</span>
                                <span className="text-neutral-600 dark:text-neutral-300">{formatDate(ev.startDate)}</span>
                              </div>
                              <div className="flex gap-3">
                                <span className="font-bold text-neutral-900 dark:text-white w-20">Hora:</span>
                                <span className="text-neutral-600 dark:text-neutral-300">{formatTime(ev.startDate)} (ARG)</span>
                              </div>
                            </div>

                            {/* Participants */}
                            {details.length > 0 && (
                              <div className="mt-4">
                                <h4 className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wide mb-3">
                                  Participantes
                                </h4>
                                <div className="grid gap-2 sm:grid-cols-2">
                                  {details.map((d, i) => {
                                    const Icon = d.icon;
                                    return (
                                      <div
                                        key={i}
                                        className="flex items-center gap-3 p-3 bg-neutral-200/80 dark:bg-neutral-800/50 rounded-xl"
                                      >
                                        <div className="w-9 h-9 bg-primary/20 rounded-lg flex items-center justify-center">
                                          <Icon size={16} className="text-primary" />
                                        </div>
                                        <div>
                                          <p className="text-xs text-neutral-500 dark:text-neutral-400">{d.label}</p>
                                          <p className="text-neutral-900 dark:text-white font-medium text-sm">{d.value}</p>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            )}

                            {/* Content */}
                            {ev.contenido && (
                              <div className="mt-4">
                                <h4 className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wide mb-2">
                                  Contenido
                                </h4>
                                <div className="bg-neutral-200/50 dark:bg-neutral-800/30 rounded-xl p-4 text-neutral-700 dark:text-neutral-300 whitespace-pre-wrap text-sm">
                                  {ev.contenido}
                                </div>
                              </div>
                            )}

                            {/* YouTube Link */}
                            {ev.youtubeLink && (
                              <div className="pt-2">
                                <a
                                  href={ev.youtubeLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-2.5 px-5 rounded-xl transition text-sm"
                                >
                                  <Play size={18} />
                                  Ver en YouTube
                                </a>
                              </div>
                            )}

                            {/* Add to Calendar Button */}
                            <button
                              className="w-10 h-10 bg-neutral-200 dark:bg-neutral-700 rounded-xl flex items-center justify-center transition-colors mt-4"
                              aria-label="Agregar al calendario"
                            >
                              <CalendarIcon size={20} className="text-neutral-600 dark:text-neutral-300" />
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
