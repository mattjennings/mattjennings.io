import '../css/tailwind.css'
import type { AppProps } from 'next/app'
import ModalStack from 'components/ModalStack'
import { QueryClient, QueryClientProvider } from 'react-query'
import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion'
import Head from 'next/head'
import Header, { HeaderProps } from 'components/Header'
import { useRouter } from 'next/router'

const queryClient = new QueryClient()

export interface PageProps {
  header?: {
    title: string
  }
}

function App({ Component, pageProps }: AppProps<PageProps>) {
  const router = useRouter()

  return (
    <AnimateSharedLayout>
      <QueryClientProvider client={queryClient}>
        <ModalStack>
          <Head>
            <title> Matt Jennings</title>
          </Head>
          <Header {...(pageProps.header ?? {})} />
          <AnimatePresence initial={false} exitBeforeEnter>
            <motion.main
              key={router.pathname}
              variants={{
                initial: {
                  opacity: 0,
                },
                enter: {
                  opacity: 1,
                  transition: {
                    duration: 0.5,
                  },
                },
                exit: {
                  opacity: 0,
                  transition: {
                    duration: 0.5,
                  },
                },
              }}
              initial="initial"
              animate="enter"
              exit="exit"
            >
              <Component {...pageProps} />
            </motion.main>
          </AnimatePresence>
        </ModalStack>
      </QueryClientProvider>
    </AnimateSharedLayout>
  )
}

export default App
