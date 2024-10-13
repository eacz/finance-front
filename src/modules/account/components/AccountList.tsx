import { accounts } from '@/data/testdata'
import { AccountItem } from './AccountItem'
import { getAccountsByUserResponse } from '../interfaces/get-accounts-by-user.response'

interface Props {
  accounts: getAccountsByUserResponse[]
}

export const AccountList = ({ accounts }: Props) => {
  return (
    <div className='flex flex-col md:flex-row gap-4 w-full'>
      {accounts.map((account) => (
        <AccountItem key={account.id} account={account} />
      ))}
    </div>
  )
}
