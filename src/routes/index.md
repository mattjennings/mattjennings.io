<script context="module">
	export const prerender = true
</script>

<script>
  import { differenceInYears } from 'date-fns'

  const age = differenceInYears(new Date(), new Date('1994-11-01'))
</script>

<svelte:head>

  <title>Matt Jennings | Hello!</title>
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

<!--
  span fixes a weird sveltekit/msdvex bug where "Check them out" would end up inside of {age}.
-->

I'm Matt Jennings, a <span>{age}</span> year-old software developer. Some of my work includes a hockey news app, a Megaman X fan game, and a framework for writing games with Svelte. [Check them out!](/projects)

Currently, I work at [PaintScout](https://paintscout.com) as a full stack developer and have been with them since 2017.

If you'd like to reach out, feel free to [tweet me](https://twitter.com/mattjennings44) or [email me](mailto:mattjennings@hey.com).
