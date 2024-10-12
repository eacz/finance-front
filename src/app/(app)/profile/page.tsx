import Link from 'next/link'
import LogoutButton from './LogoutButton'
import { auth } from '@/auth.config'
import { getProfileResume } from '@/actions'

export default async function ProfilePage() {
  const session = await auth()
  console.log(session);
  
  const { ok, data } = await getProfileResume(session?.user.token || '')
  console.log({ok, data});
  
  if (!ok || !data) {
    return <p>Error loading profile resume</p>
  }

  const { accounts, totalFunds, user } = data

  return (
    <div className='container-main flex flex-col justify-center items-center gap-2 '>
      <h1 className='mb-1 text-xl font-medium leading-tight '>Profile Resume</h1>
      <div className='flex flex-col max-w-[600px] w-full'>
        <div className='flex flex-row justify-between mb-4'>
          <p className='text-lg font-bold'>{user.fullName}</p>
          <p className='text-lg font-bold'>@{user.username}</p>
        </div>

        <div className='flex flex-row justify-between'>
          <p>Accounts: </p>
          <p>
            {accounts.map((account, index) => (
              <span key={account.accountId}>
                <Link href={`/accounts/${account.accountId}`} className='underline'>
                  {account.currency}
                </Link>
                {index !== accounts.length - 1 && ', '}
              </span>
            ))}
          </p>
        </div>
        <div className='flex flex-row justify-between'>
          <p>Email:</p>
          <p>{user.email}</p>
        </div>
        <div className='flex flex-row justify-between'>
          <p>Country:</p>
          <p>{user.country}</p>
        </div>
        <div className='flex flex-row justify-between'>
          <p>Total Funds: </p>
          <p>${totalFunds}</p>
        </div>
        <div className='flex flex-row justify-end mt-4'>
          <LogoutButton />
        </div>
      </div>
    </div>
  )
}
