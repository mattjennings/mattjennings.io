import clsx from 'clsx'
import { HTMLProps } from 'react'

export interface InputProps
  extends HTMLProps<HTMLDivElement>,
    Pick<HTMLProps<HTMLInputElement>, 'value' | 'placeholder' | 'type'> {
  icon?: React.ReactNode
  inputProps?: HTMLProps<HTMLInputElement>
}

export default function Input({
  icon,
  inputProps,
  value,
  onChange,
  onBlur,
  onFocus,
  type = `text`,
  placeholder,
  ...props
}: InputProps) {
  return (
    <div
      {...props}
      className={clsx(`mt-1 relative rounded-md shadow-sm`, props.className)}
    >
      {icon && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
          {icon}
        </div>
      )}
      <input
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        type={type}
        placeholder={placeholder}
        {...(inputProps ?? {})}
        className={clsx(
          `focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md`,
          !!icon && `pl-10`,
          inputProps?.className
        )}
      />
    </div>
  )
}
