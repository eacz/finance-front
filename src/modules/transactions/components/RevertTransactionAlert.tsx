'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'

import { revertTransaction } from '@/actions'
import { Modal } from '@/components'
import { useRouter } from 'next/navigation'

interface Props {
  transactionId: number
}

export const RevertTransactionAlert = ({ transactionId }: Props) => {
  const [isModalActive, setIsModalActive] = useState(false)
  const { data: session } = useSession()
  const router = useRouter()

  const [error, setError] = useState('')

  const onRevertTransaction = async () => {
    const { ok, message, data } = await revertTransaction(session?.user.token ?? '', transactionId)
    if (!ok || !data) {
      setError(message)
    }
    router.push(`/transactions/${data?.id}`)
  }

  return (
    <>
      <button className='btn-danger' onClick={() => setIsModalActive(true)}>
        Revert transaction
      </button>

      <Modal
        active={isModalActive}
        setActive={(value: boolean) => setIsModalActive(value)}
        title={`Are you sure you want to revert this transaction?`}>
        <div className='flex flex-col w-full'>
          {error && <p className='text-danger text-center'>{error}</p>}

          <div className='flex justify-between mt-10'>
            <button className='btn-info' onClick={() => setIsModalActive(false)}>
              Cancel
            </button>
            <button className='btn-primary' onClick={() => onRevertTransaction()}>
              Confirm
            </button>
          </div>
        </div>
      </Modal>
    </>
  )
}
