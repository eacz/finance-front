'use client'

import { Account } from '@/modules/account'
import { SubmitHandler, useForm } from 'react-hook-form'

interface FormInputs {
  title: string
  description?: string
  amount: number
  type: 'INCOME' | 'OUTCOME'
  account: number
}

interface Props {
  accounts: Account[]
}

export const NewTransactionForm = ({ accounts }: Props) => {
  const { register, handleSubmit } = useForm<FormInputs>()

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    console.log(data)
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

      <div className='flex justify-end gap-2'>
        <button className='btn-info'>Cancel</button>
        <button className='btn-primary' type='submit'>
          Save
        </button>
      </div>
    </form>
  )
}
