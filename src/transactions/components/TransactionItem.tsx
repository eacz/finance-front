import clsx from 'clsx'
import { Transaction } from '../interfaces/transaction'
import { currencyFormat } from '@/utils'
import { hourFormat } from '@/utils/hourFormat'

interface Props {
  transaction: Transaction
}

export const TransactionItem = ({ transaction }: Props) => {
  return (
    <li>
      <div className='px-4 py-5 sm:px-6'>
        <div className='flex items-center justify-between'>
          <h3 className='leading-6  text-gray-900'>{transaction.title}</h3>
          <p className={clsx('mt-1 max-w-2xl text-sm', { 'text-green-500 font-bold': transaction.type === 'INCOME' })}>
          {transaction.type === 'INCOME' ? '+' : '-'}  {currencyFormat(transaction.amount)}
          </p>
        </div>
        <div className='mt-4 flex items-center justify-between'>
          <p className='text-sm font-medium text-gray-500'>
            {/*Status: <span className='text-green-600'>Active</span>*/}
          </p>
          <span  className='font-light text-gray-500 '>
            {hourFormat(transaction.createdAt)}
          </span>
        </div>
      </div>
    </li>
  )
}
