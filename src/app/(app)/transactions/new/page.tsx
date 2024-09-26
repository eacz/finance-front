import { NewTransactionForm } from '@/transactions'

export default function NewTransactionPage() {
  return (
    <div className='grid grid-cols-1 justify-center items-center gap-2 my-2 mx-2 bg-white mt-5 p-4 rounded'>
      <h1 className='font-bold text-xl'>Create a new transaction</h1>
      <NewTransactionForm />
    </div>
  )
}

