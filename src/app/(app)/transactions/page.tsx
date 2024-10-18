import { getTransactionsByUser } from '@/actions'
import { auth } from '@/auth.config'
import { TransactionFilter, TransactionsList } from '@/modules/transactions'
import { notFound } from 'next/navigation'

export default async function NamePage() {
  const session = await auth()

  const { ok, data } = await getTransactionsByUser(session?.user.token ?? '', { limit: 6 })

  if (!ok || !data) {
    notFound()
  }

  return (
    <div className='container-main grid grid-cols-1 md:grid-cols-3 gap-4'>
      <h2 className='font-bold text-lg'>Filter</h2>
      <h1 className='hidden md:block font-bold text-lg md:col-start-3'>Transactions</h1>
      <TransactionFilter />
      <h2 className='md:hidden font-bold text-lg md:col-start-3'>Transactions</h2>
      <TransactionsList transactions={data.transactions} showCurrency />
    </div>
  )
}
