<script>
  import { fade } from 'svelte/transition'
  export let text = ''
  export let x = 0
  export let y = 0
  export let show = false

</script>

{#if show}
  <div
    in:fade={{ duration: 200 }}
    out:fade={{ duration: 200 }}
    class="absolute transform -translate-x-1/2 py-2 px-3 text-sm bg-gray-600 text-gray-100 shadow-md rounded-md"
    style="
		top: {y}px;
		left: {x}px;"
  >
    {text}
  </div>
{/if}
