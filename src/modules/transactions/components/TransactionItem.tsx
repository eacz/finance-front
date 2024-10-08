import clsx from 'clsx'
import { Transaction } from '../interfaces/transaction'
import { currencyFormat, hourFormat } from '@/utils'
import Link from 'next/link'

interface Props {
  transaction: Transaction
  showCurrency?: boolean
}

export const TransactionItem = ({ transaction, showCurrency }: Props) => {
  return (
    <li>
      <Link href={`/transactions/${transaction.id}`}>
        <div className='px-4 py-4 sm:px-6'>
          <div className='flex items-center justify-between'>
            <h3 className='leading-6  text-gray-900'>{transaction.title}</h3>
            <p
              className={clsx('mt-1 max-w-2xl text-sm', {
                'text-green-500 font-bold': transaction.type === 'INCOME',
              })}>
              {transaction.type === 'INCOME' ? '+' : '-'} {currencyFormat(transaction.amount)}
            </p>
          </div>
          <div className='mt-4 flex items-center justify-between'>
            <p className='text-sm font-medium text-gray-500'>
              {showCurrency && <span className='text-green-600'>{transaction.currency.code}</span>}
            </p>
            <span className='font-light text-gray-500 '>{hourFormat(transaction.createdAt)}</span>
          </div>
        </div>
        <div className='w-full h-0.5 bg-gray-200 rounded' />
      </Link>
    </li>
  )
}
