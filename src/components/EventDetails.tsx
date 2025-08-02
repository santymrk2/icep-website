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

    return (
      <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-xl max-w-5xl w-full max-h-[80vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="relative p-6">
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-t-xl" />
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-sm font-medium mb-4">
              <Calendar size={16} />
              Evento
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              {ev.type || "REUNIÓN"}
            </h2>
            {ev.startDate && (
              <div className="flex items-center gap-4 text-white/90 flex-wrap">
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
        </div>

        {/* Body */}
        <div className="p-6">
          {ev.subtema && (
            <div className="bg-blue-500/10 border-l-4 border-blue-500 p-4 rounded-r-lg mb-6">
              <h3 className="text-lg font-semibold">{ev.subtema}</h3>
            </div>
          )}

          {details.length > 0 && (
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-4">
                Participantes
              </h4>
              <div className="grid gap-3 md:grid-cols-2">
                {details.map((d, i) => {
                  const Icon = d.icon;
                  return (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-3 bg-neutral-800/50 rounded-xl"
                    >
                      <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                        <Icon size={18} className="text-blue-500" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">{d.label}</p>
                        <p className="text-white font-medium">{d.value}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {ev.contenido && (
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-4">
                Contenido
              </h4>
              <div className="bg-neutral-800/30 rounded-xl p-4 text-gray-300 whitespace-pre-wrap">
                {ev.contenido}
              </div>
            </div>
          )}

          {ev.youtubeLink && (
            <div className="pt-4">
              <a
                href={ev.youtubeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-xl transition"
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

      {/* BOTÓN DE CIERRE único, centrado arriba */}
      <button
        key="close-btn"
        onClick={onClose}
        className="fixed top-4 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full
                   bg-white/20 hover:bg-white/30 text-white flex items-center
                   justify-center z-[9999] transition-transform hover:scale-110"
        aria-label="Cerrar todos"
      >
        <X size={20} />
      </button>

      {/* CONTENEDOR de modales apilados */}
      <div className="fixed inset-0 flex flex-col items-center justify-center gap-6 z-50 p-4 pointer-events-none">
        {events.map((ev, idx) => (
          <motion.div
            key={ev.id || idx}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.3, delay: idx * 0.1 }}
            className="pointer-events-auto"
          >
            {renderOne(ev)}
          </motion.div>
        ))}
      </div>
    </AnimatePresence>
  );
}
