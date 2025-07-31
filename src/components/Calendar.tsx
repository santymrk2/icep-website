import { useState, useEffect } from "react";
import {
  X,
  Calendar,
  Clock,
  User,
  Music,
  BookOpen,
  Mic,
  Play,
} from "lucide-react";

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

// Modal Component Mejorado
const ImprovedModal = ({ modalEvent, setModalEvent }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (modalEvent) {
      setIsVisible(true);
    }
  }, [modalEvent]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => setModalEvent(null), 300);
  };

  if (!modalEvent) return null;

  const eventDetails = [
    { icon: BookOpen, label: "Enseñanza", value: modalEvent.enseñanza },
    { icon: User, label: "Presidencia", value: modalEvent.presidencia },
    { icon: Music, label: "Alabanza", value: modalEvent.alabanza },
    { icon: Mic, label: "Predicación", value: modalEvent.predicacion },
    {
      icon: Music,
      label: "Participación Musical",
      value: modalEvent.participacionMusical,
    },
  ].filter((item) => item.value);

  return (
    <div
      className={`fixed inset-0 bg-black/70 backdrop-blur-md flex justify-center items-center z-50 px-4 transition-all duration-300 ease-out ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleClose}
    >
      <div
        className={`bg-gradient-to-br from-neutral-900 to-neutral-900 p-0 rounded-lg max-w-2xl w-full text-white relative transform transition-all duration-300 ease-out ${
          isVisible ? "scale-100 translate-y-0" : "scale-95 translate-y-4"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header con gradiente */}
        <div className=" rounded-t-lg p-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
          <div className="relative z-10">
            <button
              onClick={handleClose}
              className="absolute top-0 right-0 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm inline-flex items-center justify-center text-white transition-all duration-200 hover:scale-110"
              aria-label="Cerrar"
            >
              <X size={20} />
            </button>

            <div className="pr-12">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium mb-4">
                <Calendar size={16} />
                Evento
              </div>

              <h2 className="text-2xl md:text-3xl font-bold mb-3 leading-tight">
                {modalEvent.type || "REUNIÓN"}
              </h2>

              {modalEvent.startDate && (
                <div className="flex items-center gap-4 text-white/90 flex-wrap">
                  <div className="flex items-center gap-2">
                    <Calendar size={18} />
                    <span className="font-medium">
                      {new Date(modalEvent.startDate).toLocaleDateString(
                        "es-AR",
                        {
                          weekday: "long",
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        },
                      )}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={18} />
                    <span className="font-medium">
                      {new Date(modalEvent.startDate).toLocaleTimeString(
                        "es-AR",
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: false,
                        },
                      )}{" "}
                      hs
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Contenido principal */}
        <div className="p-6 max-h-96 overflow-y-auto">
          {/* Subtema destacado */}
          {modalEvent.subtema && (
            <div className="bg-gradient-to-r from-blue-500/10 to-blue-500/10 border-l-4 border-blue-500 p-4 rounded-r-lg mb-6">
              <h3 className="text-lg font-semibold text-white leading-relaxed">
                {modalEvent.subtema}
              </h3>
            </div>
          )}

          {/* Detalles con íconos */}
          {eventDetails.length > 0 && (
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-4">
                Participantes
              </h4>
              <div className="grid gap-3">
                {eventDetails.map((detail, index) => {
                  const IconComponent = detail.icon;
                  return (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-neutral-800/50 rounded-xl hover:bg-neutral-800/70 transition-colors"
                    >
                      <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <IconComponent size={18} className="text-blue-500" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm text-gray-400 font-medium">
                          {detail.label}
                        </p>
                        <p className="text-white font-medium truncate">
                          {detail.value}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Contenido */}
          {modalEvent.contenido && (
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-4">
                Contenido
              </h4>
              <div className="bg-neutral-800/30 rounded-xl p-4 text-gray-300 leading-relaxed whitespace-pre-wrap">
                {modalEvent.contenido}
              </div>
            </div>
          )}
        </div>

        {/* Footer con acciones */}
        {modalEvent.youtubeLink && (
          <div className="border-t border-neutral-700 p-6">
            <a
              href={modalEvent.youtubeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 hover:shadow-lg hover:scale-105"
            >
              <Play size={20} />
              Ver mensaje en YouTube
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default function CustomCalendar() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalEvent, setModalEvent] = useState(null);

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
                  onClick={() =>
                    hasEvent ? setSelectedDate(date) : setSelectedDate(null)
                  }
                >
                  <span className="font-bold">{date.getDate()}</span>
                </button>
              );
            })}
          </div>
          {selectedDate && (
            <div className="mt-8 p-4">
              <h3 className="text-lg font-bold mb-2 text-white">Eventos:</h3>
              {eventsByDate[selectedDate.toISOString().slice(0, 10)]?.map(
                (event) => (
                  <div
                    onClick={() => setModalEvent(event)}
                    className="cursor-pointer mb-4 p-4 bg-gradient-to-b from-neutral-800 to-neutral-800/50 rounded-lg"
                  >
                    <h4 className="text-md font-bold text-white">
                      {event.type}
                    </h4>
                    <p className="text-gray-300">{event.date}</p>
                    {event.youtubeLink && (
                      <p className="text-gray-300 block mb-2 underline">
                        Ver mensaje en YouTube
                      </p>
                    )}
                  </div>
                ),
              )}
            </div>
          )}
        </>
      )}

      <ImprovedModal modalEvent={modalEvent} setModalEvent={setModalEvent} />
    </div>
  );
}
