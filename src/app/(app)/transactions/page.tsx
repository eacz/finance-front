import { getAccountsByUser, getCategoriesByUser, getTransactionsByUser } from '@/actions'
import { auth } from '@/auth.config'
import { Pagination } from '@/components'
import { TransactionFilter, TransactionsList } from '@/modules/transactions'
import { notFound } from 'next/navigation'

interface Props {
  searchParams: {
    page?: string
    textFilter?: string
    account?: string
    category?: string
  }
}

export default async function TransactionsPage({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1
  const transactionsPerPage = 6
  const offset = (page - 1) * transactionsPerPage
  const session = await auth()
  const token = session?.user.token ?? ''

  const { ok, data } = await getTransactionsByUser(token, {
    limit: transactionsPerPage,
    offset,
    account: searchParams.account,
    textFilter: searchParams.textFilter,
    category: searchParams.category
  })
  const { data: accounts } = await getAccountsByUser(token)

  const { data: categories } = await getCategoriesByUser(token)
  
  if (!ok || !data) {
    notFound()
  }

  const totalPages = Math.ceil(data.total / transactionsPerPage)

  return (
    <div className='container-main grid grid-cols-1 md:grid-cols-3 gap-4'>
      <h2 className='font-bold text-lg'>Filter</h2>
      <h1 className='hidden md:block font-bold text-lg md:col-start-3'>Transactions</h1>
      <TransactionFilter accounts={accounts} categories={categories??[]} />
      <h2 className='md:hidden font-bold text-lg md:col-start-3'>Transactions</h2>
      <TransactionsList transactions={data.transactions} showCurrency />
      {totalPages > 1 && <Pagination totalPages={totalPages} />}
    </div>
  )
}
