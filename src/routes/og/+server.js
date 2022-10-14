import font from './fonts/DJGROSS.ttf'
import Component from './OG.svelte'
import { html } from 'satori-html'
import satori from 'satori'

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function GET({ setHeaders, url }) {
  setHeaders({
    'Content-Type': 'image/svg+xml'
  })

  const svelte = Component.render(Object.fromEntries(url.searchParams))

  const svg = await satori(html(svelte.html), {
    width: 1200,
    height: 600,
    fonts: [
      {
        name: 'DJ',
        data: Buffer.from(font, 'base64'),
        weight: 400,
        style: 'normal'
      }
    ]
  })
  return new Response(svg)
}
