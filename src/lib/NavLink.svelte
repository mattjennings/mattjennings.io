<script>
	import clsx from 'clsx'
	import { page } from '$app/stores'

	let _class
	export let href
	export { _class as class }

	$: active = (() => {
		const [, path] = $page.path.split('/')
		const [, _href] = href.split('/')

		return (!_href && !path) || (_href && path && _href.startsWith(path))
	})()

	$: linkClass = active
		? 'text-xl md:text-2xl text-gray-800 dark:text-white'
		: 'text-md md:text-xl text-gray-500'
</script>

<a
	{href}
	class={clsx(
		_class,
		`transform transition-all font-medium hover:text-gray-800 dark:hover:text-gray-100`,
		linkClass
	)}
>
	<slot />
</a>
