import React from 'react'
import { TransactionItem } from './TransactionItem'
import { Transaction } from '../interfaces/transaction'

interface Props {
  transactions: Transaction[]
}

export const TransactionsList = ({ transactions }: Props) => {
  return (
    <ul className=' overflow-hidden sm:rounded-md w-full md:col-start-2 md:col-end-4'>
      {transactions.map((transaction) => (
        <TransactionItem transaction={transaction} showCurrency key={transaction.id} />
      ))}
    </ul>
  )
}
