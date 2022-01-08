<script>
  import LinkIcon from 'heroicons-svelte/outline/ExternalLinkIcon.svelte'

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

<div
  class="flex flex-col md:flex-row items-start space-x-0 md:space-x-8 pb-8 border-b border-slate-300 dark:border-slate-700"
>
  <div class="order-2 md:order-1 !mx-auto w-auto md:md-0 md:w-1/3">
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
  <div class="order-1 md:order-2 w-auto md:w-2/3">
    <h2 id={title} class="!mt-0 !mb-0 md:block"><a href={`#${title}`}>{title}</a></h2>
    <div class="flex justify-start !mt-2 !mb-2 space-x-1">
      {#each links as link}
        <a
          href={link.url}
          class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium !no-underline bg-slate-200 hover:bg-slate-300 text-slate-800 dark:bg-slate-700 dark:hover:bg-slate-600"
        >
          <span class="mr-1">
            {link.label}
          </span>
          <LinkIcon class="w-3" />
        </a>
      {/each}
    </div>
    <p>
      <slot />
    </p>
  </div>
</div>
