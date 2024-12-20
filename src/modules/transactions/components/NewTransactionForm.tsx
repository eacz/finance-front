'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { createTransaction } from '@/actions'

import { Account } from '@/modules/account'
import { Category } from '@/modules/category'

interface FormInputs {
  title: string
  description?: string
  amount: number
  type: 'INCOME' | 'OUTCOME'
  account: number
  categoryId?: number
}

interface Props {
  accounts: Account[]
  categories: Category[]
  token: string
  fromAccount?: string
  fromCategory?: string
}

export const NewTransactionForm = ({ accounts, token, fromAccount, fromCategory, categories }: Props) => {
  const account = accounts.find((a) => a.id === Number(fromAccount))
  const category = categories.find((c) => c.id === Number(fromCategory))
  const { register, handleSubmit } = useForm<FormInputs>({
    defaultValues: {
      account: account ? account.id : undefined,
      categoryId: category ? category.id : undefined,
    },
  })
  const [error, setError] = useState('')
  const router = useRouter()

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setError('')

    const { ok, message } = await createTransaction(token, data)

    if (!ok) {
      setError(message)
      return
    }
    router.replace('/transactions')
  }

  return (
    <form className='flex flex-col mt-4' onSubmit={handleSubmit(onSubmit)}>
      <div className='flex flex-col md:flex-row w-full gap-2 justify-between mb-8'>
        <div className='w-full flex flex-col gap-4'>
          <div>
            <label className='label mb-1 md:mb-0 pr-4'>Title</label>
            <input
              className='input'
              id='inline-password'
              type='text'
              placeholder='Title'
              {...register('title', { required: true })}
            />
          </div>
          <div>
            <label className='label mb-1 md:mb-0 pr-4'>Amount</label>
            <input
              className='input'
              id='inline-password'
              type='number'
              placeholder='100.00'
              {...register('amount', { required: true, min: 1 })}
            />
          </div>
        </div>

        <div className='w-full'>
          <label className='label mb-1 md:mb-0 pr-4'>Description</label>
          <textarea className='textarea' id='' {...register('description')}></textarea>
        </div>
      </div>

      <div className='flex flex-col md:flex-row w-full gap-2 just mb-4'>
        <div className='w-full'>
          <label className='label' htmlFor=''>
            Type
          </label>
          <select className='select' {...register('type', { required: true })}>
            <option value=''>-Select-</option>
            <option value='INCOME'>Income</option>
            <option value='OUTCOME'>Outcome</option>
          </select>
        </div>
        <div className='w-full'>
          <label className='label' htmlFor=''>
            Account
          </label>
          <select className='select' {...register('account', { required: true, valueAsNumber: true })}>
            {accounts.map((account) => (
              <option key={account.id} value={account.id}>
                {account.currency.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {categories && (
        <div className='flex gap-2'>
          <div className='flex-1'>
            <label className='label' htmlFor=''>
              Category
            </label>
            <select className='select' {...register('categoryId', { valueAsNumber: true })}>
              <option value='0'>---</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className='flex-1' />
        </div>
      )}

      {error && <p className='text-danger font-bold mt-2 text-end'>{error}</p>}

      <div className='flex justify-end gap-2'>
        <button className='btn-info' onClick={() => router.back()}>
          Cancel
        </button>
        <button className='btn-primary' type='submit'>
          Save
        </button>
      </div>
    </form>
  )
}
