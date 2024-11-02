'use client'
import { useSession } from 'next-auth/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useState } from 'react'

import { Modal } from '@/components'
import { useRouter } from 'next/navigation'
import { modifyCategory } from '@/actions'

interface FormInputs {
  name: string
  description?: string
}

interface Props {
  category: {
    id: number
    name: string
    description?: string
  }
}

export const ModifyCategory = ({ category }: Props) => {
  const [isModalActive, setIsModalActive] = useState(false)
  const [error, setError] = useState('')
  const { data: session } = useSession()
  const token = session?.user.token ?? ''

  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { isDirty },
  } = useForm<FormInputs>({
    defaultValues: {
      description: category.description ?? undefined,
      name: category.name,
    },
  })

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    const { ok, message } = await modifyCategory(token, { id: category.id, ...data })

    if (!ok) {
      return setError(message)
    }

    setError('')
    setIsModalActive(false)
    router.refresh()
  }

  return (
    <>
      <button className='btn-primary' onClick={() => setIsModalActive(true)}>
        Modify category
      </button>
      <Modal
        active={isModalActive}
        setActive={(value: boolean) => setIsModalActive(value)}
        title={`Modify category '${category.name}'`}>
        <form className='flex flex-col mt-4 w-full gap-4' onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className='label mb-1 md:mb-0 pr-4'>Title</label>
            <input className='input' type='text' placeholder='Name' {...register('name')} />
          </div>
          <div>
            <label className='label mb-1 md:mb-0 pr-4'>Description</label>
            <textarea className='textarea' placeholder='Description' {...register('description')} />
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
