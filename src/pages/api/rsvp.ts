import type { APIContext } from 'astro';
import { insertRsvp, rsvpStoreReady } from '../../lib/camp-rsvps';

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });

const str = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

export async function POST({ request }: APIContext) {
  if (!rsvpStoreReady) return json({ error: 'not_configured' }, 503);

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'invalid_json' }, 400);
  }

  // Honeypot: los bots lo llenan, los humanos no lo ven.
  if (str(body.web, 200)) return json({ ok: true });

  const nombre = str(body.nombre, 120);
  const asiste = body.asiste === 'si' ? true : body.asiste === 'no' ? false : null;
  const whatsapp = str(body.whatsapp, 40);
  const restriccion = str(body.restriccion, 200);
  const esCep = body.esCep === true;

  if (nombre.length < 2 || asiste === null) return json({ error: 'invalid' }, 400);
  if (asiste && (!whatsapp || !esCep)) return json({ error: 'invalid' }, 400);

  try {
    const id = await insertRsvp({
      nombre,
      asiste,
      whatsapp: asiste ? whatsapp : '',
      restriccion: asiste ? restriccion : '',
      esCep,
    });
    return json({ ok: true, id });
  } catch (e) {
    console.error('[rsvp]', e);
    return json({ error: 'db' }, 502);
  }
}
