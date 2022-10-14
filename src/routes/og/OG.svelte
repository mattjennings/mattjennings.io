<script>
  import Splatter from '$lib/components/Splatter.svelte'

  export let text
</script>

<div
  style:font-size="80px"
  style:background="white"
  style:display="flex"
  style:width="100%"
  style:height="100%"
  style:flex-direction="column"
  style:align-items="center"
  style:justify-content="center"
>
  <div
    style:display="flex"
    style:position="absolute"
    style:z-index="-10"
    style:top="-100%"
    style:left="-55%"
  >
    <Splatter fill="#35B3A2" scale={3} />
  </div>
  <div
    style:display="flex"
    style:position="absolute"
    style:z-index="-10"
    style:top="50%"
    style:left="25%"
  >
    <Splatter fill="#35B3A2" scale={2} />
  </div>

  <div
    style:display="flex"
    style:position="absolute"
    style:z-index="-10"
    style:top="-280px"
    style:left="1050px"
  >
    <Splatter fill="#F23B8F" scale={3} />
  </div>
  <div
    style:display="flex"
    style:position="absolute"
    style:z-index="-10"
    style:top="-920px"
    style:left="500px"
  >
    <Splatter fill="#F23B8F" scale={2} />
  </div>
  <div
    style:display="flex"
    style:flex-direction="column"
    style:align-items="center"
    style:justify-content="center"
    style:text-align="center"
    style:padding="0 150px"
    style:line-height="2em"
    style:overflow="hidden"
  >
    {text}
  </div>
</div>
