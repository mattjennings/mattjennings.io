import { Transition, Portal } from '@headlessui/react'
import React from 'react'
import NoSSR from './NoSSR'
import clsx from 'clsx'
import { HTMLProps } from 'react'

export interface ModalProps extends React.HTMLProps<HTMLDivElement> {
  open?: boolean
  unmount?: boolean
  className?: string
  children?: React.ReactNode
  maxWidth?: boolean
  hideBackdrop?: boolean
  skipAnimations?: boolean
  onClose?: () => any
  beforeEnter?: () => any
  afterEnter?: () => any
  beforeLeave?: () => any
  afterLeave?: () => any
}

function Modal({
  open,
  children,
  className,
  maxWidth = true,
  hideBackdrop,
  beforeEnter,
  afterEnter,
  beforeLeave,
  afterLeave,
  unmount,
  skipAnimations,
  ...props
}: ModalProps) {
  return (
    <NoSSR>
      <Portal>
        <Transition
          className="fixed flex items-center sm:items-start sm:my-8 justify-center inset-0 z-10 pointer-events-none overflow-hidden"
          show={!!open}
          appear
          unmount={unmount}
          beforeEnter={beforeEnter}
          afterEnter={afterEnter}
          beforeLeave={beforeLeave}
          afterLeave={afterLeave}
        >
          {!hideBackdrop && (
            <Transition.Child
              enter={`ease-out ${
                skipAnimations ? `duration-0` : `duration-300`
              }`}
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave={`ease-in ${
                skipAnimations ? `duration-0` : `duration-200`
              }`}
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </Transition.Child>
          )}
          <Transition.Child
            role="dialog"
            aria-modal="true"
            {...(props as any)}
            className={clsx(
              `bg-white rounded-lg shadow-xl overflow-hidden transform pointer-events-auto ${
                skipAnimations ? `transition-none` : `transition-all`
              }`,
              `max-h-full sm:w-full ${maxWidth ? `sm:max-w-lg` : ``}`,
              className
            )}
            enter={`ease-out ${skipAnimations ? `duration-0` : `duration-300`}`}
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave={`ease-in ${skipAnimations ? `duration-0` : `duration-200`}`}
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            {children}
          </Transition.Child>
        </Transition>
      </Portal>
    </NoSSR>
  )
}

Modal.Header = function ModalContent(props: HTMLProps<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={clsx(
        `px-4 pt-4 text-lg leading-6 font-medium text-gray-900`,
        props.className
      )}
    />
  )
}
Modal.Content = function ModalContent(props: HTMLProps<HTMLDivElement>) {
  return <div {...props} className={clsx(`p-4`, props.className)} />
}

Modal.Footer = function ModalFooter(props: HTMLProps<HTMLDivElement>) {
  return <div {...props} className={clsx(`p-4`, props.className)} />
}

export default Modal
