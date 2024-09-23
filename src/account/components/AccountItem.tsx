import { currencyFormat, dayFormat } from '@/utils'
import { Account } from '../interfaces/account'
import Link from 'next/link'

interface Props {
  account: Account
}

export const AccountItem = ({ account }: Props) => {
  return (
    <div className='shadow block w-full rounded-lg bg-white text-left text-surface shadow-secondary-1 dark:bg-surface-dark dark:text-white'>
      <div className='p-6'>
        <h5 className='mb-1 text-xl font-medium leading-tight '>{account.currency.code} Account</h5>
        <h6 className='mb-2 text-base font-medium leading-tight text-surface/75 dark:text-neutral-300'>
          Last update: {dayFormat(account.updatedAt)}
        </h6>
        <p className='mb-4 text-base leading-normal'>Funds: {currencyFormat(account.funds)}</p>
        <Link
          type='button'
          href={`/accounts/${account.id}`}
          className='pointer-events-auto me-5 inline-block cursor-pointer rounded text-base font-normal leading-normal text-secondary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:text-primary-700 dark:text-primary-400'>
          More info
        </Link>
      </div>
    </div>
  )
}
