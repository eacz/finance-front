import { notFound } from 'next/navigation'

import { UpdateAccountFunds } from '@/modules/account'
import { TransactionsList } from '@/modules/transactions'
import { dayFormat, currencyFormat } from '@/utils'
import { getAccountById } from '@/actions'
import { auth } from '@/auth.config'

interface Props {
  params: { id: string }
}

export default async function AccountByIdPage({ params }: Props) {
  const session = await auth()

  const { ok, account, transactions } = await getAccountById(session?.user.token ?? '', {
    accountId: Number(params.id),
    limit: 5,
  })

  if (!ok || !account) {
    notFound()
  }
  return (
    <div className='container-main grid grid-cols-1 md:grid-cols-3  justify-center  gap-2'>
      <h2 className=' mb-2 font-bold text-lg'>Account Details</h2>
      <h2 className=' mb-2 hidden md:block font-bold text-lg md:col-start-2 md:col-end-4'>
        Account Transactions
      </h2>
      <div className='shadow block w-full rounded-lg bg-white text-left text-surface shadow-secondary-1 dark:bg-surface-dark dark:text-white'>
        <div className='flex'>
          <h5 className='text-3xl font-bold leading-tight'>{account.currency.code}</h5>
          {account.primary && (
            <div className='ml-2 mt-1 rounded-md flex items-center h-6 bg-green-100 py-0.5 px-2.5 border border-transparent text-sm text-green-800 transition-all shadow-sm'>
              <div className='mx-auto block h-2 w-2 rounded-full bg-green-800 mr-2'></div>
              Primary
            </div>
          )}
        </div>
        <h6 className='mt-2 text-xl font-medium dark:text-neutral-300 leading-normal'>
          Funds: <span className='font-bold'>{currencyFormat(account.funds)}</span>
        </h6>
        <h6 className='mt-2 text-xl font-medium dark:text-neutral-300 leading-normal'>
          Last transaction: <span className='font-bold'>{dayFormat(account.updatedAt)}</span>
        </h6>
        <h6 className='mt-2 text-xl font-medium dark:text-neutral-300 leading-normal'>
          Account created: <span className='font-bold'>{dayFormat(account.createdAt)}</span>
        </h6>

        <UpdateAccountFunds
          funds={account.funds}
          currencyCode={account.currency.code}
          token={session?.user.token}
          accountId={account.id}
        />
      </div>
      <h2 className=' mb-2 md:hidden font-bold text-lg md:col-start-3'>Account Transactions</h2>
      <TransactionsList transactions={transactions} />
    </div>
  )
}
