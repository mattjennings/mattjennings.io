import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import { getPolicyBySlug, getAllPolicies } from 'lib/policies'
import Markdown from '../../components/Markdown'
import { Typography } from '@material-ui/core'

export default function Policy({ policy }) {
  const router = useRouter()

  if (!router.isFallback && !policy?.slug) {
    return <ErrorPage statusCode={404} />
  }

  if (router.isFallback) {
    return null
  }

  return (
    <div>
      <Typography variant="h3">{policy.title}</Typography>
      <Markdown>{policy.content}</Markdown>
    </div>
  )
}

export async function getStaticProps({ params }) {
  const policy = getPolicyBySlug(params.slug, ['title', 'content', 'slug'])

  return {
    props: {
      policy,
    },
  }
}

export async function getStaticPaths() {
  const policies = getAllPolicies(['slug']) as any[]

  return {
    paths: policies.map((policy) => {
      return {
        params: {
          slug: policy.slug,
        },
      }
    }),
    fallback: false,
  }
}
