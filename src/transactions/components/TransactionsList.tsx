import { transactions } from '@/data/testdata'
import React from 'react'
import { TransactionItem } from './TransactionItem'

export const TransactionsList = () => {
  return (
    <ul className='shadow overflow-hidden sm:rounded-md w-full md:col-start-2 md:col-end-4'>
      {transactions.map((transaction) => (
        <TransactionItem transaction={transaction} showCurrency key={transaction.id} />
      ))}
    </ul>
  )
}
