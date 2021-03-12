import '../css/tailwind.css'
import type { AppProps } from 'next/app'
import ModalStack from 'components/ModalStack'
import { QueryClient, QueryClientProvider } from 'react-query'
import { AnimateSharedLayout } from 'framer-motion'
import Head from 'next/head'
import Header, { HeaderProps } from 'components/Header'

const queryClient = new QueryClient()

export interface PageProps {
  title: string
}

function App({ Component, pageProps }: AppProps<PageProps>) {
  return (
    <AnimateSharedLayout>
      <QueryClientProvider client={queryClient}>
        <ModalStack>
          <Head>
            <title> Matt Jennings</title>
          </Head>
          <Header {...(pageProps.header ?? {})} />
          <Component {...pageProps} />
        </ModalStack>
      </QueryClientProvider>
    </AnimateSharedLayout>
  )
}

export default App
