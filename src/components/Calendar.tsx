import { useState, useEffect } from "preact/hooks";

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
  return a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();
}

const PrevIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
    <path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 12H7m0 0 4 4m-4-4 4-4" />
  </svg>
);
const NextIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
    <path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12h10m0 0-4-4m4 4-4 4" />
  </svg>
);

export default function CustomCalendar() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [events, setEvents] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [loading, setLoading] = useState(false);

  // Cargar eventos del mes actual al montar y cuando cambian mes/año
  useEffect(() => {
    setLoading(true);
    fetch(`/api/events?year=${currentYear}&month=${currentMonth}`)
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .finally(() => setLoading(false));
  }, [currentMonth, currentYear]);

  // Agrupar eventos por fecha (YYYY-MM-DD)
  const eventsByDate: Record<string, any[]> = {};
  events.forEach((event) => {
    if (event.startDate) {
      const key = event.startDate.slice(0, 10);
      if (!eventsByDate[key]) eventsByDate[key] = [];
      eventsByDate[key].push(event);
    }
  });

  const days = getMonthDays(currentYear, currentMonth);
  const weekDays = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
  const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay();
  const blanks = Array(firstDayOfWeek).fill(null);

  function handlePrevMonth() {
    // Bloquear navegación hacia atrás si es el mes actual y año actual
    if (currentMonth === today.getMonth() && currentYear === today.getFullYear()) return;
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
    setSelectedDate(null);
  }
  function handleNextMonth() {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
    setSelectedDate(null);
  }

  const monthNames = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  // Determinar si el botón de mes anterior debe estar deshabilitado
  const isPrevDisabled = currentMonth === today.getMonth() && currentYear === today.getFullYear();

  return (
    <div class="w-full max-w-2xl mx-auto bg-zinc-800 rounded-xl shadow-lg p-6">
      <div class="flex justify-between items-center mb-4">
        <button
          onClick={handlePrevMonth}
          class={`px-2 py-1 rounded font-bold transition-all flex items-center justify-center ${isPrevDisabled ? 'bg-zinc-700 text-zinc-400 cursor-not-allowed' : 'bg-[#3b82f6] text-white hover:bg-[#2563eb]'}`}
          disabled={isPrevDisabled}
          aria-label="Mes anterior"
        >
          <PrevIcon />
        </button>
        <h2 class="text-xl font-bold text-center text-white">
          {monthNames[currentMonth]} {currentYear}
        </h2>
        <button
          onClick={handleNextMonth}
          class="px-2 py-1 rounded font-bold bg-[#3b82f6] text-white hover:bg-[#2563eb] transition-all flex items-center justify-center"
          aria-label="Mes siguiente"
        >
          <NextIcon />
        </button>
      </div>
      {loading ? (
        <div class="flex justify-center items-center py-12">
          <span class="relative flex items-center justify-center h-6 w-6">
            <span class="absolute inset-0 flex items-center justify-center">
              <span class="animate-ping inline-flex h-4 w-4 rounded-full bg-[#3b82f6] opacity-60"></span>
            </span>
            <span class="relative inline-flex rounded-full h-4 w-4 bg-[#3b82f6] animate-pulse"></span>
          </span>
        </div>
      ) : (
        <>
          <div class="grid grid-cols-7 gap-1 mb-2">
            {weekDays.map((d) => (
              <div class="text-center text-gray-400 font-bold">{d}</div>
            ))}
          </div>
          <div class="grid grid-cols-7 gap-1">
            {blanks.map((_, i) => (
              <div key={"b" + i}></div>
            ))}
            {days.map((date) => {
              const key = date.toISOString().slice(0, 10);
              const hasEvent = !!eventsByDate[key];
              const isToday = sameDay(date, today);
              const isSelected = selectedDate && sameDay(date, selectedDate);
              return (
                <button
                  key={key}
                  class={`rounded-lg h-12 w-full flex flex-col items-center justify-center border transition-all
                    ${isSelected ? "bg-[#3b82f6] text-white border-[#3b82f6]" : hasEvent ? "bg-blue-100/10 text-[#3b82f6] border-[#3b82f6] hover:bg-[#3b82f6] hover:text-white" : "bg-zinc-900 text-gray-200 border-zinc-700 hover:bg-zinc-700"}
                    ${isToday ? "ring-2 ring-blue-400" : ""}
                  `}
                  onClick={() => hasEvent ? setSelectedDate(date) : setSelectedDate(null)}
                >
                  <span class="font-bold">{date.getDate()}</span>
                  {hasEvent && <span class="w-2 h-2 mt-1 rounded-full bg-[#3b82f6]"></span>}
                </button>
              );
            })}
          </div>
          {selectedDate && (
            <div class="mt-8 bg-zinc-900 rounded-lg p-4">
              <h3 class="text-lg font-bold mb-2 text-white">Eventos para el {selectedDate.toLocaleDateString("es-AR")}</h3>
              {eventsByDate[selectedDate.toISOString().slice(0, 10)]?.map((event) => (
                <div key={event.id} class="mb-4 p-4 bg-zinc-800 rounded-lg border border-zinc-700">
                  <h4 class="text-md font-bold text-primary">{event.type}</h4>
                  <p class="text-gray-300">{event.date}</p>
                  {event.youtubeLink && (
                    <a href={event.youtubeLink} target="_blank" class="text-primary block mb-2">Ver mensaje en YouTube</a>
                  )}
                  {event.pageLink && (
                    <a href={event.pageLink} target="_blank" class="text-primary block text-left">Ver detalles</a>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
} 