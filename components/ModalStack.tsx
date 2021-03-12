import {
  ModalStack as ReactModalStack,
  ModalStackProps,
  ModalStackValue,
} from '@mattjennings/react-modal-stack'
import { useState, useEffect } from 'react'
import { Transition, Portal } from '@headlessui/react'
import NoSSR from './NoSSR'

export default function ModalStack(props: ModalStackProps) {
  return <ReactModalStack renderModals={AnimatedModels} {...props} />
}

function AnimatedModels({ stack, closeModal }: ModalStackValue) {
  // Lags slightly behind the `stack` so that we can animate the dismissal of modals
  const [displayedStack, setDisplayedStack] = useState(stack)
  const [skipAnimations, setSkipAnimations] = useState(false)
  const [isOpen, setOpen] = useState(false)

  useEffect(() => {
    // if we're opening the first modal
    if (stack.length === 1 && displayedStack.length === 0) {
      setOpen(true)
      setDisplayedStack(stack)
    } else {
      // else we are adding or dismissing a modal

      // if either the previous or current modal should skip animations
      const skipAnimations =
        stack?.[stack.length - 1]?.props?.skipAnimations ??
        displayedStack?.[displayedStack.length - 1]?.props?.skipAnimations

      if (skipAnimations) {
        setDisplayedStack(stack)
        setOpen(true)
        setSkipAnimations(true)
      } else {
        setSkipAnimations(false)
        setOpen(false)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stack])

  // after displayedStack has updated, check whether the current modal should skip animations
  // (incase we transitioned from an animated modal to a skipped animation modal)
  useEffect(() => {
    setSkipAnimations(
      displayedStack?.[displayedStack.length - 1]?.props?.skipAnimations
    )
  }, [displayedStack])

  return (
    <>
      <NoSSR>
        <Portal>
          <Transition
            show={stack.length > 0}
            className="fixed inset-0"
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            aria-hidden="true"
          >
            <div
              className="absolute inset-0 bg-gray-500 opacity-75"
              onClick={closeModal}
            ></div>
          </Transition>
        </Portal>
      </NoSSR>
      {displayedStack.map((modal, index) => {
        const open = index === displayedStack.length - 1 && isOpen

        function handleNextModal() {
          // set open state for next modal
          if (stack.length > 0) {
            setOpen(true)
          } else {
            setOpen(false)
          }

          // update displayed stack
          setDisplayedStack(stack)
        }
        return (
          <modal.component
            key={index}
            open={open}
            unmount
            hideBackdrop
            onClose={closeModal}
            afterLeave={() => {
              modal.props?.afterLeave?.()

              if (!skipAnimations) {
                handleNextModal()
              }
            }}
            beforeLeave={() => {
              modal.props?.beforeLeave?.()

              if (skipAnimations) {
                handleNextModal()
              }
            }}
            skipAnimations={skipAnimations}
            {...modal.props}
          />
        )
      })}
    </>
  )
}
