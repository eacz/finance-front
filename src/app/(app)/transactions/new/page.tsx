import { getAccountsByUser } from '@/actions'
import { auth } from '@/auth.config'
import { NewTransactionForm } from '@/modules/transactions'
import { notFound } from 'next/navigation'

interface Props {
  searchParams: {
    fromAccount?: string
  }
}
export default async function NewTransactionPage({ searchParams }: Props) {
  const session = await auth()

  const { ok, message, data } = await getAccountsByUser(session?.user.token || '')

  if (!ok || !data) {
    notFound()
  }

  return (
    <div className='container-main grid grid-cols-1 justify-center items-center gap-2'>
      <h1 className='font-bold text-xl'>Create a new transaction</h1>
      <NewTransactionForm
        accounts={data}
        token={session?.user.token ?? ''}
        fromAccount={searchParams.fromAccount}
      />
    </div>
  )
}
