<script>
	export let title
	export let img
	export let iOS = undefined
	export let android = undefined
	export let web = undefined
	export let github = undefined

	let links = [
		iOS && {
			url: iOS,
			label: 'iOS'
		},
		android && {
			url: android,
			label: 'Android'
		},
		web && {
			url: web,
			label: 'Website'
		},
		github && {
			url: github,
			label: 'GitHub'
		}
	].filter(Boolean)
</script>

<div class="flex flex-col md:flex-row items-start space-x-0 md:space-x-8">
	<h3 class="!mt-0 !mb-0 md:hidden">{title}</h3>
	<img
		alt={`${title} Screenshot`}
		src={img}
		class="!mb-2 !mt-2 max-h-80 !mx-auto w-auto md:w-1/2"
	/>
	<div class="w-auto md:w-1/2">
		<h3 id={title} class="!mt-0 !mb-0 hidden md:block"><a href={`#${title}`}>{title}</a></h3>
		<div class="flex justify-center md:justify-start !mt-2 !mb-2 space-x-1">
			{#each links as link}
				<a
					href={link.url}
					class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium !no-underline bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600"
				>
					{link.label}
				</a>
			{/each}
		</div>
		<p class="!my-0">
			<slot />
		</p>
	</div>
</div>
