import render from './render'

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function GET({ setHeaders, url }) {
  const svg = await render(Object.fromEntries(url.searchParams))

  setHeaders({
    'Content-Type': 'image/svg+xml'
  })

  return new Response(svg)
}
