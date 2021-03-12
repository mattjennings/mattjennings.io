import { Portal } from '@headlessui/react'
import clsx from 'clsx'
import { motion } from 'framer-motion'
import { HTMLProps } from 'react'
import { createPortal } from 'react-dom'
import NoSSR from './NoSSR'

export interface HeaderProps {
  className?: string
  flat?: boolean
  children: React.ReactNode
}

export default function Header({ className, flat, children }: HeaderProps) {
  return (
    <motion.div
      className={clsx(
        `flex relative h-20 sm:h-40 bg-primary-600 w-screen`,
        className
      )}
      animate={{
        skewY: flat ? 0 : -6,
        originX: `left`,
      }}
      initial={{
        skewY: flat ? 0 : -6,
        originX: `left`,
      }}
    >
      <motion.div
        id="header-content"
        className={clsx(
          `absolute top-0 left-0 flex flex-col`,
          `flex justify-center h-full p-2 sm:pl-4 text-xl sm:text-5xl text-white font-medium`
        )}
        animate={{
          skewY: flat ? 0 : 6,
          originX: `left`,
        }}
        initial={{
          skewY: flat ? 0 : 6,
          originX: `left`,
        }}
      />
    </motion.div>
  )
}

Header.Content = function HeaderContent(props: HTMLProps<HTMLDivElement>) {
  if (!process.browser) {
    return null
  }
  return createPortal(props.children, document.querySelector(`#header-content`))
}
