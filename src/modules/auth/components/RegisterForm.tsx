'use client'

import Link from 'next/link'
import { SubmitHandler, useForm } from 'react-hook-form'

import { countries } from '@/data/countries'
import { login, signup } from '@/actions'
import { useState } from 'react'

interface FormInputs {
  username: string
  email: string
  firstName: string
  lastName: string
  password: string
  country: string
}

export const RegisterForm = () => {
  const { register, handleSubmit } = useForm<FormInputs>()
  const [error, setError] = useState('')

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    const { ok } = await signup(data)
    if (!ok) {
      setError("Couldn't login")
      return
    }
    await login(data.email, data.password)
    window.location.replace('/')
  }

  return (
    <form className='mt-10 flex flex-col' onSubmit={handleSubmit(onSubmit)}>
      <div className='flex gap-3'>
        <input
          type='text'
          placeholder='FirstName'
          className='input mb-4'
          {...register('firstName', { required: true })}
        />
        <input
          type='text'
          placeholder='LastName'
          className='input mb-4'
          {...register('lastName', { required: true })}
        />
      </div>
      <div className='flex gap-3'>
        <input
          type='text'
          placeholder='Username'
          className='input mb-4'
          {...register('username', { required: true, minLength: 4 })}
        />
        <input
          type='email'
          placeholder='Email'
          className='input mb-4'
          {...register('email', { required: true })}
        />
      </div>

      <div className='flex gap-3'>
        <input
          type='password'
          placeholder='Password'
          className='input mb-4'
          {...register('password', { required: true, minLength: 6 })}
        />

        <select
          className='select mb-4'
          {...register('country', { required: true })}>
          <option value=''>[ Select ]</option>
          {countries.map((country) => (
            <option key={country.id} value={country.id}>
              {country.name}
            </option>
          ))}
        </select>
      </div>
      <div className='mt-7'>
        <button className='btn-primary w-full'>Create account</button>
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
            className='blue-link'>
            Login
          </Link>
        </div>
      </div>
    </form>
  )
}
