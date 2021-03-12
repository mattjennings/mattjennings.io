import {
  Popover as HeadlessPopover,
  Portal,
  Transition,
} from '@headlessui/react'
import { Props } from '@headlessui/react/dist/types'
import { Placement } from '@popperjs/core'
import clsx from 'clsx'
import React, { ElementType, useContext, useState } from 'react'
import { usePopper } from 'react-popper'
import Button, { ButtonProps } from './Button'

const PopoverContext = React.createContext<{
  popupEl: HTMLElement
  referenceEl: HTMLElement
  setPopupEl: (el: HTMLElement) => any
  setReferenceEl: (el: HTMLElement) => any
  styles: any
  attributes: any
}>({} as any)

export type PopoverProps<TTag> = Props<
  TTag,
  {
    open: boolean
  }
> & {
  placement?: Placement
}

function Popover<TTag extends ElementType = 'div'>({
  placement,
  ...props
}: PopoverProps<TTag>) {
  const [popupEl, setPopupEl] = useState<HTMLElement>(null)
  const [referenceEl, setReferenceEl] = useState<HTMLElement>(null)
  const { styles, attributes } = usePopper(referenceEl, popupEl, {
    placement,
  })

  return (
    <PopoverContext.Provider
      value={{
        popupEl,
        setPopupEl,
        referenceEl,
        setReferenceEl,
        styles,
        attributes,
      }}
    >
      <HeadlessPopover {...props} />
    </PopoverContext.Provider>
  )
}

Popover.Group = HeadlessPopover.Group

Popover.Button = function PopoverButton(props: ButtonProps) {
  const { setReferenceEl } = useContext(PopoverContext)

  return (
    <HeadlessPopover.Button
      as={Button}
      {...(props as any)}
      ref={setReferenceEl}
    />
  )
}

Popover.Panel = function PopoverPanel(props: any) {
  const { setPopupEl, styles, attributes } = useContext(PopoverContext)
  const popperPlacement = attributes.popper?.[`data-popper-placement`]

  return (
    <Portal>
      <HeadlessPopover.Panel
        {...props}
        className={clsx(`z-50`, props.className)}
        ref={setPopupEl as any}
        style={styles.popper}
        {...attributes.popper}
      >
        {({ open }) => (
          <Transition
            show={open}
            className="my-2 p-2 bg-background-500 shadow-md rounded-md border border-background py-1 bg-white ring-1 ring-black ring-opacity-5"
            style={{
              transformOrigin:
                popperPlacement === `top` ? `50% 100%` : `50% 0%`,
            }}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            {typeof props.children === `function`
              ? props.children({ open })
              : props.children}
          </Transition>
        )}
      </HeadlessPopover.Panel>
    </Portal>
  )
}

Popover.Overlay = HeadlessPopover.Overlay

export default Popover
