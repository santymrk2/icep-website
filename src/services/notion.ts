import { Client } from "@notionhq/client";
import { NOTION_API_KEY, DATABASE_ID } from "astro:env/server";

// Define the interface for your Notion page properties
interface NotionPageProperties {
  Fecha: {
    date: {
      start: string;
    } | null;
  };
  "Tipo de Reunión": {
    select: {
      name: string;
    } | null;
  };
  "Mensaje en YouTube"?: {
    // Make this optional with a question mark
    url: string;
  } | null;
  // Add other properties as needed
}

// Define the interface for your Notion page
interface NotionPage {
  id: string;
  properties: NotionPageProperties;
  public_url: string;
  url: string; // Add the 'url' property here
}

function formatearFecha(fechaStr: string | null | undefined) {
  // Make fechaStr accept undefined
  if (!fechaStr) return null;

  const fecha = new Date(fechaStr);
  const hoy = new Date();
  const esHoy =
    fecha.getFullYear() === hoy.getFullYear() &&
    fecha.getMonth() === hoy.getMonth() &&
    fecha.getDate() === hoy.getDate();

  if (esHoy) {
    const matchHora = fechaStr.match(/(\d{2}):(\d{2})/);

    if (matchHora) {
      const [, hora, minuto] = matchHora;
      return `Hoy a las ${hora}:${minuto}hs`;
    }
  }

  const formatter = new Intl.DateTimeFormat("es-AR", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const parts = formatter.formatToParts(fecha);
  const [diaSemana, dia, mes] = parts.reduce((acc, part) => {
    if (part.type === "weekday") acc[0] = part.value;
    if (part.type === "day") acc[1] = part.value;
    if (part.type === "month") acc[2] = part.value;
    return acc;
  }, new Array(3));

  let horario = "";
  const matchHora = fechaStr.match(/(\d{2}):(\d{2})/);
  if (matchHora) {
    const [, hora, minuto] = matchHora;
    horario = ` a las ${hora}:${minuto}hs`;
  }

  return `El ${diaSemana} ${dia} de ${mes}${horario}`;
}

const getPages = async () => {
  const fechaActual = new Date();
  const fechaISO = fechaActual.toISOString().split("T")[0];
  let notionPages: any; // You can keep this as 'any' or try to type the entire response structure
  let pages: any[] = []; // Type this as an array of objects

  const notion = new Client({ auth: NOTION_API_KEY });

  try {
    notionPages = await notion.databases.query({
      database_id: DATABASE_ID,
      filter: {
        property: "Fecha",
        date: {
          on_or_after: fechaISO,
        },
      },
      sorts: [
        {
          property: "Fecha",
          direction: "ascending",
        },
      ],
    });

    if (notionPages.results.length > 0) {
      const firstPage: NotionPage = notionPages.results[0] as NotionPage; // Type assertion
      const secondPage: NotionPage = notionPages.results[1] as NotionPage; // Type assertion

      pages.push({
        id: firstPage.id,
        date: formatearFecha(firstPage.properties.Fecha.date?.start),
        type: firstPage.properties[
          "Tipo de Reunión"
        ].select?.name?.toUpperCase(), // Optional chaining
        pageLink: firstPage.public_url,
        youtubeLink: firstPage.properties["Mensaje en YouTube"]?.url, // Optional chaining
        startDate: firstPage.properties.Fecha.date?.start,
      });

      if (
        secondPage && // Check if secondPage exists
        firstPage.properties.Fecha.date?.start?.slice(0, 10) ===
        secondPage.properties.Fecha.date?.start?.slice(0, 10)
      ) {
        pages.push({
          id: secondPage.id,
          date: formatearFecha(secondPage.properties.Fecha.date?.start),
          type: secondPage.properties[
            "Tipo de Reunión"
          ].select?.name?.toUpperCase(), // Optional chaining
          pageLink: secondPage.url,
          youtubeLink: secondPage.properties["Mensaje en YouTube"]?.url, // Optional chaining
          startDate: secondPage.properties.Fecha.date?.start,
        });
      }
    } else {
      console.log("No se encontraron datos.");
    }
    return pages;
  } catch (error: any) {
    // Maneja el error aquí.
    if (error.code === "unauthorized") {
      console.log(
        "Error: No tienes acceso al recurso especificado. Revisa tus credenciales y permisos.",
      );
    } else {
      console.log("Error al consultar Notion:", error.message);
    }
  }
};

/**
 * Trae todos los eventos del mes indicado (mes 0-indexado)
 * @param {number} year - Año (ej: 2024)
 * @param {number} month - Mes (0=enero, 11=diciembre)
 * @returns {Promise<any[]>}
 */
export const getEventsByDateRange = async (startISO: string, endISO: string) => {
  const notion = new Client({ auth: NOTION_API_KEY });
  try {
    const notionPages = await notion.databases.query({
      database_id: DATABASE_ID,
      filter: {
        and: [
          {
            property: "Fecha",
            date: {
              on_or_after: startISO,
            },
          },
          {
            property: "Fecha",
            date: {
              on_or_before: endISO,
            },
          },
        ],
      },
      sorts: [
        {
          property: "Fecha",
          direction: "ascending",
        },
      ],
    });

    return notionPages.results.map((page: any) => {
      const p = page as NotionPage;
      return {
        id: p.id,
        date: formatearFecha(p.properties.Fecha.date?.start),
        type: p.properties["Tipo de Reunión"]?.select?.name?.toUpperCase(),
        pageLink: p.public_url,
        youtubeLink: p.properties["Mensaje en YouTube"]?.url,
        startDate: p.properties.Fecha.date?.start,
        tema: p.properties["Tema"]?.rich_text?.[0]?.plain_text ?? "",
        enseñanza: p.properties["Enseñanza"]?.rich_text?.[0]?.plain_text ?? "",
        presidencia:
          p.properties["Presidencia"]?.rich_text?.[0]?.plain_text ?? "",
        alabanza: p.properties["Alabanza"]?.rich_text?.[0]?.plain_text ?? "",
        predicacion:
          p.properties["Predicación"]?.rich_text?.[0]?.plain_text ?? "",
        participacionMusical:
          p.properties["Participación Musical"]?.rich_text?.[0]?.plain_text ??
          "",

        subtema: p.properties["Subtema"]?.rich_text?.[0]?.plain_text ?? "",
        contenido: p.properties["Contenido"]?.rich_text?.[0]?.plain_text ?? "",
      };
    });
  } catch (error: any) {
    console.log("Error al consultar eventos en Notion por rango:", error.message);
    return [];
  }
};

/**
 * Trae todos los eventos del mes indicado (mes 0-indexado)
 */
export const getMonthEvents = async (year: number, month: number) => {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  // Ajuste de zona horaria: usar UTC o local strings adecuadamente.
  // toISOString usa UTC. Si queremos asegurarnos que busca el dia completo local,
  // deberiamos formatear "YYYY-MM-DD".
  // La implementacion anterior usaba toISOString().split("T")[0], lo cual es correcto si las fechas en Notion son date only.
  // Pero cuidado con el timezone offset. new Date(year, month, 1) crea local time 00:00.
  // Si estoy en GMT-3, toISOString() puede dar el día anterior.
  // Para ser seguros, construiremos el string YYYY-MM-DD manualmente.

  const formatDateISO = (d: Date) => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  };

  const startISO = formatDateISO(firstDay);
  const endISO = formatDateISO(lastDay);

  return await getEventsByDateRange(startISO, endISO);
};

export default getPages;

