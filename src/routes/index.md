<script context="module">
	export const prerender = true
</script>

<script>
  import { differenceInYears } from 'date-fns'

  const age = differenceInYears(new Date(), new Date('1994-11-01'))

  const intro = `I'm Matt Jennings, a ${age} year-old Software Engineer. Some of my work includes a hockey news app, a Megaman X fan game, and various open source libraries for web apps.`
</script>

<svelte:head>

  <title>Matt Jennings | Software Developer</title>
  <meta name="description" content={intro}>
</svelte:head>

<div class="overflow-hidden mx-1">
  <video 
    class="rounded-md !my-0 mx-auto w-[360px] h-[202px]" 
    autoplay 
    muted 
    loop
    playsinline
    title="hello!" 
    src="/hello.mp4" 
  />
</div>

{intro} [Check them out!](/projects)

Currently, I work at [Appetize.io](https://appetize.io)

If you'd like to reach out, feel free to [tweet me](https://twitter.com/mattjennings44) or [email me](mailto:matt@mattjennings.io)
