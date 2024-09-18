import { transactions } from '@/data/testdata'
import React from 'react'
import { TransactionItem } from './TransactionItem'

export const TransactionsList = () => {
  return (
    <ul className='bg-white shadow overflow-hidden sm:rounded-md max-w-md mx-auto mt-16'>
      {transactions.map((transaction) => (
        <TransactionItem transaction={transaction} key={transaction.id} />
      ))}
    </ul>
  )
}
