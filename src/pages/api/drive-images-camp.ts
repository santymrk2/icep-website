import { google } from "googleapis";
import type { APIContext } from "astro";

import { GOOGLE_API_KEY, getSecret } from "astro:env/server";

const API_KEY = GOOGLE_API_KEY;

export async function GET(context: APIContext) {
  try {
    const { searchParams } = new URL(context.request.url);
    const carpetaId = searchParams.get("carpetaId");

    if (!carpetaId) {
      return new Response(JSON.stringify({ error: "Falta el parámetro carpetaId" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
         },
      });
    }

    const drive = google.drive({ version: "v3", auth: API_KEY });

    const respuesta = await drive.files.list({
      q: `'${carpetaId}' in parents and mimeType contains 'image/'`,
      fields: "files(id, name, webViewLink, thumbnailLink)",
    });

    const imagenes = (respuesta.data.files || []).map((imagen) => ({
      id: imagen.id,
      nombre: imagen.name,
      url: imagen.webViewLink,
      miniatura: imagen.thumbnailLink,
      urlDownload: imagen.webViewLink ? `${imagen.webViewLink}?dl=1` : null, 
    }));

    return new Response(JSON.stringify(imagenes), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error al obtener imágenes de Google Drive:", error);
    return new Response(JSON.stringify({ error: "Error al obtener imágenes" }), {
      status: 500,
    });
  }
}
