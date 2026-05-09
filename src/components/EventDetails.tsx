// components/EventDetails.tsx
import React, { useEffect, useRef, useState } from "react";
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
  const [isClosing, setIsClosing] = useState(false);
  const backdropRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (events.length > 0 && !isClosing) {
      const run = async () => {
        const { default: gsap } = await import("gsap");
        // Entry Animation
        const tl = gsap.timeline();
        tl.to(backdropRef.current, { opacity: 1, duration: 0.3 })
          .to(closeBtnRef.current, { opacity: 1, scale: 1, duration: 0.3 }, "-=0.2")
          .fromTo(
            ".event-modal-item",
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.4, stagger: 0.1, ease: "power2.out" },
            "-=0.2"
          );
      };
      run();
    }
  }, [events, isClosing]);

  const handleClose = async () => {
    setIsClosing(true);
    const { default: gsap } = await import("gsap");
    const tl = gsap.timeline({
      onComplete: () => {
        onClose();
        setIsClosing(false);
      },
    });
    tl.to(".event-modal-item", { opacity: 0, y: -40, duration: 0.3, stagger: 0.05 })
      .to(closeBtnRef.current, { opacity: 0, scale: 0.8, duration: 0.2 }, "-=0.2")
      .to(backdropRef.current, { opacity: 0, duration: 0.3 }, "-=0.2");
  };

  if (!events.length) return null;

  const renderOne = (ev: any, idx: number) => {
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
      <div 
        key={ev.id || idx}
        className="event-modal-item bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-xl max-w-5xl w-full max-h-[80vh] overflow-y-auto shadow-2xl pointer-events-auto"
      >
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
        <div className="p-6 text-white">
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
    <>
      {/* FONDO único con blur */}
      <div
        ref={backdropRef}
        style={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-md z-40"
        onClick={handleClose}
      />

      {/* BOTÓN DE CIERRE único, centrado arriba */}
      <button
        ref={closeBtnRef}
        onClick={handleClose}
        style={{ opacity: 0, transform: "translateX(-50%) scale(0.8)" }}
        className="fixed top-4 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full
                   bg-white/20 hover:bg-white/30 text-white flex items-center
                   justify-center z-[9999] transition-transform hover:scale-110"
        aria-label="Cerrar todos"
      >
        <X size={20} />
      </button>

      {/* CONTENEDOR de modales apilados */}
      <div 
        ref={containerRef}
        className="fixed inset-0 flex flex-col items-center justify-center gap-6 z-50 p-4 pointer-events-none"
      >
        {events.map((ev, idx) => renderOne(ev, idx))}
      </div>
    </>
  );
}
