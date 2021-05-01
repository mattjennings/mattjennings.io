import Tooltip from './Tooltip.svelte'

export function tooltip(element, options) {
	const title = element.getAttribute('title')
	const tooltipComponent = new Tooltip({
		props: {
			text: options.text
		},
		target: document.body
	})

	function mouseOver(event) {
		const { top, left, width } = event.currentTarget.getBoundingClientRect()
		tooltipComponent.$set({
			text: options.text,
			x: left + width / 2,
			y: top - 48 + window.scrollY,
			show: true
		})
		element.removeAttribute('title')
	}

	function mouseLeave() {
		tooltipComponent.$set({
			show: false
		})
		element.setAttribute('title', title)
	}

	element.addEventListener('mouseover', mouseOver)
	element.addEventListener('mouseleave', mouseLeave)

	return {
		update(options) {
			tooltipComponent.$set({
				text: options.text
			})
		},
		destroy() {
			element.removeEventListener('mouseover', mouseOver)
			element.removeEventListener('mouseleave', mouseLeave)
		}
	}
}
