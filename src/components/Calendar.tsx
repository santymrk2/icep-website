import { useState, useEffect } from "react";
import EventDetails from "./EventDetails";
import Card from "./Card.tsx";

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

const PrevIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M17 12H7m0 0 4 4m-4-4 4-4"
    />
  </svg>
);
const NextIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M7 12h10m0 0-4-4m4 4-4 4"
    />
  </svg>
);

export default function CustomCalendar() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [loading, setLoading] = useState(false);
  //const [modalEvent, setModalEvent] = useState(null);
  const [modalEvents, setModalEvents] = useState<any[]>([]);
  // Cargar eventos del mes actual al montar y cuando cambian mes/año
  useEffect(() => {
    setLoading(true);
    fetch(`/api/events?year=${currentYear}&month=${currentMonth}`)
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .finally(() => setLoading(false));
  }, [currentMonth, currentYear]);

  // Agrupar eventos por fecha (YYYY-MM-DD)
  const eventsByDate = {};
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

  return (
    <>
      <div className="w-fit mx-auto rounded-xl p-6">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={handlePrevMonth}
            className={`p-2 rounded-full m-1 font-bold transition-all flex items-center justify-center ${isPrevDisabled ? "bg-neutral-700 text-neutral-400 cursor-not-allowed" : "bg-[#3b82f6] text-white hover:bg-[#2563eb]"}`}
            disabled={isPrevDisabled}
            aria-label="Mes anterior"
          >
            <PrevIcon />
          </button>
          <h2 className="mx-8 text-xl font-bold text-center text-white">
            {monthNames[currentMonth]} {currentYear}
          </h2>
          <button
            onClick={handleNextMonth}
            className="p-2 rounded-full m-1 font-bold bg-[#3b82f6] text-white hover:bg-[#2563eb] transition-all flex items-center justify-center"
            aria-label="Mes siguiente"
          >
            <NextIcon />
          </button>
        </div>
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <span className="relative flex items-center justify-center h-6 w-6">
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="animate-ping inline-flex h-4 w-4 rounded-full bg-[#3b82f6] opacity-60"></span>
              </span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-[#3b82f6] animate-pulse"></span>
            </span>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-7 gap-3 mb-3">
              {weekDays.map((d) => (
                <div className="text-center font-bold h-8 flex items-center justify-center text-sm">
                  {d}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-3 place-items-center">
              {blanks.map((_, i) => (
                <div key={"b" + i} className="h-8 w-8"></div>
              ))}
              {days.map((date) => {
                const key = date.toISOString().slice(0, 10);
                const hasEvent = !!eventsByDate[key];
                const isToday = sameDay(date, today);
                const isSelected = selectedDate && sameDay(date, selectedDate);
                return (
                  <button
                    key={key}
                    className={`rounded-full size-8 p-6 flex flex-col items-center justify-center transition-all
                    ${isSelected ? "bg-primary text-white" : hasEvent ? "border border-gray-200 hover:text-primary hover:bg-white" : "hover:bg-neutral-700"}
                    ${isToday ? "text-primary" : ""}
                  `}
                    onClick={() => {
                      const key = date.toISOString().slice(0, 10);
                      const dayEvents = eventsByDate[key] || [];
                      if (dayEvents.length) setModalEvents(dayEvents);
                    }}
                  >
                    {/*
                    onClick={() => hasEvent ? setSelectedDate(date) : setSelectedDate(null)}
                  */}
                    <span className="font-bold">{date.getDate()}</span>
                  </button>
                );
              })}
            </div>

            {/*selectedDate && (
            <div className="mt-8 p-4">
              <h3 className="text-lg font-bold mb-2 text-white">Eventos:</h3>
              {eventsByDate[selectedDate.toISOString().slice(0, 10)]?.map(
                (event: any) => (
                  <div
                    key={event.id || event.startDate} // asegurate que cada evento tenga un id único o usa otra prop
                    className=" mb-4"
                  >
                    <Card
                      href={event.pageLink || "#"} // ajustá según los datos que tengas
                      title={event.type}
                      desc={event.description || ""} // suponiendo que el evento tiene descripción
                      touchDisabled={true}
                      onClick={() => setModalEvent(event)}
                    />
                  </div>
                ),
              )}
            </div>
          )*/}
          </>
        )}
      </div>

      {modalEvents.length > 0 && (
        <EventDetails
          events={modalEvents} // ← array con 1 o varios eventos
          onClose={() => setModalEvents([])}
        />
      )}
    </>
  );
}
