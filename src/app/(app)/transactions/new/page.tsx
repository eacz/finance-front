import { NewTransactionForm } from '@/modules/transactions'

export default function NewTransactionPage() {
  return (
    <div className='container-main grid grid-cols-1 justify-center items-center gap-2'>
      <h1 className='font-bold text-xl'>Create a new transaction</h1>
      <NewTransactionForm />
    </div>
  )
}

