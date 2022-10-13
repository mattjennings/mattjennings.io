<script>
  import { page } from '$app/stores'

  $: status = $page.status
  $: error = $page.error
</script>

<div class="flex flex-col items-center gap-4">
  <h1 class="text-center text-3xl font-bold">{status}</h1>

  {#if status === 404}
    <p class="text-center text-xl">oops, this page doesn't exist</p>
    <div class="overflow-hidden">
      <img
        class="rounded-md"
        src="https://media.giphy.com/media/1rK7WULnc8YgdmVIBz/giphy.gif"
        alt="philadelphia flyers mascot falling down"
      />
    </div>
  {:else}
    <p>{error.message}</p>

    {#if error.stack}
      <pre>{error.stack}</pre>
    {/if}
  {/if}
</div>
