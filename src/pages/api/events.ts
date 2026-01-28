import getPages, { getMonthEvents, getEventsByDateRange } from '../../services/notion.ts';
import type { APIContext } from 'astro';

export async function GET({ url }: APIContext) {
  const year = url.searchParams.get('year');
  const month = url.searchParams.get('month');
  const start = url.searchParams.get('start');
  const end = url.searchParams.get('end');

  if (start && end) {
    // Si se pasan start y end, filtrar por rango exacto
    const events = await getEventsByDateRange(start, end);
    return new Response(JSON.stringify(events), {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (year !== null && month !== null) {
    // Si se pasan year y month, traer todos los eventos del mes
    const events = await getMonthEvents(Number(year), Number(month));
    return new Response(JSON.stringify(events), {
      headers: { 'Content-Type': 'application/json' },
    });
  }
  // Comportamiento por defecto (futuros)
  const pages = await getPages();
  return new Response(JSON.stringify(pages), {
    headers: { 'Content-Type': 'application/json' },
  });
}
