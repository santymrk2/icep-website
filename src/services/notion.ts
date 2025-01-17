// src/pages/api/notion.ts
import fetch from 'node-fetch';

const NOTION_API_URL = 'https://api.notion.com/v1/databases/';
const NOTION_API_KEY = "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"; // Asegúrate de tener configurado el token en tus variables de entorno: process.env.NOTION_API_KEY

export async function get() {
  const databaseId = 'b19a403082ee49238154f16433dd7925';

  try {
    const response = await fetch(`${NOTION_API_URL}${databaseId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${NOTION_API_KEY}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      return new Response('Error fetching database', { status: response.status });
    }

    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response('Server error', { status: 500 });
  }
}
