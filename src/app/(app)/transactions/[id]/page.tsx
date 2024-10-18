import { GetTransactionById } from '@/actions'
import { auth } from '@/auth.config'
import { currencyFormat, dayFormat } from '@/utils'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface Props {
  params: { id: string }
}

export default async function TransactionByIdPage({ params }: Props) {
  const session = await auth()

  const { ok, data } = await GetTransactionById(session?.user.token ?? '', Number(params.id))

  if (!ok || !data) {
    notFound()
  }

  const { account, currency, ...transaction } = data

  return (
    <div className='container-main'>
      <div className='flex justify-between'>
        <div className='flex flex-col gap-2'>
          <p className='font-bold text-center text-xl'>General info</p>
          <p className='font-bold'>{transaction.title}</p>
          <p>
            Amount: <span className='font-bold'>{currencyFormat(transaction.amount)}</span>
          </p>
          <p>
            Transaction type: <span className='font-bold capitalize'>{transaction.type}</span>
          </p>
          <p>
            Created at: <span className='font-bold'>{dayFormat(transaction.createdAt)}</span>
          </p>
          <p>
            Account:{' '}
            <Link className='blue-link' href={`/accounts/${account.id}`}>
              {currency.code}
            </Link>
          </p>
        </div>
        <div className='flex flex-col gap-2'>
          <p className='font-bold text-center text-xl'>Description</p>
          <p>{transaction.description}</p>
        </div>
      </div>
      <div className='flex mt-10 justify-between gap-4'>
        <button className='btn-primary'>Modify transaction</button>
        <button className='btn-danger'>Revert transaction</button>
      </div>
    </div>
  )
}
