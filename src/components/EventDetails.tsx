// components/EventDetails.tsx
import { motion, AnimatePresence } from "framer-motion";
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

interface EventDetailsProps {
  events: any[];
  onClose: () => void;
}

export default function EventDetails({ events, onClose }: EventDetailsProps) {
  if (!events.length) return null;

  const renderOne = (ev: any) => {
    const details = [
      { icon: BookOpen, label: "Enseñanza", value: ev.enseñanza },
      { icon: User, label: "Presidencia", value: ev.presidencia },
      { icon: Music, label: "Alabanza", value: ev.alabanza },
      { icon: Mic, label: "Predicación", value: ev.predicacion },
      {
        icon: Music,
        label: "Participación Musical",
        value: ev.participacionMusical,
      },
    ].filter((d) => d.value);

    const hasBodyContent =
      Boolean(ev.subtema) ||
      details.length > 0 ||
      Boolean(ev.contenido) ||
      Boolean(ev.youtubeLink);

    return (
      <div className="w-full max-w-3xl rounded-2xl border border-white/10 bg-neutral-900 shadow-2xl md:max-w-4xl max-h-[85vh] overflow-y-auto">
        <div className={`p-6 ${hasBodyContent ? "border-b border-white/10" : ""}`}>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm font-medium text-white/80">
            <Calendar size={16} />
            Evento
          </div>
          <h2 className="text-2xl font-bold text-white md:text-3xl">
            {ev.type || "REUNIÓN"}
          </h2>
          {ev.startDate && (
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-white/80">
              <div className="flex items-center gap-2">
                <Calendar size={18} />
                <span>
                  {new Date(ev.startDate).toLocaleDateString("es-AR", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={18} />
                <span>
                  {new Date(ev.startDate).toLocaleTimeString("es-AR", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  })}{" "}
                  hs
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6 p-6">
          {ev.subtema && (
            <div className="rounded-xl border border-blue-500/30 bg-blue-500/10 p-5">
              <h3 className="text-base font-semibold text-white">
                {ev.subtema}
              </h3>
            </div>
          )}

          {details.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50">
                Participantes
              </h4>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                {details.map((d, i) => {
                  const Icon = d.icon;
                  return (
                    <div
                      key={i}
                      className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3"
                    >
                      <div className="flex size-10 items-center justify-center rounded-lg bg-white/10">
                        <Icon size={18} className="text-white" />
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-wide text-white/50">
                          {d.label}
                        </p>
                        <p className="text-sm font-semibold text-white">
                          {d.value}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {ev.contenido && (
            <div className="rounded-xl border border-white/10 bg-white/5 p-5">
              <h4 className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50">
                Contenido
              </h4>
              <p className="mt-3 whitespace-pre-wrap text-sm text-white/75">
                {ev.contenido}
              </p>
            </div>
          )}

          {ev.youtubeLink && (
            <div className="flex">
              <a
                href={ev.youtubeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-500"
              >
                <Play size={18} />
                Ver mensaje en YouTube
              </a>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <AnimatePresence>
      {/* FONDO único con blur */}
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-md z-40"
        onClick={onClose}
      />

      {/* CONTENEDOR de modales apilados */}
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 overflow-y-auto p-4 pointer-events-none">
        {events.map((ev, idx) => (
          <motion.div
            key={ev.id || idx}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.3, delay: idx * 0.1 }}
            className="pointer-events-auto relative"
          >
            <button
              onClick={onClose}
              className="absolute -top-3 -right-3 flex size-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
              aria-label="Cerrar"
            >
              <X size={18} />
            </button>
            {renderOne(ev)}
          </motion.div>
        ))}
      </div>
    </AnimatePresence>
  );
}
