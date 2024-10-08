import Link from 'next/link'
import { AuthWrapper } from '@/modules/auth'

export default function SignupPage() {
  return (
    <AuthWrapper title='Signup'>
      <form method='#' action='#' className='mt-10'>
        <div className='mt-7'>
          <input
            type='text'
            placeholder='Username'
            className='mt-1 p-2 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0'
          />
        </div>
        <div className='mt-7'>
          <input
            type='email'
            placeholder='Email'
            className='mt-1 p-2 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0'
          />
        </div>

        <div className='mt-7'>
          <input
            type='password'
            placeholder='Password'
            className='mt-1 p-2 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0'
          />
        </div>

        <div className='mt-7'>
          <button className='bg-secondary w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105'>
            Create account
          </button>
        </div>

        <div className='flex mt-7 items-center text-center'>
          <hr className='border-gray-300 border-1 w-full rounded-md' />
          <label className='block font-medium text-sm text-gray-600 w-full'>Or</label>
          <hr className='border-gray-300 border-1 w-full rounded-md' />
        </div>

        <div className='flex mt-7 justify-center w-full'>
          <button className='mr-5 bg-blue-500 border-none px-4 py-2 rounded-xl cursor-pointer text-white shadow-xl hover:shadow-inner transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105'>
            Facebook
          </button>

          <button className='bg-red-500 border-none px-4 py-2 rounded-xl cursor-pointer text-white shadow-xl hover:shadow-inner transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105'>
            Google
          </button>
        </div>

        <div className='mt-7'>
          <div className='flex justify-center items-center'>
            <label className='mr-2'>Already have an account?</label>
            <Link
              href='/auth/login'
              className=' text-blue-500 transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105'>
              Login
            </Link>
          </div>
        </div>
      </form>
    </AuthWrapper>
  )
}
