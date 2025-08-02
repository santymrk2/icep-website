import { jsxs, jsx } from 'react/jsx-runtime';
import { AnimatePresence, motion } from 'framer-motion';
import { X, BookOpen, User, Music, Mic, Calendar, Clock, Play } from 'lucide-react';

function EventDetails({ events, onClose }) {
  if (!events.length) return null;
  const renderOne = (ev) => {
    const details = [
      { icon: BookOpen, label: "Enseñanza", value: ev.enseñanza },
      { icon: User, label: "Presidencia", value: ev.presidencia },
      { icon: Music, label: "Alabanza", value: ev.alabanza },
      { icon: Mic, label: "Predicación", value: ev.predicacion },
      {
        icon: Music,
        label: "Participación Musical",
        value: ev.participacionMusical
      }
    ].filter((d) => d.value);
    return /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-xl max-w-5xl w-full max-h-[80vh] overflow-y-auto shadow-2xl", children: [
      /* @__PURE__ */ jsxs("div", { className: "relative p-6", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-white/10 backdrop-blur-sm rounded-t-xl" }),
        /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
          /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-sm font-medium mb-4", children: [
            /* @__PURE__ */ jsx(Calendar, { size: 16 }),
            "Evento"
          ] }),
          /* @__PURE__ */ jsx("h2", { className: "text-2xl md:text-3xl font-bold mb-3", children: ev.type || "REUNIÓN" }),
          ev.startDate && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 text-white/90 flex-wrap", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(Calendar, { size: 18 }),
              /* @__PURE__ */ jsx("span", { children: new Date(ev.startDate).toLocaleDateString("es-AR", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric"
              }) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(Clock, { size: 18 }),
              /* @__PURE__ */ jsxs("span", { children: [
                new Date(ev.startDate).toLocaleTimeString("es-AR", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false
                }),
                " ",
                "hs"
              ] })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
        ev.subtema && /* @__PURE__ */ jsx("div", { className: "bg-blue-500/10 border-l-4 border-blue-500 p-4 rounded-r-lg mb-6", children: /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold", children: ev.subtema }) }),
        details.length > 0 && /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
          /* @__PURE__ */ jsx("h4", { className: "text-sm font-semibold text-gray-400 uppercase tracking-wide mb-4", children: "Participantes" }),
          /* @__PURE__ */ jsx("div", { className: "grid gap-3 md:grid-cols-2", children: details.map((d, i) => {
            const Icon = d.icon;
            return /* @__PURE__ */ jsxs(
              "div",
              {
                className: "flex items-center gap-3 p-3 bg-neutral-800/50 rounded-xl",
                children: [
                  /* @__PURE__ */ jsx("div", { className: "w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center", children: /* @__PURE__ */ jsx(Icon, { size: 18, className: "text-blue-500" }) }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400", children: d.label }),
                    /* @__PURE__ */ jsx("p", { className: "text-white font-medium", children: d.value })
                  ] })
                ]
              },
              i
            );
          }) })
        ] }),
        ev.contenido && /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
          /* @__PURE__ */ jsx("h4", { className: "text-sm font-semibold text-gray-400 uppercase tracking-wide mb-4", children: "Contenido" }),
          /* @__PURE__ */ jsx("div", { className: "bg-neutral-800/30 rounded-xl p-4 text-gray-300 whitespace-pre-wrap", children: ev.contenido })
        ] }),
        ev.youtubeLink && /* @__PURE__ */ jsx("div", { className: "pt-4", children: /* @__PURE__ */ jsxs(
          "a",
          {
            href: ev.youtubeLink,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "inline-flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-xl transition",
            children: [
              /* @__PURE__ */ jsx(Play, { size: 20 }),
              "Ver mensaje en YouTube"
            ]
          }
        ) })
      ] })
    ] });
  };
  return /* @__PURE__ */ jsxs(AnimatePresence, { children: [
    /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.3 },
        className: "fixed inset-0 bg-black/60 backdrop-blur-md z-40",
        onClick: onClose
      },
      "backdrop"
    ),
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: onClose,
        className: "fixed top-4 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full\n                   bg-white/20 hover:bg-white/30 text-white flex items-center\n                   justify-center z-[9999] transition-transform hover:scale-110",
        "aria-label": "Cerrar todos",
        children: /* @__PURE__ */ jsx(X, { size: 20 })
      },
      "close-btn"
    ),
    /* @__PURE__ */ jsx("div", { className: "fixed inset-0 flex flex-col items-center justify-center gap-6 z-50 p-4 pointer-events-none", children: events.map((ev, idx) => /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 40 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -40 },
        transition: { duration: 0.3, delay: idx * 0.1 },
        className: "pointer-events-auto",
        children: renderOne(ev)
      },
      ev.id || idx
    )) })
  ] });
}

export { EventDetails as E };
