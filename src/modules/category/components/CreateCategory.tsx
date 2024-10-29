'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Modal } from '@/components'
import { createCategory } from '@/actions'

interface FormInputs {
  name: string
  description?: string
}

interface Props {
  token: string
}

export const CreateCategory = ({ token }: Props) => {
  const [isModalActive, setIsModalActive] = useState(false)
  const [error, setError] = useState('')
  const { register, handleSubmit, reset } = useForm<FormInputs>()

  const router = useRouter()

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {

    const { ok, message } = await createCategory(token, data)
    if (!ok) {
      setError(message)
    }
    setError('')
    setIsModalActive(false)
    reset()
    router.refresh()
  }

  return (
    <>
      <div className='flex justify-center items-center'>
        <button
          type='button'
          className='text-xl font-medium btn-primary'
          onClick={() => setIsModalActive(true)}>
          Create new category
        </button>
      </div>

      <Modal
        active={isModalActive}
        setActive={(value: boolean) => setIsModalActive(value)}
        title={`Create new category`}>
        <form className='w-full mt-5' onSubmit={handleSubmit(onSubmit)}>
          <div className='md:flex md:items-center mb-6'>
            <div className='md:w-1/3'>
              <label className='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4'>Name</label>
            </div>
            <div className='md:w-2/3'>
              <input
                className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
                type='text'
                placeholder='...'
                {...register('name', { required: true })}
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
              <textarea
                className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
                placeholder='..........'
                {...register('description')}
              />
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
