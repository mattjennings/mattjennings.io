<div class="container mx-auto">
  <slot />
</div>

<style>
  /* remove the margin-top of the first markdown element */
  .container > :global(*:first-child) {
    margin-top: 0;
  }
</style>
