import { google } from 'googleapis';

export async function obtenerImagenesDeDrive(apiKey, carpetaId) {
  try {
    const drive = google.drive({ version: 'v3', auth: apiKey });

    const respuesta = await drive.files.list({
      q: `'${carpetaId}' in parents and mimeType contains 'image/'`,
      fields: 'files(id, name, webViewLink, thumbnailLink)',
    });

    const imagenes = respuesta.data.files;

    if (imagenes && imagenes.length > 0) {
      return imagenes.map(imagen => ({
        id: imagen.id,
        nombre: imagen.name,
        url: imagen.webViewLink,
        miniatura: imagen.thumbnailLink,
      }));
    } else {
      return [];
    }
  } catch (error) {
    console.error('Error al obtener imágenes de Google Drive:', error);
    throw error;
  }
}
