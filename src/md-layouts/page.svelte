<script>
  export let title
</script>

<svelte:head>
  {#if title}
    <title>{title}</title>
  {/if}
</svelte:head>

<h2 class="!mt-0 !mb-0">{title}</h2>
<div class="mx-auto">
  <slot />
</div>
