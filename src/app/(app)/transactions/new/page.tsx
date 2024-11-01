import { getAccountsByUser, getCategoriesByUser } from '@/actions'
import { auth } from '@/auth.config'
import { NewTransactionForm } from '@/modules/transactions'
import { notFound } from 'next/navigation'

interface Props {
  searchParams: {
    fromAccount?: string
    fromCategory?: string
  }
}
export default async function NewTransactionPage({ searchParams }: Props) {
  const session = await auth()
  const token = session?.user.token ?? ''

  const { ok, data: accounts } = await getAccountsByUser(token)
  const { data: categories } = await getCategoriesByUser(token, {})

  if (!ok || !accounts) {
    notFound()
  }

  return (
    <div className='container-main grid grid-cols-1 justify-center items-center gap-2'>
      <h1 className='font-bold text-xl'>Create a new transaction</h1>
      <NewTransactionForm
        accounts={accounts}
        token={session?.user.token ?? ''}
        categories={categories ?? []}
        fromAccount={searchParams.fromAccount}
        fromCategory={searchParams.fromCategory}
      />
    </div>
  )
}
