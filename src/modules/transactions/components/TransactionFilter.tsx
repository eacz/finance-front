'use client'

import { getAccountsByUserResponse } from '@/modules/account/interfaces/get-accounts-by-user.response'
import { SubmitHandler, useForm } from 'react-hook-form'

interface FormInputs {
  textFilter: string
  account: number
}

interface Props {
  accounts: getAccountsByUserResponse[] | undefined
}
export const TransactionFilter = ({ accounts }: Props) => {
  const { register, handleSubmit, reset } = useForm<FormInputs>()

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    console.log(data)
  }

  return (
    <form className='flex flex-col gap-3' onSubmit={handleSubmit(onSubmit)}>
      <div className='flex flex-row gap-2 w-full h-10'>
        <div className='flex rounded-md overflow-hidden w-full'>
          <input
            type='text'
            className='w-full rounded-md rounded-r-none border-small'
            {...register('textFilter')}
          />
          <button className='bg-secondary text-white px-4 font-semibold py-2 rounded-r-md '>Go</button>
        </div>
        <button className='btn-info' type='button' onClick={() => reset()}>
          Clear
        </button>
      </div>
      <div className='flex flex-col md:flex-row gap-4 justify-center items-center'>
        {accounts && (
          <div className='flex flex-col w-full'>
            <label htmlFor=''>Account</label>
            <select className='select' {...register('account')}>
              <option value=''>All</option>
              {accounts.map((account) => (
                <option key={account.id} value={account.id}>
                  {account.currency.name}
                </option>
              ))}
            </select>
          </div>
        )}
        <div className='flex flex-col w-full'>
          <label htmlFor=''>Category</label>
          <select disabled className='select'>
            <option>All </option>
            <option>Clothes</option>
            <option>Food</option>
          </select>
        </div>
      </div>
    </form>
  )
}
