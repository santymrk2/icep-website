// lib/notionService.js
import { Client } from '@notionhq/client';


export async function fetchNextMeeting() {
  const NOTION_API_KEY = process.env.NOTION_API_KEY;
  const DATABASE_ID = process.env.DATABASE_ID;

  const notion = new Client({ auth: NOTION_API_KEY });
  const fechaActual = new Date();
  const fechaISO = fechaActual.toISOString().split('T')[0];

  let pageType = null;
  let backColor = null;
  let pageDate = null;
  let pageLink = null;

  try {
    const notionPages = await notion.databases.query({
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
      const firstPage = notionPages.results[0];
      const type = firstPage.properties['Tipo de Reunión'].select?.name;

      pageType = type.toUpperCase();

      if (pageType === "ACTIVADOS") {
        backColor = "green-500";
      } else if (pageType === "MINISTERIO") {
        backColor = "blue-500";
      } else if (pageType === "ORACIÓN") {
        backColor = "orange-500";
      } else if (pageType === "JÓVENES") {
        backColor = "purple-500";
      } else if (pageType === "MUJERES") {
        backColor = "rose-500";
      } else if (pageType === "MATRIMONIOS") {
        backColor = "red-500";
      } else {
        backColor = "custom-blue";
      }

      const fechaStr = firstPage.properties['Fecha'].date?.start;
      if (fechaStr) {
        const fecha = new Date(fechaStr);
        const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const diaSemana = fecha.toLocaleDateString('es-AR', opciones).split(',')[0];
        const dia = fecha.getDate();
        const mes = fecha.toLocaleDateString('es-AR', { month: 'long' });

        const dateParts = fechaStr.split("T")[1].split(":");
        const originalHour = dateParts[0];
        const originalMinutes = dateParts[1];

        const horas = originalHour.padStart(2, '0');
        const minutos = originalMinutes.padStart(2, '0');

        pageDate = `El ${diaSemana} ${dia} de ${mes} a las ${horas}:${minutos}hs`;
      }

      pageLink = firstPage.properties['Mensaje en YouTube']?.url || null;
    } else {
      console.log('No se encontraron datos.');
    }
  } catch (error) {
    if (error.code === 'unauthorized') {
      console.error('Error: No tienes acceso al recurso especificado. Revisa tus credenciales y permisos.');
    } else {
      console.error('Error al consultar Notion:', error.message);
    }
  }

  return { pageType, backColor, pageDate, pageLink };
}
