import React, { HTMLProps } from 'react'
import clsx from 'clsx'

/**
 * Only visible on sm/md breakpoint
 */
export default function MobileOnly({
  className,
  ...props
}: HTMLProps<HTMLDivElement>) {
  return (
    <div
      className={clsx(
        {
          'sm:hidden': false,
          'md:hidden': false,
          'lg:hidden': true,
        },
        className
      )}
      {...props}
    />
  )
}
