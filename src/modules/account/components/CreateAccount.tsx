'use client';

import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Modal } from '@/components'
import { getAccountsByUserResponse } from '../interfaces/get-accounts-by-user.response';
import { Currency } from '@/modules/currency';

interface FormInputs {
  funds: number
  currency: number
}

interface Props {
  accounts: getAccountsByUserResponse[]
  currencies: Currency[]
}

export const CreateAccount = ({}: Props) => {
  const [isModalActive, setIsModalActive] = useState(false)
  const [error, setError] = useState('')
  const { register, handleSubmit, reset } = useForm<FormInputs>()

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    console.log(data);
    
    setError('')
  }

  return (
    <>
      <div className='flex justify-center items-center'>
        <button
          type='button'
          className='text-xl font-medium btn-primary'
          onClick={() => setIsModalActive(true)}>
          Create new account
        </button>
      </div>

      <Modal
        active={isModalActive}
        setActive={(value: boolean) => setIsModalActive(value)}
        title={`Create new account`}>
        <form className='w-full mt-5' onSubmit={handleSubmit(onSubmit)}>
          <div className='md:flex md:items-center mb-6'>
            <div className='md:w-1/3'>
              <label className='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4'>Name</label>
            </div>
            <div className='md:w-2/3'>
              <input
                className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
                type='number'
                placeholder='...'
                {...register('funds', { required: true })}
              />
            </div>
          </div>
          <div className='md:flex md:items-center mb-6'>
            <div className='md:w-1/3'>
              <label className='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4'>
                Description
              </label>
            </div>
            <div className='md:w-2/3'>
              <select className='select' {...register('currency', { required: true })}>
                <option value="">--- Select ---</option>
              </select>
            </div>
          </div>

          {error && <p className='text-danger text-center'>{error}</p>}

          <div className='flex justify-end gap-2'>
            <button onClick={() => setIsModalActive(false)} className='btn-info'>
              Cancel
            </button>
            <button className='btn-primary'>Save</button>
          </div>
        </form>
      </Modal>
    </>
  )
}
