'use client'

import { SubmitHandler, useForm } from 'react-hook-form'

import { getAccountsByUserResponse } from '@/modules/account/interfaces/get-accounts-by-user.response'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Category } from '@/modules/category'

interface FormInputs {
  textFilter: string
  account: number
  category?: number
}

interface Props {
  accounts: getAccountsByUserResponse[] | undefined
  categories: Category[]
}

export const TransactionFilter = ({ accounts, categories }: Props) => {
  const { register, handleSubmit, reset } = useForm<FormInputs>()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()

  const onSubmit: SubmitHandler<FormInputs> = async (data: any) => {
    const params = new URLSearchParams(searchParams)

    Object.keys(data).forEach((field) => {
      //page params is deleted because I don't know the amount of pages with the new filter
      params.delete('page')
      if (data[field]) {
        params.set(field, data[field])
      } else {
        params.delete(field)
      }
    })
    router.push(`${pathname}?${params.toString()}`)
  }

  const onClear = () => {
    reset()
    router.push(pathname)
  }

  return (
    <form className='flex flex-col gap-3' onSubmit={handleSubmit(onSubmit)}>
      <div className=''>
        <input type='text' placeholder='Search something...' className='input' {...register('textFilter')} />
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
        {categories && (
          <div className='flex flex-col w-full'>
            <label htmlFor=''>Category</label>
            <select className='select' {...register('category', { valueAsNumber: true })}>
              <option value='0'>All</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
      <div className='flex justify-between mt-10'>
        <button className='btn-info' type='button' onClick={() => onClear()}>
          Clear Filter
        </button>
        <button className='btn-primary' type='submit'>
          Search
        </button>
      </div>
    </form>
  )
}
