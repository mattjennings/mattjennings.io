<script>
  import { tooltip } from '$lib/actions/tooltip'

  let copied = false
  let copiedTimeout
</script>

<button
  title="mattjennings@hey.com"
  use:tooltip={{ text: copied ? 'Copied!' : 'mattjennings@hey.com' }}
  on:mousedown={() => {
    if (navigator) {
      navigator.clipboard.writeText('mattjennings@hey.com')
      copied = true

      clearTimeout(copiedTimeout)
      copiedTimeout = setTimeout(() => {
        copied = false
      }, 2000)
    }
  }}
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="h-6 w-6 text-gray-50 fill-current block pointer-events-none"
    viewBox="0 0 20 20"
  >
    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
  </svg>
</button>
