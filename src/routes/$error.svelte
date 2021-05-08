<script context="module">
	export function load({ error, status }) {
		return {
			props: { error, status }
		}
	}
</script>

<script>
	export let status
	export let error
</script>

<h1 class="text-center !mb-0">{status}</h1>

{#if status === 404}
	<p class="text-center !mt-2">oops, this page doesn't exist</p>
	<div class="overflow-hidden">
		<img
			class="!my-0 rounded-md"
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
