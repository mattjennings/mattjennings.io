import clsx from 'clsx'
import { motion } from 'framer-motion'
import { HTMLProps } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Head from 'next/head'

export interface HeaderProps {
  className?: string
  flat?: boolean
}

export default function Header({ className, flat }: HeaderProps) {
  return (
    <div className="relative w-screen flex flex-row max-w-[1920px]">
      <motion.div
        className={clsx(
          `flex relative h-16 md:h-36 bg-primary-600 w-screen`,
          `transform origin-left skew-y-0 md:skew-y-[-8deg]`,
          className
        )}
        // animate={{
        //   skewY: flat ? 0 : -6,
        //   originX: `left`,
        // }}
        // initial={{
        //   skewY: flat ? 0 : -6,
        //   originX: `left`,
        // }}
      >
        <motion.div
          id="header-content"
          className={clsx(
            `absolute top-0 left-0 flex flex-col`,
            `flex justify-center h-full p-2 sm:pl-4 text-xl md:text-5xl text-white font-medium`,
            `transform origin-left skew-y-0 md:skew-y-[8deg]`
          )}
          // animate={{
          //   skewY: flat ? 0 : 6,
          //   originX: `left`,
          // }}
          // initial={{
          //   skewY: flat ? 0 : 6,
          //   originX: `left`,
          // }}
        >
          <h1>Matt Jennings</h1>
          <h2 className="text-sm md:text-2xl text-green-200 ml-0.5 lowercase">
            web developer
          </h2>
        </motion.div>
      </motion.div>
      <nav className="absolute right-0 top-0 flex items-center h-full space-x-6 pr-16">
        <NavLink href="/">about</NavLink>
        <NavLink href="/projects">projects</NavLink>
        {/* <NavLink href="/blog">blog</NavLink> */}
      </nav>
    </div>
  )
}

Header.Content = function HeaderContent(props: HTMLProps<HTMLDivElement>) {
  if (!process.browser) {
    return null
  }
  return createPortal(props.children, document.querySelector(`#header-content`))
}

function NavLink({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  const router = useRouter()

  const isActive = router.pathname === href
  return (
    <Link href={href} passHref>
      <motion.a
        className={clsx(
          `text-2xl`,
          isActive ? `font-medium text-gray-800` : `font-normal text-gray-500`
        )}
        initial={{ origin: 0.5 }}
        whileHover={{ scale: 1.2 }}
      >
        {children}
      </motion.a>
    </Link>
  )
}
