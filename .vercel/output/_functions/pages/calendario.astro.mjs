import { c as createComponent, r as renderComponent, a as renderTemplate } from '../chunks/astro/server_BhUVXp0I.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_DD4i86gh.mjs';
import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Lenis from 'lenis';
import { E as EventDetails } from '../chunks/EventDetails_CrCJCJYq.mjs';
export { renderers } from '../renderers.mjs';

function getMonthDays(year, month) {
  const lastDay = new Date(year, month + 1, 0);
  const days = [];
  for (let d = 1; d <= lastDay.getDate(); d++) {
    days.push(new Date(year, month, d));
  }
  return days;
}
function sameDay(a, b) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}
const PrevIcon = () => /* @__PURE__ */ jsx(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    fill: "none",
    viewBox: "0 0 24 24",
    children: /* @__PURE__ */ jsx(
      "path",
      {
        stroke: "#fff",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: "2",
        d: "M17 12H7m0 0 4 4m-4-4 4-4"
      }
    )
  }
);
const NextIcon = () => /* @__PURE__ */ jsx(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    fill: "none",
    viewBox: "0 0 24 24",
    children: /* @__PURE__ */ jsx(
      "path",
      {
        stroke: "#fff",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: "2",
        d: "M7 12h10m0 0-4-4m4 4-4 4"
      }
    )
  }
);
function CustomCalendar() {
  const today = /* @__PURE__ */ new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalEvents, setModalEvents] = useState([]);
  useEffect(() => {
    setLoading(true);
    fetch(`/api/events?year=${currentYear}&month=${currentMonth}`).then((res) => res.json()).then((data) => setEvents(data)).finally(() => setLoading(false));
  }, [currentMonth, currentYear]);
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
    if (currentMonth === today.getMonth() && currentYear === today.getFullYear())
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
    "Diciembre"
  ];
  const isPrevDisabled = currentMonth === today.getMonth() && currentYear === today.getFullYear();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: "w-fit mx-auto rounded-xl p-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-4", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: handlePrevMonth,
            className: `p-2 rounded-full m-1 font-bold transition-all flex items-center justify-center ${isPrevDisabled ? "bg-neutral-700 text-neutral-400 cursor-not-allowed" : "bg-[#3b82f6] text-white hover:bg-[#2563eb]"}`,
            disabled: isPrevDisabled,
            "aria-label": "Mes anterior",
            children: /* @__PURE__ */ jsx(PrevIcon, {})
          }
        ),
        /* @__PURE__ */ jsxs("h2", { className: "mx-8 text-xl font-bold text-center text-white", children: [
          monthNames[currentMonth],
          " ",
          currentYear
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: handleNextMonth,
            className: "p-2 rounded-full m-1 font-bold bg-[#3b82f6] text-white hover:bg-[#2563eb] transition-all flex items-center justify-center",
            "aria-label": "Mes siguiente",
            children: /* @__PURE__ */ jsx(NextIcon, {})
          }
        )
      ] }),
      loading ? /* @__PURE__ */ jsx("div", { className: "flex justify-center items-center py-12", children: /* @__PURE__ */ jsxs("span", { className: "relative flex items-center justify-center h-6 w-6", children: [
        /* @__PURE__ */ jsx("span", { className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ jsx("span", { className: "animate-ping inline-flex h-4 w-4 rounded-full bg-[#3b82f6] opacity-60" }) }),
        /* @__PURE__ */ jsx("span", { className: "relative inline-flex rounded-full h-4 w-4 bg-[#3b82f6] animate-pulse" })
      ] }) }) : /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-7 gap-3 mb-3", children: weekDays.map((d) => /* @__PURE__ */ jsx("div", { className: "text-center font-bold h-8 flex items-center justify-center text-sm", children: d })) }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-7 gap-3 place-items-center", children: [
          blanks.map((_, i) => /* @__PURE__ */ jsx("div", { className: "h-8 w-8" }, "b" + i)),
          days.map((date) => {
            const key = date.toISOString().slice(0, 10);
            const hasEvent = !!eventsByDate[key];
            const isToday = sameDay(date, today);
            const isSelected = selectedDate && sameDay(date, selectedDate);
            return /* @__PURE__ */ jsx(
              "button",
              {
                className: `rounded-full size-8 p-6 flex flex-col items-center justify-center transition-all
                    ${isSelected ? "bg-primary text-white" : hasEvent ? "border border-gray-200 hover:text-primary hover:bg-white" : "hover:bg-neutral-700"}
                    ${isToday ? "text-primary" : ""}
                  `,
                onClick: () => {
                  const key2 = date.toISOString().slice(0, 10);
                  const dayEvents = eventsByDate[key2] || [];
                  if (dayEvents.length) setModalEvents(dayEvents);
                },
                children: /* @__PURE__ */ jsx("span", { className: "font-bold", children: date.getDate() })
              },
              key
            );
          })
        ] })
      ] })
    ] }),
    modalEvents.length > 0 && /* @__PURE__ */ jsx(
      EventDetails,
      {
        events: modalEvents,
        onClose: () => setModalEvents([])
      }
    )
  ] });
}

const CalendarPage = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
    });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => {
      lenis.destroy();
    };
  }, []);
  return /* @__PURE__ */ jsx(
    motion.section,
    {
      className: "py-16 mb-36",
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.8 },
      children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
        /* @__PURE__ */ jsx(
          motion.h1,
          {
            className: "text-3xl font-bold mb-6 text-center",
            initial: { opacity: 0, y: 30 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.6, delay: 0.2 },
            children: "Calendario de Eventos"
          }
        ),
        /* @__PURE__ */ jsx(
          motion.p,
          {
            className: "mb-10 text-center",
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.6, delay: 0.4 },
            children: "Visualiza todos nuestros eventos programados."
          }
        ),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 50 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.8, delay: 0.6 },
            children: /* @__PURE__ */ jsx(CustomCalendar, {})
          }
        )
      ] })
    }
  );
};

const prerender = false;
const $$Calendario = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "ICEP | Calendario de Eventos" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "CalendarPage", CalendarPage, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/santiagomercadocarbone/Documents/Develops/icepilar/icep-website/src/components/CalendarPage.tsx", "client:component-export": "default" })} ` })}`;
}, "/Users/santiagomercadocarbone/Documents/Develops/icepilar/icep-website/src/pages/calendario.astro", void 0);

const $$file = "/Users/santiagomercadocarbone/Documents/Develops/icepilar/icep-website/src/pages/calendario.astro";
const $$url = "/calendario";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Calendario,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
