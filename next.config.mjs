/* eslint-disable some-specific-rule */

export const dynamic = 'error'; // Ensure it's static
export const revalidate = undefined; // No revalidation

export async function GET() {
  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>https://example.com/</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <priority>1.0</priority>
      </url>
    </urlset>
  `;
  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
