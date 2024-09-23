import { accounts } from '@/data/testdata'
import { AccountItem } from './AccountItem'

export const AccountList = () => {
  return (
    <div className='flex flex-col md:flex-row gap-4 w-full'>
      {accounts.map((account) => (
        <AccountItem key={account.id} account={account} />
      ))}
    </div>
  )
}
