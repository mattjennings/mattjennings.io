<script>
  import Splatter from '$lib/components/Splatter.svelte'

  export let text
</script>

<div tw="bg-white flex flex-col w-full h-full items-center justify-center" style:font-size="80px">
  <div tw="flex absolute" style:top="-100%" style:left="-55%">
    <Splatter fill="#35B3A2" scale={3} />
  </div>
  <div tw="flex absolute" style:top="50%" style:left="25%">
    <Splatter fill="#35B3A2" scale={2} />
  </div>

  <div tw="flex absolute" style:top="-280px" style:left="1050px">
    <Splatter fill="#F23B8F" scale={3} />
  </div>
  <div tw="flex absolute" style:top="-920px" style:left="500px">
    <Splatter fill="#F23B8F" scale={2} />
  </div>
  <div
    tw="flex flex-col items-center justify-center text-center overflow-hidden"
    style:padding="0 150px"
    style:line-height="2em"
  >
    {text}
  </div>
</div>
