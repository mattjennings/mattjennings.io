export async function load({ params, fetch }) {
  const { slug } = params

  const policy = await import(`../../../policies/${slug}.md`)

  return {
    ...policy.metadata,
    component: policy.default
  }
}
