// Fechas de eventos SIEMPRE en hora argentina, sin importar dónde corra el código
// (Vercel corre en UTC; el navegador del visitante puede estar en cualquier zona).
export const TZ = "America/Argentina/Buenos_Aires";

const DATE_ONLY = /^\d{4}-\d{2}-\d{2}$/;

/** Notion manda "2026-10-07" (sin hora) o "2026-10-07T19:00:00.000-03:00". */
export const hasTime = (value: string) => !DATE_ONLY.test(value);

/**
 * `new Date("2026-10-07")` lo toma como medianoche UTC = 21:00 del día anterior en Argentina.
 * Una fecha sin hora se ancla a la medianoche argentina (sin horario de verano desde 2009).
 */
export const parseEventDate = (value: string) =>
  new Date(hasTime(value) ? value : `${value}T00:00:00-03:00`);

const isoFormatter = new Intl.DateTimeFormat("en-CA", { timeZone: TZ });

/** "YYYY-MM-DD" del día en Argentina. */
export const dateKeyAR = (date: Date) => isoFormatter.format(date);

export const todayISO = () => dateKeyAR(new Date());

/** 0 = domingo … 6 = sábado, en Argentina. */
export const weekdayAR = (date: Date) => new Date(`${dateKeyAR(date)}T12:00:00Z`).getUTCDay();

/** Día del mes y mes (0-11) en Argentina. */
export const datePartsAR = (date: Date) => {
  const [, month, day] = dateKeyAR(date).split("-").map(Number);
  return { day, month: month - 1 };
};

/** "19:00" en Argentina. */
export const timeAR = (date: Date) =>
  date.toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: TZ });
