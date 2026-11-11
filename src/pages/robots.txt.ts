import type { APIRoute } from 'astro';

// /robots.txt: open to every crawler, with the sitemap's absolute URL taken from `site`.

export const GET: APIRoute = ({ site }) => {
  const body = `User-agent: *
Allow: /

Sitemap: ${new URL('/sitemap.xml', site).href}
`;

  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
