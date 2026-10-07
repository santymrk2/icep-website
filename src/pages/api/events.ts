import getPages, { getMonthEvents, getEventsByDateRange } from '../../services/notion.ts';
import type { APIContext } from 'astro';

// El CDN de Vercel cachea 5 min y sirve la versión anterior mientras revalida:
// casi ninguna visita espera a Notion (~0,7 s) y cuidamos su rate limit.
const json = (data: unknown) =>
  new Response(JSON.stringify(data), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=0, s-maxage=300, stale-while-revalidate=600',
    },
  });

export async function GET({ url }: APIContext) {
  const year = url.searchParams.get('year');
  const month = url.searchParams.get('month');
  const start = url.searchParams.get('start');
  const end = url.searchParams.get('end');

  if (start && end) {
    // Si se pasan start y end, filtrar por rango exacto
    const events = await getEventsByDateRange(start, end);
    return json(events);
  }

  if (year !== null && month !== null) {
    // Si se pasan year y month, traer todos los eventos del mes
    const events = await getMonthEvents(Number(year), Number(month));
    return json(events);
  }
  // Comportamiento por defecto (futuros)
  const pages = await getPages();
  return json(pages);
}
