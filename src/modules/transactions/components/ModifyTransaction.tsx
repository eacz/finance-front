'use client'
import { useSession } from 'next-auth/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useState } from 'react'

import { Modal } from '@/components'
import { useRouter } from 'next/navigation'
import { Transaction } from '../interfaces/transaction'
import { modifyTransaction } from '@/actions'

interface FormInputs {
  title?: string
  description?: string
}

interface Props {
  transaction: {
    id: number
    type: string
    title: string
    description: string
    amount: number
    createdAt: Date
    updatedAt: Date
  }
}

export const ModifyTransaction = ({ transaction }: Props) => {
  const [isModalActive, setIsModalActive] = useState(false)
  const [error, setError] = useState('')
  const { data: session } = useSession()
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { isDirty },
  } = useForm<FormInputs>({
    defaultValues: { description: transaction.description, title: transaction.title },
  })

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    const { ok, message } = await modifyTransaction(session?.user.token ?? '', {
      id: transaction.id,
      ...data,
    })
    if (!ok) {
      return setError(message)
    }

    setIsModalActive(false)
    router.refresh()
  }

  return (
    <>
      <button className='btn-primary' onClick={() => setIsModalActive(true)}>
        Modify transaction
      </button>
      <Modal
        active={isModalActive}
        setActive={(value: boolean) => setIsModalActive(value)}
        title={`Modify transaction`}>
        <form className='flex flex-col mt-4 w-full gap-4' onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className='label mb-1 md:mb-0 pr-4'>Title</label>
            <input
              className='input'
              id='inline-password'
              type='text'
              placeholder='Title'
              {...register('title')}
            />
          </div>
          <div>
            <label className='label mb-1 md:mb-0 pr-4'>Description</label>
            <textarea
              className='textarea'
              id='inline-password'
              placeholder='Description'
              {...register('description')}
            />
          </div>

          {error && <p className='text-danger text-center'>{error}</p>}

          <div className='flex justify-between mt-10'>
            <button className='btn-info' type='button' onClick={() => setIsModalActive(false)}>
              Cancel
            </button>
            <button
              className={`${isDirty ? 'btn-primary' : 'btn-disabled'}`}
              type='submit'
              disabled={!isDirty}>
              Save
            </button>
          </div>
        </form>
      </Modal>
    </>
  )
}
