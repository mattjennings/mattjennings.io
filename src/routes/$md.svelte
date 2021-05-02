<script>
	import { format } from 'date-fns'

	export let title
	export let created
	export let length
</script>

<svelte:head>
	{#if title}
		<title>{title}</title>
	{/if}
</svelte:head>

<h3 class="!mt-0 !mb-0">{title}</h3>
<time>{format(new Date(created), 'MMMM dd, yyyy')}</time>
•
<span>{length}</span>

<slot />
