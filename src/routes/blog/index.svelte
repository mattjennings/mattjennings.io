<script context="module">
  export const prerender = true

  export const load = async ({ fetch }) => {
    const response = await fetch('/blog/feed')
    const { posts } = await response.json()
    return {
      props: {
        posts
      }
    }
  }
</script>

<script>
  import { format } from 'date-fns'
  export let posts
</script>

<div>
  {#each posts as post}
    <div>
      <div>
        <h3 class="!mt-0 !mb-0"><a href={`/blog/${post.slug}`}>{post.title}</a></h3>
        <time>{format(new Date(post.created), 'MMMM dd, yyyy')}</time>
        •
        <span>{post.length}</span>
      </div>
      <p class="whitespace-pre-wrap">{post.preview}</p>
    </div>
  {/each}
</div>
