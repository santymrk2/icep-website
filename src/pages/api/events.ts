import { getPages } from '../../services/notion.ts';

export async function GET() {
  const pages = await getPages();
  return new Response(JSON.stringify(pages), {
    headers: { 'Content-Type': 'application/json' },
  });
}
