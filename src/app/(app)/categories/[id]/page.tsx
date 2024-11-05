import { notFound } from 'next/navigation'

import { TransactionsList } from '@/modules/transactions'
import { getCategoryById } from '@/actions'
import { auth } from '@/auth.config'
import { Pagination } from '@/components'
import { ModifyCategory } from '@/modules/category'
import { getCategoryIcon } from '@/utils'

interface Props {
  params: { id: string }
  searchParams: {
    page?: string
  }
}

export default async function CategoryByIdPage({ params, searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1
  const transactionsPerPage = 6
  const offset = (page - 1) * transactionsPerPage
  const session = await auth()

  const { ok, category, transactions, totalTransactions } = await getCategoryById(session?.user.token ?? '', {
    categoryId: params.id,
    limit: transactionsPerPage,
    offset,
  })

  if (!ok || !category) {
    notFound()
  }

  const Icon = getCategoryIcon(category.icon)

  const totalPages = Math.ceil(totalTransactions / transactionsPerPage)

  return (
    <div className='container-main grid grid-cols-1 md:grid-cols-3 justify-center gap-2'>
      <h2 className=' mb-2 font-bold text-lg'>Category details</h2>
      <h2 className=' mb-2 hidden md:block font-bold text-lg md:col-start-2 md:col-end-4'>
        {category.name} transactions
      </h2>
      <div className='shadow block w-full rounded-lg bg-white text-left text-surface shadow-secondary-1 dark:bg-surface-dark dark:text-white p-4'>
        <div className='flex items-center gap-2'>
          <Icon size={20} />
          <h6 className='text-xl font-bold dark:text-neutral-300 leading-normal'>{category.name}</h6>
        </div>
        <h6 className='mt-2 text-md font-medium dark:text-neutral-300 leading-normal'>
          Total transactions with this category: {totalTransactions}
        </h6>
        <p className='mt-4 text-md font-medium dark:text-neutral-300 leading-normal'>
          {category.description}
        </p>
        <div className='mt-4'>
          <ModifyCategory category={category} />
        </div>
      </div>
      <h2 className=' mb-2 md:hidden font-bold text-lg md:row-start-1 md:col-start-3'>
        Category Transactions
      </h2>
      {transactions.length ? (
        <TransactionsList transactions={transactions} />
      ) : (
        <div className='flex justify-center align-center col-start-2 col-end-4 mt-4'>
          <p className='text-lg'>You don't have any transactions with this category</p>
        </div>
      )}

      {totalPages > 1 && <Pagination totalPages={totalPages} />}
    </div>
  )
}
