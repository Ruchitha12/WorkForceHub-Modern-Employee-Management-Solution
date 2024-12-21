import { Fragment, useEffect, useState } from 'react'
import Link from 'next/link'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/router'
import { useUser } from '../../lib/hooks'

function classNames (...classes) {
  return classes.filter(Boolean).join(' ')
}

export const Navbar = () => {
  const session = useUser()
  const router = useRouter()

  const hrNavigation = [
    {
      name: 'Dashboard',
      href: '/dashboard/hr'
    },
    {
      name: 'Timesheets',
      href: '/dashboard/hr/timesheets'
    },
    {
      name: 'Payroll',
      href: '/dashboard/hr/payroll'
    },
    {
      name: 'Employee',
      href: '/dashboard/hr/employee'
    },
    {
      name: 'Departments',
      href: '/dashboard/hr/departments'
    }
  ]

  const employeeNavigation = [
    {
      name: 'Dashboard',
      href: '/dashboard/employee'
    },
    {
      name: 'Payroll',
      href: '/dashboard/employee/payroll'
    },
    {
      name: 'Timesheets',
      href: '/dashboard/employee/timesheets'
    }
  ]

  const [navigation, setNavigation] = useState([])

  useEffect(() => {
    if (!session) setNavigation([])
    else if (session?.category === 'hr') setNavigation(hrNavigation)
    else if (session?.category === 'employee') setNavigation(employeeNavigation)
  }, [session])

  if (router.pathname.split('/').indexOf('auth') !== -1) return <></>

  return (
    <Disclosure
      as='nav'
      className='bg-white shadow fixed top-0 left-0 z-40 w-full '
    >
      {({ open }) => (
        <>
          <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
            <div className='flex h-16 justify-between'>
              <div className='flex'>
                <div className='-ml-2 mr-2 flex items-center md:hidden'>
                  {/* Mobile menu button */}
                  <Disclosure.Button className='relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'>
                    <span className='absolute -inset-0.5' />
                    <span className='sr-only'>Open main menu</span>
                    {open ? (
                      <XMarkIcon className='block h-6 w-6' aria-hidden='true' />
                    ) : (
                      <Bars3Icon className='block h-6 w-6' aria-hidden='true' />
                    )}
                  </Disclosure.Button>
                </div>
                <div className='flex flex-shrink-0 items-center'>
                  <Link href={'/'}>
                    <img
                      className='h-8 w-auto cursor-pointer'
                      src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600'
                      alt='Your Company'
                    />
                  </Link>
                </div>
                <div className='hidden md:ml-6 md:flex md:space-x-8'>
                  {/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
                  {navigation.map((option, index) => (
                    <Link
                      key={index}
                      href={option.href}
                      className={`${
                        router.asPath == option.href &&
                        'border-indigo-500 text-gray-900'
                      } inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium cursor-pointer`}
                    >
                      <span href={option.href}>{option.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
              <div className='flex items-center'>
                <div className='ml-4 flex flex-shrink-0 items-center'>
                  {/* Profile dropdown */}
                  {session ? (
                    <Menu as='div' className='relative ml-3'>
                      <div>
                        <Menu.Button className='relative flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'>
                          <span className='absolute -inset-1.5' />
                          <span className='sr-only'>Open user menu</span>
                          <img
                            className='h-8 w-8 rounded-full'
                            src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                            alt=''
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter='transition ease-out duration-200'
                        enterFrom='transform opacity-0 scale-95'
                        enterTo='transform opacity-100 scale-100'
                        leave='transition ease-in duration-75'
                        leaveFrom='transform opacity-100 scale-100'
                        leaveTo='transform opacity-0 scale-95'
                      >
                        <Menu.Items className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                          {/* <Menu.Item>
                          {({ active }) => (
                            <a
                              href='#'
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-gray-700'
                              )}
                            >
                              Your Profile
                            </a>
                          )}
                        </Menu.Item> */}
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href='/api/auth/logout'
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700'
                                )}
                              >
                                Log out
                              </a>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  ) : (
                    <>
                      <Link href='/auth/login'>
                        <button
                          type='button'
                          className='cursor-pointer relative inline-flex items-center gap-x-1.5 rounded-md bg-gray-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500'
                        >
                          Log In
                        </button>
                      </Link>
                      <Link href='/auth/signup'>
                        <button
                          type='button'
                          className='ml-4 cursor-pointer relative inline-flex items-center gap-x-1.5 rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500'
                        >
                          Sign up
                        </button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className='md:hidden'>
            <div className='space-y-1 pb-3 pt-2'>
              {/* Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" */}
              {navigation.map((option, index) => (
                <Link
                  key={index}
                  href={option.href}
                  className={`${
                    router.asPath == option.href &&
                    'bg-indigo-50 border-indigo-500 text-indigo-700'
                  } block border-l-4 py-2 pl-3 pr-4 text-base font-medium sm:pl-5 sm:pr-6 border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700`}
                >
                  {option.name}
                </Link>
              ))}
            </div>
            {session && (
              <div className='border-t border-gray-200 pb-3 pt-4'>
                <div className='flex items-center px-4 sm:px-6'>
                  <div className='flex-shrink-0'>
                    <img
                      className='h-10 w-10 rounded-full'
                      src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                      alt=''
                    />
                  </div>
                  <div className='ml-3'>
                    <div className='text-base font-medium text-gray-800'>
                      Tom Cook
                    </div>
                    <div className='text-sm font-medium text-gray-500'>
                      {session?.email}
                    </div>
                  </div>
                </div>
                <div className='mt-3 space-y-1'>
                  <Disclosure.Button
                    as='a'
                    href='/api/auth/logout'
                    className='block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800 sm:px-6'
                  >
                    Log out
                  </Disclosure.Button>
                </div>
              </div>
            )}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
