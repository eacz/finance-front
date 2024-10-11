'use client'

import Link from 'next/link'
import { SubmitHandler, useForm } from 'react-hook-form'

import { login } from '@/actions'

interface FormInputs {
  email: string
  password: string
}

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({})

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    const { email, password } = data

    const { ok } = await login(email.toLowerCase(), password)
    if(ok){
      window.location.replace('/')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='mt-10'>
      {/*TODO: create custom input component*/}
      <div>
        <input
          type='email'
          placeholder='Email'
          className='input'
          {...register('email', { required: true, minLength: 8 })}
        />
        {errors.email && <p className='text-red-500 mt-2'>Invalid email</p>}
      </div>

      <div className='mt-7'>
        <input
          type='password'
          placeholder='Password'
          className='input'
          {...register('password', { required: true, minLength: 6 })}
        />
        {errors.password && <p className='text-red-500 mt-2'>Password should have at least 6 characters</p>}
      </div>

      <div className='mt-7'>
        <button type='submit' className='btn-primary w-full'>
          Login
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
          <label className='mr-2'>New here?</label>
          <Link
            href='/auth/signup'
            className='blue-link'>
            Create an account
          </Link>
        </div>
      </div>
    </form>
  )
}
