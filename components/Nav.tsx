import clsx from 'clsx'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { HTMLProps, useEffect, useState } from 'react'
import { BellOutline, MenuOutline, XOutline } from 'heroicons-react'
import Popover from 'components/Popover'
import { AnimatePresence, motion } from 'framer-motion'

export default function Nav() {
  const router = useRouter()
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  useEffect(() => {
    setShowMobileMenu(false)
  }, [router.pathname])

  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="border-b border-gray-700">
          <div className="flex items-center justify-between h-16 px-4 sm:px-0">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <img
                  className="w-8 h-8"
                  src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                  alt="Workflow"
                />
              </div>
              <div className="hidden md:block">
                <div className="flex items-baseline ml-10 space-x-4">
                  <NavLink href="/">Dashboard</NavLink>
                  <NavLink href="/team">Team</NavLink>
                  <NavLink href="/projects">Projects</NavLink>
                  <NavLink href="/calendar">Calendar</NavLink>
                  <NavLink href="/reports">Reports</NavLink>
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="flex items-center ml-4 md:ml-6">
                <button className="p-1 text-gray-400 bg-gray-800 rounded-full hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                  <span className="sr-only">View notifications</span>
                  <BellOutline className="w-6 h-6" />
                </button>
                {/* Profile dropdown */}
                <Popover>
                  <Popover.Button
                    as="button"
                    id="user-menu"
                    className="flex items-center max-w-xs ml-3 text-sm bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                  >
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="w-8 h-8 rounded-full"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixqx=3C0cj2Tg1n&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt="Tom Cook"
                    />
                  </Popover.Button>
                  <Popover.Panel
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu"
                  >
                    <a
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Your Profile
                    </a>
                    <a
                      href="/settings"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Settings
                    </a>
                    <a
                      href="/signout"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Sign out
                    </a>
                  </Popover.Panel>
                </Popover>
              </div>
            </div>
            <div className="flex -mr-2 md:hidden">
              {/* Mobile menu button */}
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 text-gray-400 bg-gray-800 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded={showMobileMenu}
              >
                <span className="sr-only">Open main menu</span>
                {showMobileMenu ? (
                  <XOutline
                    className="block w-6 h-6"
                    onClick={() => setShowMobileMenu(false)}
                  />
                ) : (
                  <MenuOutline
                    className="block w-6 h-6"
                    onClick={() => setShowMobileMenu(true)}
                  />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      <AnimatePresence initial={false}>
        {showMobileMenu && (
          <motion.div
            className="overflow-hidden border-b border-gray-700 md:hidden"
            id="mobile-menu"
            animate={{
              height: `auto`,
            }}
            initial={{ height: 0 }}
            exit={{ height: 0 }}
            transition={{
              ease: `easeInOut`,
              duration: 0.3,
            }}
          >
            <div className="px-2 py-3 space-y-1 sm:px-3">
              <NavLink href="/" className="block px-3 py-2">
                Dashboard
              </NavLink>
              <NavLink href="/team" className="block px-3 py-2">
                Team
              </NavLink>
              <NavLink href="/projects" className="block px-3 py-2">
                Projects
              </NavLink>
              <NavLink href="/calendar" className="block px-3 py-2">
                Calendar
              </NavLink>
              <NavLink href="/reports" className="block px-3 py-2">
                Reports
              </NavLink>
            </div>
            <div className="pt-4 pb-3 border-t border-gray-700">
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  <img
                    className="w-10 h-10 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixqx=3C0cj2Tg1n&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium leading-none text-white">
                    Tom Cook
                  </div>
                  <div className="text-sm font-medium leading-none text-gray-400">
                    tom@example.com
                  </div>
                </div>
                <button className="flex-shrink-0 p-1 ml-auto text-gray-400 bg-gray-800 rounded-full hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                  <span className="sr-only">View notifications</span>
                  <BellOutline
                    className="w-6 h-6"
                    aria-hidden={!showMobileMenu}
                  />
                </button>
              </div>
              <div className="px-2 mt-3 space-y-1">
                <a
                  href="#"
                  className="block px-3 py-2 text-base font-medium text-gray-400 rounded-md hover:text-white hover:bg-gray-700"
                >
                  Your Profile
                </a>
                <a
                  href="#"
                  className="block px-3 py-2 text-base font-medium text-gray-400 rounded-md hover:text-white hover:bg-gray-700"
                >
                  Settings
                </a>
                <a
                  href="#"
                  className="block px-3 py-2 text-base font-medium text-gray-400 rounded-md hover:text-white hover:bg-gray-700"
                >
                  Sign out
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

function NavLink({ href, ...props }: HTMLProps<HTMLAnchorElement>) {
  const router = useRouter()

  return (
    <Link href={href}>
      <a
        {...props}
        className={clsx(
          `px-3 py-2 text-sm font-medium rounded-md`,
          router.pathname === href
            ? `bg-gray-900 text-white`
            : `text-gray-300 hover:bg-gray-700 hover:text-white`,
          props.className
        )}
      />
    </Link>
  )
}
