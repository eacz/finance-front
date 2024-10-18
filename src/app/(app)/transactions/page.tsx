import { getTransactionsByUser } from '@/actions'
import { auth } from '@/auth.config'
import { Pagination } from '@/components'
import { TransactionFilter, TransactionsList } from '@/modules/transactions'
import { notFound } from 'next/navigation'

interface Props {
  searchParams: {
    page?: string
  }
}

export default async function TransactionsPage({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1
  const transactionsPerPage = 6
  const offset = (page - 1) * transactionsPerPage
  const session = await auth()

  const { ok, data } = await getTransactionsByUser(session?.user.token ?? '', {
    limit: transactionsPerPage,
    offset,
  })

  if (!ok || !data) {
    notFound()
  }

  const totalPages = Math.ceil(data.total / transactionsPerPage)

  return (
    <div className='container-main grid grid-cols-1 md:grid-cols-3 gap-4'>
      <h2 className='font-bold text-lg'>Filter</h2>
      <h1 className='hidden md:block font-bold text-lg md:col-start-3'>Transactions</h1>
      <TransactionFilter />
      <h2 className='md:hidden font-bold text-lg md:col-start-3'>Transactions</h2>
      <TransactionsList transactions={data.transactions} showCurrency />
      {totalPages > 1 && <Pagination totalPages={totalPages} />}
    </div>
  )
}
