import React from 'react'
import clsx from 'clsx'

export interface ButtonProps
  extends Omit<React.HTMLProps<HTMLButtonElement>, 'color' | 'size'> {
  color?: 'primary' | 'secondary' | 'gray' | 'red'
  variant?: 'pill' | 'box' | 'outline'
  size?: 'sm' | 'md' | 'lg'
}

export default React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { color = `primary`, variant = `pill`, size = `md`, ...props },
  ref
) {
  const colors = getColors({ color, variant, size, ...props })
  return (
    <button
      type={`button` as any}
      {...props}
      ref={ref}
      className={clsx(
        `inline-flex justify-center items-center text font-medium border focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-auto`,
        colors,

        // variants
        variant === `pill` && `rounded-full shadow-sm border-transparent`,
        variant === `box` && `rounded-md shadow-sm border-transparent`,
        variant === `outline` && `rounded-full`,

        // size
        size === `lg` && `px-6 py-3 text-base`,
        size === `md` && `px-3 py-2 text-base`,
        size === `sm` && `px-3 py-1 text-sm`,
        props.className
      )}
    />
  )
})

function getColors({ color, disabled, variant }: ButtonProps) {
  switch (color) {
    case `primary`:
      if (variant === `outline`) {
        return clsx(
          `text-primary-500 border-primary-500`,
          `focus:ring-transparent focus:ring-offset-primary-400`,
          !disabled && `hover:bg-primary-100`
        )
      } else {
        return clsx(
          `bg-primary-500 text-white`,
          `focus:ring-primary-400`,
          !disabled && `hover:bg-primary-600`
        )
      }
    case `secondary`:
      if (variant === `outline`) {
        return clsx(
          `text-secondary-500 border-secondary-500`,
          `focus:ring-transparent focus:ring-offset-secondary-400`,
          !disabled && `hover:bg-secondary-100`
        )
      } else {
        return clsx(
          `bg-secondary-500 focus:ring-secondary-400 text-white`,
          !disabled && `hover:bg-secondary-600`
        )
      }
    case `gray`:
      if (variant === `outline`) {
        return clsx(
          `text-gray-700 border-gray-500`,
          `focus:ring-transparent focus:ring-offset-gray-400`,
          !disabled && `hover:bg-gray-100`
        )
      } else {
        return clsx(
          `bg-gray-500 focus:ring-gray-400 text-white`,
          !disabled && `hover:bg-gray-600`
        )
      }
    case `red`:
      if (variant === `outline`) {
        return clsx(
          `text-red-500 border-red-500`,
          `focus:ring-transparent focus:ring-offset-red-400`,
          !disabled && `hover:bg-red-100`
        )
      } else {
        return clsx(
          `bg-red-500 focus:ring-red-400 text-white`,
          !disabled && `hover:bg-red-600`
        )
      }
  }
}
