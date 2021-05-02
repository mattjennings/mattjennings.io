<script>
	export let title
	export let img = undefined
	export let video = undefined
	export let iOS = undefined
	export let android = undefined
	export let web = undefined
	export let github = undefined
	export let download = undefined

	let links = [
		web && {
			url: web,
			label: 'Website'
		},
		iOS && {
			url: iOS,
			label: 'iOS'
		},
		android && {
			url: android,
			label: 'Android'
		},
		github && {
			url: github,
			label: 'GitHub'
		},
		download && {
			url: download,
			label: 'Download'
		}
	].filter(Boolean)
</script>

<div class="flex flex-col md:flex-row items-start space-x-0 md:space-x-8 py-8">
	<h3 class="!mt-0 !mb-0 md:hidden text-center w-full">{title}</h3>
	<div class="py-2 !mx-auto w-auto md:w-1/3">
		{#if img}
			<img alt={`${title} Screenshot`} src={img} class="!mb-0 !mt-0 max-h-80 " />
		{/if}

		{#if video}
			<iframe
				class="w-full h-60 rounded-md"
				src={video}
				{title}
				frameborder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowfullscreen
			/>
		{/if}
	</div>
	<div class="w-auto md:w-2/3">
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
