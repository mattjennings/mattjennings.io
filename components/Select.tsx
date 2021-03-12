import clsx from 'clsx'
import { HTMLProps } from 'react'

export type SelectProps = HTMLProps<HTMLSelectElement>

export default function Select(props: SelectProps) {
  return (
    <select
      {...props}
      className={clsx(
        `text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md`,
        props.className
      )}
    />
  )
}
