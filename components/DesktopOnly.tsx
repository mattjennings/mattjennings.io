import React, { HTMLProps } from 'react'
import clsx from 'clsx'

/**
 * Only visible on lg or greater breakpoints
 */
export default function DesktopOnly({
  className,
  ...props
}: HTMLProps<HTMLDivElement>) {
  return (
    <div
      className={clsx(
        {
          'sm:hidden': true,
          'md:hidden': true,
          'lg:hidden': false,
        },
        className
      )}
      {...props}
    />
  )
}
