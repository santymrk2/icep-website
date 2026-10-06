// Inscripciones del campamento → Airtable. Solo servidor.
// El token solo necesita el scope data.records:write: puede crear filas, no leerlas.
import { AIRTABLE_TOKEN, AIRTABLE_BASE_ID, AIRTABLE_TABLE } from 'astro:env/server';

export interface NewCampRsvp {
  nombre: string;
  asiste: boolean;
  whatsapp: string;
  restriccion: string;
  esCep: boolean;
}

export const rsvpStoreReady = Boolean(AIRTABLE_TOKEN && AIRTABLE_BASE_ID);

// Nombres EXACTOS de las columnas en Airtable.
const FIELDS = {
  NOMBRE: 'Nombre',
  ASISTE: 'Asiste',
  WHATSAPP: 'WhatsApp',
  RESTRICCION: 'Restricción',
  ES_CEP: 'Es CEP',
} as const;

/** Crea la fila y devuelve el id del registro (rec…). */
export async function insertRsvp(row: NewCampRsvp): Promise<string> {
  const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE)}`;
  const r = await fetch(url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${AIRTABLE_TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      typecast: true,
      records: [
        {
          fields: {
            [FIELDS.NOMBRE]: row.nombre,
            [FIELDS.ASISTE]: row.asiste,
            [FIELDS.WHATSAPP]: row.whatsapp,
            [FIELDS.RESTRICCION]: row.restriccion,
            [FIELDS.ES_CEP]: row.esCep,
          },
        },
      ],
    }),
  });
  if (!r.ok) throw new Error(`airtable ${r.status}: ${await r.text()}`);
  const { records } = (await r.json()) as { records: { id: string }[] };
  return records[0]?.id ?? '';
}
