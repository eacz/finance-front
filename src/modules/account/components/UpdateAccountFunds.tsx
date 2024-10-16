'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'

import { updateAccountFunds } from '@/actions'
import { Modal } from '@/components'

interface Props {
  funds: number
  accountId: number
  token?: string
  currencyCode?: string
}

export const UpdateAccountFunds = ({ funds, accountId, token = '', currencyCode }: Props) => {
  const [isModalActive, setIsModalActive] = useState(false)
  const [error, setError] = useState('')
  const [newFunds, setNewFunds] = useState(funds)

  const router = useRouter()

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    const { ok, message } = await updateAccountFunds(token, { amount: newFunds, accountId })
    if (!ok) {
      setError(message)
    }
    setError('')
    setNewFunds(0)
    setIsModalActive(false)
    router.refresh()
  }

  return (
    <div className='my-2'>
      <button onClick={() => setIsModalActive(true)} className='btn-primary'>
        Update account funds
      </button>

      <Modal
        active={isModalActive}
        setActive={(value: boolean) => setIsModalActive(value)}
        title={`Update ${currencyCode} Acount Funds`}>
        <form className='w-full mt-5' onSubmit={handleSubmit}>
          <div className='md:flex md:items-center mb-6'>
            <div className='md:w-1/3'>
              <label className='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4'>
                Current Funds
              </label>
            </div>
            <div className='md:w-2/3'>
              <input
                className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
                id='inline-full-name'
                disabled
                type='number'
                value={funds}
              />
            </div>
          </div>
          <div className='md:flex md:items-center mb-6'>
            <div className='md:w-1/3'>
              <label className='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4'>
                New Funds Amount
              </label>
            </div>
            <div className='md:w-2/3'>
              <input
                className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
                id='inline-password'
                type='number'
                placeholder='100.00'
                value={newFunds}
                onChange={(e) => setNewFunds(Number(e.target.value))}
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
    </div>
  )
}
