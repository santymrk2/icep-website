import { useState, useEffect, useMemo } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Clock,
} from "lucide-react";
import EventDetails from "./EventDetails";

function getMonthDays(year: number, month: number) {
  // month: 0-indexed
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

export default function CustomCalendar() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState<number>(today.getMonth());
  const [currentYear, setCurrentYear] = useState<number>(today.getFullYear());
  const [events, setEvents] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  //const [modalEvent, setModalEvent] = useState(null);
  const [modalEvents, setModalEvents] = useState<any[]>([]);
  const [isDesktop, setIsDesktop] = useState(false);
  const [desktopEvents, setDesktopEvents] = useState<any[]>([]);
  // Cargar eventos del mes actual al montar y cuando cambian mes/año
  useEffect(() => {
    setLoading(true);
    fetch(`/api/events?year=${currentYear}&month=${currentMonth}`)
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .finally(() => setLoading(false));
  }, [currentMonth, currentYear]);

  // Agrupar eventos por fecha (YYYY-MM-DD)
  const eventsByDate = useMemo(() => {
    const grouped: Record<string, any[]> = {};
    events.forEach((event) => {
      if (event.startDate) {
        const key = event.startDate.slice(0, 10);
        if (!grouped[key]) grouped[key] = [];
        grouped[key].push(event);
      }
    });
    return grouped;
  }, [events]);

  const monthEvents = useMemo(() => {
    return events
      .filter((event: any) => {
        if (!event.startDate) return false;
        const date = new Date(event.startDate);
        return (
          date.getFullYear() === currentYear && date.getMonth() === currentMonth
        );
      })
      .sort(
        (a: any, b: any) =>
          new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
      );
  }, [events, currentMonth, currentYear]);

  const days = getMonthDays(currentYear, currentMonth);
  const weekDays = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
  const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay();
  const blanks = Array(firstDayOfWeek).fill(null);

  function handlePrevMonth() {
    // Bloquear navegación hacia atrás si es el mes actual y año actual
    if (
      currentMonth === today.getMonth() &&
      currentYear === today.getFullYear()
    )
      return;
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
    setSelectedDate(null);
    setDesktopEvents([]);
  }
  function handleNextMonth() {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
    setSelectedDate(null);
    setDesktopEvents([]);
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

  // Determinar si el botón de mes anterior debe estar deshabilitado
  const isPrevDisabled =
    currentMonth === today.getMonth() && currentYear === today.getFullYear();

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mediaQuery.matches);
    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    if (
      selectedDate &&
      (selectedDate.getMonth() !== currentMonth ||
        selectedDate.getFullYear() !== currentYear)
    ) {
      setSelectedDate(null);
    }

    if (!monthEvents.length) {
      setDesktopEvents([]);
      return;
    }

    if (selectedDate) {
      const key = selectedDate.toISOString().slice(0, 10);
      const existing = eventsByDate[key];
      if (existing) {
        setDesktopEvents(existing);
        return;
      }
      setDesktopEvents([]);
      return;
    }

    const upcoming =
      monthEvents.find(
        (event: any) => new Date(event.startDate) >= today,
      ) || monthEvents[0];

    if (upcoming?.startDate) {
      const nextDate = new Date(upcoming.startDate);
      setSelectedDate(nextDate);
      setDesktopEvents(eventsByDate[upcoming.startDate.slice(0, 10)] || []);
    }
  }, [eventsByDate, monthEvents, isDesktop, selectedDate]);

  useEffect(() => {
    if (isDesktop && modalEvents.length > 0) {
      setModalEvents([]);
    }
  }, [isDesktop, modalEvents]);

  return (
    <>
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-5 sm:p-6 lg:p-10 shadow-lg">
          <div className="flex flex-col gap-10 lg:flex-row">
            <section className="flex-1">
              <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/40">
                    Calendario mensual
                  </p>
                  <h2 className="text-2xl font-semibold text-white sm:text-3xl">
                    {monthNames[currentMonth]} {currentYear}
                  </h2>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrevMonth}
                    className={`flex size-11 items-center justify-center rounded-full border border-white/10 transition ${
                      isPrevDisabled
                        ? "cursor-not-allowed bg-white/5 text-white/30"
                        : "bg-white text-slate-900 hover:-translate-y-0.5 hover:bg-white/90"
                    }`}
                    disabled={isPrevDisabled}
                    aria-label="Mes anterior"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={handleNextMonth}
                    className="flex size-11 items-center justify-center rounded-full border border-white/10 bg-white text-slate-900 transition hover:-translate-y-0.5 hover:bg-white/90"
                    aria-label="Mes siguiente"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </header>

              {loading ? (
                <div className="flex h-40 items-center justify-center">
                  <span className="relative flex size-8 items-center justify-center">
                    <span className="absolute inline-flex size-6 animate-ping rounded-full bg-blue-500/60"></span>
                    <span className="relative inline-flex size-6 animate-spin rounded-full border-2 border-white/20 border-t-white" />
                  </span>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-7 gap-2 text-center text-xs font-semibold uppercase tracking-wide text-white/50 sm:text-sm">
                    {weekDays.map((day) => (
                      <div
                        key={day}
                        className="flex h-10 items-center justify-center"
                      >
                        {day}
                      </div>
                    ))}
                  </div>

                  <div
                    className="grid grid-cols-7 gap-2 sm:gap-3 lg:gap-4"
                    role="grid"
                    aria-label="Calendario mensual"
                  >
                    {blanks.map((_, index) => (
                      <div key={`blank-${index}`} className="h-12 w-full" />
                    ))}

                    {days.map((date) => {
                      const key = date.toISOString().slice(0, 10);
                      const hasEvent = !!eventsByDate[key];
                      const isToday = sameDay(date, today);
                      const isSelected =
                        selectedDate && sameDay(date, selectedDate);
                      const formattedLabel = new Intl.DateTimeFormat("es-AR", {
                        dateStyle: "full",
                      }).format(date);

                      return (
                        <button
                          key={key}
                          type="button"
                          className={`relative flex h-12 w-full items-center justify-center rounded-xl border border-transparent text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/80 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 lg:h-14 ${isSelected ? "border-blue-400/40 bg-blue-500/20 text-white" : "hover:border-white/20 hover:bg-white/5"} ${
                            isToday && !isSelected ? "text-blue-300" : ""
                          }`}
                          aria-label={`${formattedLabel}${
                            hasEvent ? ", tiene reuniones" : ""
                          }`}
                          aria-pressed={Boolean(isSelected)}
                          aria-current={isToday ? "date" : undefined}
                          onClick={() => {
                            const dayEvents = eventsByDate[key] || [];
                            setSelectedDate(date);
                            setDesktopEvents(dayEvents);

                            if (isDesktop) {
                              setModalEvents([]);
                            } else {
                              setModalEvents(dayEvents.length ? dayEvents : []);
                            }
                          }}
                        >
                          <span>{date.getDate()}</span>
                          {hasEvent && (
                            <span
                              className={`absolute bottom-2 h-1.5 w-1.5 rounded-full ${
                                isSelected ? "bg-white" : "bg-blue-400"
                              }`}
                            />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  <p className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] px-4 py-3 text-xs text-white/60 sm:text-sm">
                    Seleccioná un día para ver los detalles. Los puntos azules
                    marcan las actividades programadas.
                  </p>
                </div>
              )}
            </section>

            <aside className="hidden w-full max-w-sm shrink-0 flex-col gap-5 rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-inner lg:flex">
              <header>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/40">
                  Detalle del día
                </p>
                {selectedDate ? (
                  <h3 className="mt-2 text-2xl font-semibold text-white">
                    {selectedDate.toLocaleDateString("es-AR", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                    })}
                  </h3>
                ) : (
                  <h3 className="mt-2 text-2xl font-semibold text-white">
                    Seleccioná una fecha
                  </h3>
                )}
              </header>

              <div className="flex-1 space-y-4 overflow-y-auto pr-1">
                {desktopEvents.length > 0 ? (
                  desktopEvents.map((event) => {
                    const eventDate = event.startDate
                      ? new Date(event.startDate)
                      : null;
                    const timeLabel = eventDate
                      ? eventDate.toLocaleTimeString("es-AR", {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: false,
                        })
                      : null;
                    const details = [
                      { label: "Enseñanza", value: event.enseñanza },
                      { label: "Presidencia", value: event.presidencia },
                      { label: "Alabanza", value: event.alabanza },
                      { label: "Predicación", value: event.predicacion },
                      {
                        label: "Participación musical",
                        value: event.participacionMusical,
                      },
                    ].filter((item) => item.value);

                    return (
                      <div
                        key={event.id || event.startDate}
                        className="rounded-2xl border border-white/10 bg-white/[0.06] p-5 shadow-sm space-y-4"
                      >
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                          <div className="space-y-1">
                            <h4 className="text-lg font-semibold text-white break-words">
                              {event.type || "Actividad"}
                            </h4>
                            {event.subtema && (
                              <p className="text-sm text-white/70 break-words">
                                {event.subtema}
                              </p>
                            )}
                          </div>
                          <ul className="flex flex-col items-start gap-1 text-xs font-medium text-white/70 sm:items-end">
                            {eventDate && (
                              <li className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-white">
                                <Clock className="h-3.5 w-3.5" />
                                <span className="font-semibold">
                                  {timeLabel} hs
                                </span>
                              </li>
                            )}
                            <li className="inline-flex items-center gap-2">
                              <CalendarIcon className="h-4 w-4" />
                              <span>
                                {eventDate
                                  ? eventDate.toLocaleDateString("es-AR", {
                                      day: "numeric",
                                      month: "short",
                                    })
                                  : "A confirmar"}
                              </span>
                            </li>
                          </ul>
                        </div>

                        {details.length > 0 && (
                          <dl className="space-y-3 text-sm text-white/80">
                            {details.map((detail) => (
                              <div
                                key={`${event.id || event.startDate}-${detail.label}`}
                                className="flex items-center justify-between gap-3 border-b border-white/5 pb-2 last:border-b-0 last:pb-0"
                              >
                                <dt className="text-white/60">{detail.label}</dt>
                                <dd className="font-semibold text-white break-words text-right">
                                  {detail.value}
                                </dd>
                              </div>
                            ))}
                          </dl>
                        )}

                        {event.contenido && (
                          <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
                            <p className="font-semibold text-white">
                              Contenido
                            </p>
                            <p className="mt-2 whitespace-pre-wrap break-words text-white/80">
                              {event.contenido}
                            </p>
                          </div>
                        )}

                        {event.youtubeLink && (
                          <a
                            href={event.youtubeLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-500"
                          >
                            Ver mensaje en YouTube
                          </a>
                        )}
                      </div>
                    );
                  })
                ) : selectedDate ? (
                  <div className="rounded-2xl border border-dashed border-white/15 bg-white/[0.02] p-6 text-center">
                    <p className="text-sm font-semibold text-white">
                      Sin actividades programadas
                    </p>
                    <p className="mt-2 text-sm text-white/60">
                      Podés revisar otras fechas del mes o consultarnos para
                      conocer nuevos encuentros.
                    </p>
                  </div>
                ) : (
                  <div className="rounded-2xl border border-dashed border-white/15 bg-white/[0.02] p-6 text-center">
                    <p className="text-sm font-semibold text-white">
                      Explorá las reuniones del mes
                    </p>
                    <p className="mt-2 text-sm text-white/60">
                      En desktop podés navegar el calendario y ver aquí mismo
                      los detalles de cada día.
                    </p>
                  </div>
                )}
              </div>

              {monthEvents.length > 0 && (
                <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/40">
                    Próximas actividades
                  </p>
                  <ul className="mt-3 space-y-3">
                    {monthEvents.slice(0, 3).map((event) => {
                      const eventDate = event.startDate
                        ? new Date(event.startDate)
                        : null;
                      const timeLabel = eventDate
                        ? eventDate.toLocaleTimeString("es-AR", {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: false,
                          })
                        : null;
                      return (
                        <li
                          key={`upcoming-${event.id || event.startDate}`}
                          className="flex flex-col gap-1 rounded-xl border border-white/5 bg-white/5 p-3 text-sm text-white/80"
                        >
                          <span className="font-semibold text-white break-words">
                            {event.type || "Actividad"}
                          </span>
                          <div className="flex flex-wrap items-center gap-2 text-xs text-white/60">
                            {eventDate ? (
                              <>
                                <span>
                                  {eventDate.toLocaleDateString("es-AR", {
                                    day: "numeric",
                                    month: "short",
                                  })}
                                </span>
                                {timeLabel && (
                                  <span className="inline-flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    {timeLabel} hs
                                  </span>
                                )}
                              </>
                            ) : (
                              <span>A confirmar</span>
                            )}
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </aside>
          </div>
        </div>
      </div>

      {monthEvents.length > 0 && (
        <div className="mx-auto mt-6 w-full max-w-6xl px-4 sm:px-6 lg:hidden">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-lg">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/40">
              Próximas actividades
            </p>
            <ul className="mt-4 space-y-4">
              {monthEvents.slice(0, 3).map((event) => {
                const eventDate = event.startDate
                  ? new Date(event.startDate)
                  : null;
                const timeLabel = eventDate
                  ? eventDate.toLocaleTimeString("es-AR", {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                    })
                  : null;
                return (
                  <li
                    key={`mobile-upcoming-${event.id || event.startDate}`}
                    className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 space-y-3"
                  >
                    <div className="flex flex-col gap-2">
                      <div className="space-y-1">
                        <h4 className="text-base font-semibold text-white break-words">
                          {event.type || "Actividad"}
                        </h4>
                        {event.subtema && (
                          <p className="text-sm text-white/70 break-words">
                            {event.subtema}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-white/60">
                        {eventDate ? (
                          <>
                            <span>
                              {eventDate.toLocaleDateString("es-AR", {
                                day: "numeric",
                                month: "short",
                              })}
                            </span>
                            {timeLabel && (
                              <span className="inline-flex items-center gap-1">
                                <Clock className="h-3.5 w-3.5" />
                                {timeLabel} hs
                              </span>
                            )}
                          </>
                        ) : (
                          <span>A confirmar</span>
                        )}
                      </div>
                    </div>
                    {event.contenido && (
                      <p className="text-sm text-white/65 line-clamp-3">
                        {event.contenido}
                      </p>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}

      {modalEvents.length > 0 && (
        <EventDetails
          events={modalEvents}
          onClose={() => setModalEvents([])}
        />
      )}
    </>
  );
}
