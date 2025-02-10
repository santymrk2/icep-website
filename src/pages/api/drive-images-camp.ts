import { google } from "googleapis";
import type { APIContext } from "astro";

const API_KEY = "AIzaSyB6eKMygvbGmkc6_OL1m9UFE5tTeoFOhtk";
const CARPETA_ID = "16pnmFDDwwQ9cVN37U74mjFbt67uCQIys";

export async function GET(context: APIContext) {
  try {
    const drive = google.drive({ version: "v3", auth: API_KEY });

    const respuesta = await drive.files.list({
      q: `'${CARPETA_ID}' in parents and mimeType contains 'image/'`,
      fields: "files(id, name, webViewLink, thumbnailLink)",
    });

    const imagenes = (respuesta.data.files || []).map((imagen) => ({
      id: imagen.id,
      nombre: imagen.name,
      url: imagen.webViewLink,
      miniatura: imagen.thumbnailLink,
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
