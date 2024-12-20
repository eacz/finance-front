import { notFound } from 'next/navigation'
import Link from 'next/link'

import { getAccountsByUser, getCategoriesByUser, getTransactionsByUser } from '@/actions'
import { auth } from '@/auth.config'
import { Pagination } from '@/components'
import { ExpensesChart, TransactionFilter, TransactionsList } from '@/modules/transactions'

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
    category: searchParams.category,
  })
  const { data: accounts } = await getAccountsByUser(token)

  const { data: categories } = await getCategoriesByUser(token, {})

  if (!ok || !data) {
    notFound()
  }

  const totalPages = Math.ceil(data.total / transactionsPerPage)
  const hasFilter = !!Object.keys(searchParams).length

  return (
    <div className='container-main grid grid-cols-1 md:grid-cols-3 gap-4'>
      {data.transactions.length || hasFilter ? (
        <>
          <h2 className='font-bold text-lg'>Filter</h2>
          <h1 className='hidden md:block font-bold text-lg md:col-start-3'>Transactions</h1>
          <div className='flex flex-col'>
            <TransactionFilter accounts={accounts} categories={categories ?? []} />
            <ExpensesChart />
          </div>
          <h2 className='md:hidden font-bold text-lg md:col-start-3'>Transactions</h2>
          {data.transactions.length ? (
            <TransactionsList transactions={data.transactions} showCurrency />
          ) : (
            <div className='flex justify-center align-center col-start-2 col-end-4 mt-4'>
              <p className='text-lg'>Oops! looks like you don't have any transaction with this filter</p>
            </div>
          )}
          {totalPages > 1 && <Pagination totalPages={totalPages} />}
        </>
      ) : (
        <div className='flex flex-col justify-center align-center h-80 col-end-3'>
          <p className='font-bold text-xl'>
            Oops! looks like you don't have any transaction yet, try creating a{' '}
            <Link className='blue-link' href='/transactions/new'>
              new one
            </Link>
          </p>
        </div>
      )}
    </div>
  )
}
