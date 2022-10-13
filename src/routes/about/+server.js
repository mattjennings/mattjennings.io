export async function GET() {
  return {
    status: 301,
    redirect: '/',
    headers: { Location: '/' }
  }
}
