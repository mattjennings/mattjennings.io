<!-- For any page that represents a normal text document (privacy policies, etc) -->
<script>
  export let title
</script>

<svelte:head>
  {#if title}
    <title>{title}</title>
  {/if}
</svelte:head>

<div class="container mx-auto prose">
  <h1>{title}</h1>
  <slot />
</div>
