export async function get() {
  return {
    status: 301,
    redirect: '/',
    headers: { Location: '/' }
  }
}
