'use client'

import { Fragment, useState } from 'react'
import Image from 'next/image'
import clsx from 'clsx'

import { MenuItem, ThreeDots } from '../../'
import { useParams, usePathname, useRouter } from 'next/navigation'

const menuItems = [
  { href: '/', name: 'Home' },
  { href: '/transactions', name: 'Transactions' },
  { href: '/accounts', name: 'Accounts' },
  { href: '/categories', name: 'Categories' },
  { href: '/profile', name: 'Profile' },
]

export const TopMenu = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const params = useParams()

  const goToNewTransactionPage = () => {
    if (pathname.includes('accounts') && params?.id) {
      return router.push(`/transactions/new?fromAccount=${params.id}`)
    }
    router.push(`/transactions/new`)
  }

  return (
    <div className='shadow'>
      <nav className='relative px-4 py-4 flex justify-between items-center bg-white'>
        <Image
          width={40}
          height={40}
          className='w-10 h-10 rounded-full hidden lg:block'
          src='https://avatars.githubusercontent.com/u/56123207?v=4'
          alt='Rounded avatar'
        />
        <button
          className='navbar-burger flex items-center text-blue-600 p-3 lg:hidden'
          onClick={() => setIsMobileMenuOpen(true)}>
          <svg className='block h-4 w-4 fill-current' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
            <title>Mobile menu</title>
            <path d='M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z'></path>
          </svg>
        </button>

        <div className='lg:hidden'></div>

        <ul className='hidden absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 lg:flex lg:mx-auto lg:items-center lg:w-auto lg:space-x-6'>
          {menuItems.map((item, index) => {
            if (index !== menuItems.length - 1) {
              return (
                <Fragment key={item.name}>
                  <MenuItem name={item.name} href={item.href} />
                  <ThreeDots />
                </Fragment>
              )
            }
            return <MenuItem key={item.name} name={item.name} href={item.href} />
          })}
        </ul>

        <button className='btn-primary' onClick={() => goToNewTransactionPage()}>
          Create Transaction
        </button>
      </nav>
      {/* Mobile Menu */}
      <div
        className={clsx('navbar-menu relative z-50 transition-all duration-300 ease-in-out ', {
          hidden: !isMobileMenuOpen,
        })}>
        <div
          className='navbar-backdrop fixed inset-0 bg-gray-800 opacity-25'
          onClick={() => setIsMobileMenuOpen(false)}
        />
        <nav className='fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-white border-r overflow-y-auto '>
          <div className='flex items-center mb-8'>
            <a className='mr-auto text-3xl font-bold leading-none' href='#'>
              <Image
                width={40}
                height={40}
                className='w-10 h-10 rounded-full'
                src='https://avatars.githubusercontent.com/u/56123207?v=4'
                alt='Rounded avatar'
              />
            </a>
            <button className='navbar-close' onClick={() => setIsMobileMenuOpen(false)}>
              <svg
                className='h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-500'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M6 18L18 6M6 6l12 12'></path>
              </svg>
            </button>
          </div>
          <div>
            <ul>
              {menuItems.map((item) => (
                <MenuItem
                  key={item.name}
                  name={item.name}
                  href={item.href}
                  mobile
                  onClick={() => setIsMobileMenuOpen(false)}
                />
              ))}
            </ul>
          </div>
          <div className='mt-auto'>
            <div className='pt-6'></div>
            <p className='my-4 text-xs text-center text-gray-400'>
              <span>Copyright © 2024</span>
            </p>
          </div>
        </nav>
      </div>
    </div>
  )
}
