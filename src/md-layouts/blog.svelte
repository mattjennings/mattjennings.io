<script>
  import { format } from 'date-fns'

  export let title
  export let created
  export let length

  function fixTimezone(date) {
    return new Date(new Date(date).valueOf() + new Date(date).getTimezoneOffset() * 60 * 1000)
  }
</script>

<svelte:head>
  {#if title}
    <title>{title}</title>
  {/if}
</svelte:head>

<h1 class="!mt-0 !mb-1">{title}</h1>
<div>
  <time>{format(fixTimezone(created), 'MMMM d, yyyy')}</time>
  •
  <span>{length}</span>
</div>
<article>
  <slot />
</article>
