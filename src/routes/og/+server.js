import font from './fonts/DJGROSS.ttf?base64'
import Component from './OG.svelte'
import { html } from 'satori-html'
import satori from 'satori'
import { Resvg } from '@resvg/resvg-js'

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function GET({ url }) {
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

  const resvg = new Resvg(svg, {
    fitTo: {
      mode: 'original'
    }
  })

  const png = resvg.render()

  return new Response(png.asPng(), {
    headers: {
      'content-type': 'image/png',
      'cache-control': 'public, max-age=3600, immutable'
    }
  })
}
