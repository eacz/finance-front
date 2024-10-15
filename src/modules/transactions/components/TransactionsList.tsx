import React from 'react'
import { TransactionItem } from './TransactionItem'
import { Transaction } from '../interfaces/transaction'

interface Props {
  transactions: Transaction[]
  showCurrency?: boolean
}

export const TransactionsList = ({ transactions, showCurrency = false }: Props) => {
  return (
    <ul className=' overflow-hidden sm:rounded-md w-full md:col-start-2 md:col-end-4'>
      {transactions.map((transaction) => (
        <TransactionItem transaction={transaction} showCurrency={showCurrency} key={transaction.id} />
      ))}
    </ul>
  )
}
