'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Modal } from '@/components'
import { createCategory } from '@/actions'
import { IconSelector } from '../'
import { avalaibleIcons } from '@/utils'

interface FormInputs {
  name: string
  icon: avalaibleIcons
  description?: string
}

interface Props {
  token: string
}

export const CreateCategory = ({ token }: Props) => {
  const [isModalActive, setIsModalActive] = useState(false)
  const [error, setError] = useState('')
  const { register, handleSubmit, reset, setValue } = useForm<FormInputs>({
    defaultValues: { icon: 'other' },
  })

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
        <form className='flex flex-col mt-4 w-full gap-4' onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className='label mb-1 md:mb-0 pr-4'>Name</label>
            <input
              className='input'
              type='text'
              placeholder='...'
              {...register('name', { required: true })}
            />
          </div>
          <div className='mb-6'>
            <label className='label mb-1 md:mb-0 pr-4'>Icon</label>
            <div className='my-2' style={{ width: 'calc(100% - 3rem)' }}>
              <IconSelector setter={(value: avalaibleIcons) => setValue('icon', value)} />
            </div>
          </div>

          <div>
            <label className='label mb-1 md:mb-0 pr-4'>Description</label>
            <textarea className='textarea' placeholder='..........' {...register('description')} />
          </div>

          {error && <p className='text-danger text-center'>{error}</p>}

          <div className='flex justify-between mt-10'>
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
