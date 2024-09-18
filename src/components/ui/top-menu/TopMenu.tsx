import { Fragment } from 'react'
import { MenuItem } from './MenuItem'
import { ThreeDots } from './ThreeDots'

const menuItems = [
  { href: '/', name: 'Home' },
  { href: '/transactions', name: 'Transactions' },
  { href: '/accounts', name: 'Accounts' },
  { href: '/profile', name: 'Profile' },
]

export const TopMenu = () => {
  return (
    <div className=''>
      <nav className='relative px-4 py-4 flex justify-between items-center bg-white'>
        <img
          className='w-10 h-10 rounded-full'
          src='https://avatars.githubusercontent.com/u/56123207?v=4'
          alt='Rounded avatar'
        />
        <div className='lg:hidden'>
          <button className='navbar-burger flex items-center text-blue-600 p-3'>
            <svg
              className='block h-4 w-4 fill-current'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'>
              <title>Mobile menu</title>
              <path d='M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z'></path>
            </svg>
          </button>
        </div>
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
        <a
          className='hidden lg:inline-block lg:ml-auto lg:mr-3 py-2 px-6 bg-gray-50 hover:bg-gray-100 text-sm text-gray-900 font-bold  rounded-xl transition duration-200'
          href='#'>
          Sign In
        </a>
        <a
          className='hidden lg:inline-block py-2 px-6 bg-blue-500 text-sm text-white font-bold rounded-xl bg-secondary hover:shadow-inner focus:outline-none transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105'
          href='#'>
          Sign up
        </a>
      </nav>
      {/* Mobile Menu */}
      <div className='navbar-menu relative z-50 hidden'>
        <div className='navbar-backdrop fixed inset-0 bg-gray-800 opacity-25'></div>
        <nav className='fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-white border-r overflow-y-auto'>
          <div className='flex items-center mb-8'>
            <a className='mr-auto text-3xl font-bold leading-none' href='#'>
              <img
                className='w-10 h-10 rounded-full'
                src='https://avatars.githubusercontent.com/u/56123207?v=4'
                alt='Rounded avatar'
              />
            </a>
            <button className='navbar-close'>
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
                <MenuItem key={item.name} name={item.name} href={item.href} mobile />
              ))}
            </ul>
          </div>
          <div className='mt-auto'>
            <div className='pt-6'>
              <a
                className='block px-4 py-3 mb-3 leading-loose text-xs text-center font-semibold bg-gray-50 hover:bg-gray-100 rounded-xl'
                href='#'>
                Sign in
              </a>
              <a
                className='block px-4 py-3 mb-2 leading-loose text-xs text-center text-white font-semibold bg-blue-600 hover:bg-blue-700  rounded-xl '
                href='#'>
                Sign Up
              </a>
            </div>
            <p className='my-4 text-xs text-center text-gray-400'>
              <span>Copyright © 2021</span>
            </p>
          </div>
        </nav>
      </div>
    </div>
  )
}
