import { a as createComponent, d as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_JmoDyaQI.mjs';
import { $ as $$Layout } from '../chunks/Layout_CZi0mQfs.mjs';
import { useState, useEffect } from 'preact/hooks';
import { jsxs, jsx, Fragment } from 'preact/jsx-runtime';
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
const PrevIcon = () => jsx("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  fill: "none",
  viewBox: "0 0 24 24",
  children: jsx("path", {
    stroke: "#fff",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: "2",
    d: "M17 12H7m0 0 4 4m-4-4 4-4"
  })
});
const NextIcon = () => jsx("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  fill: "none",
  viewBox: "0 0 24 24",
  children: jsx("path", {
    stroke: "#fff",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: "2",
    d: "M7 12h10m0 0-4-4m4 4-4 4"
  })
});
function CustomCalendar() {
  const today = /* @__PURE__ */ new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [loading, setLoading] = useState(false);
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
  const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  const isPrevDisabled = currentMonth === today.getMonth() && currentYear === today.getFullYear();
  return jsxs("div", {
    class: "w-full max-w-2xl mx-auto bg-zinc-800 rounded-xl shadow-lg p-6",
    children: [jsxs("div", {
      class: "flex justify-between items-center mb-4",
      children: [jsx("button", {
        onClick: handlePrevMonth,
        class: `px-2 py-1 rounded font-bold transition-all flex items-center justify-center ${isPrevDisabled ? "bg-zinc-700 text-zinc-400 cursor-not-allowed" : "bg-[#3b82f6] text-white hover:bg-[#2563eb]"}`,
        disabled: isPrevDisabled,
        "aria-label": "Mes anterior",
        children: jsx(PrevIcon, {})
      }), jsxs("h2", {
        class: "text-xl font-bold text-center text-white",
        children: [monthNames[currentMonth], " ", currentYear]
      }), jsx("button", {
        onClick: handleNextMonth,
        class: "px-2 py-1 rounded font-bold bg-[#3b82f6] text-white hover:bg-[#2563eb] transition-all flex items-center justify-center",
        "aria-label": "Mes siguiente",
        children: jsx(NextIcon, {})
      })]
    }), loading ? jsx("div", {
      class: "flex justify-center items-center py-12",
      children: jsxs("span", {
        class: "relative flex items-center justify-center h-6 w-6",
        children: [jsx("span", {
          class: "absolute inset-0 flex items-center justify-center",
          children: jsx("span", {
            class: "animate-ping inline-flex h-4 w-4 rounded-full bg-[#3b82f6] opacity-60"
          })
        }), jsx("span", {
          class: "relative inline-flex rounded-full h-4 w-4 bg-[#3b82f6] animate-pulse"
        })]
      })
    }) : jsxs(Fragment, {
      children: [jsx("div", {
        class: "grid grid-cols-7 gap-1 mb-2",
        children: weekDays.map((d) => jsx("div", {
          class: "text-center text-gray-400 font-bold",
          children: d
        }))
      }), jsxs("div", {
        class: "grid grid-cols-7 gap-1",
        children: [blanks.map((_, i) => jsx("div", {}, "b" + i)), days.map((date) => {
          const key = date.toISOString().slice(0, 10);
          const hasEvent = !!eventsByDate[key];
          const isToday = sameDay(date, today);
          const isSelected = selectedDate && sameDay(date, selectedDate);
          return jsxs("button", {
            class: `rounded-lg h-12 w-full flex flex-col items-center justify-center border transition-all
                    ${isSelected ? "bg-[#3b82f6] text-white border-[#3b82f6]" : hasEvent ? "bg-blue-100/10 text-[#3b82f6] border-[#3b82f6] hover:bg-[#3b82f6] hover:text-white" : "bg-zinc-900 text-gray-200 border-zinc-700 hover:bg-zinc-700"}
                    ${isToday ? "ring-2 ring-blue-400" : ""}
                  `,
            onClick: () => hasEvent ? setSelectedDate(date) : setSelectedDate(null),
            children: [jsx("span", {
              class: "font-bold",
              children: date.getDate()
            }), hasEvent && jsx("span", {
              class: "w-2 h-2 mt-1 rounded-full bg-[#3b82f6]"
            })]
          }, key);
        })]
      }), selectedDate && jsxs("div", {
        class: "mt-8 bg-zinc-900 rounded-lg p-4",
        children: [jsxs("h3", {
          class: "text-lg font-bold mb-2 text-white",
          children: ["Eventos para el ", selectedDate.toLocaleDateString("es-AR")]
        }), eventsByDate[selectedDate.toISOString().slice(0, 10)]?.map((event) => jsxs("div", {
          class: "mb-4 p-4 bg-zinc-800 rounded-lg border border-zinc-700",
          children: [jsx("h4", {
            class: "text-md font-bold text-primary",
            children: event.type
          }), jsx("p", {
            class: "text-gray-300",
            children: event.date
          }), event.youtubeLink && jsx("a", {
            href: event.youtubeLink,
            target: "_blank",
            class: "text-primary block mb-2",
            children: "Ver mensaje en YouTube"
          }), event.pageLink && jsx("a", {
            href: event.pageLink,
            target: "_blank",
            class: "text-primary block text-left",
            children: "Ver detalles"
          })]
        }, event.id))]
      })]
    })]
  });
}

const prerender = false;
const $$Calendario = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "ICEP | Calendario de Eventos" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="py-16"> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> <h1 class="text-3xl font-bold mb-6 text-center">Calendario de Eventos</h1> <p class="text-gray-400 mb-10 text-center">Visualiza todos nuestros eventos programados.</p> ${renderComponent($$result2, "Calendar", CustomCalendar, { "client:visible": true, "client:component-hydration": "visible", "client:component-path": "/Users/santiagomercadocarbone/Documents/Develops/icepilar/icep-website/src/components/Calendar.tsx", "client:component-export": "default" })} </div> </section> ` })}`;
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
