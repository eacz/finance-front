import { getAccountsByUser, getCurrencies } from '@/actions'
import { auth } from '@/auth.config'
import { AccountList, CreateAccount } from '@/modules/account'
import { IoWalletOutline } from 'react-icons/io5'

export default async function AccountPage() {
  const session = await auth()
  const token = session?.user.token || ''
  const { ok, message, data: accounts } = await getAccountsByUser(token)
  const { currencies } = await getCurrencies(token)

  if (!ok || !accounts || !currencies) {
    return <p className='text-danger'>{message}</p>
  }

  const canCreateNewAccount = currencies.length !== accounts.length

  return (
    <div className='container-main flex flex-col md:flex-row justify-center gap-2'>
      {accounts.length && canCreateNewAccount && (
        <CreateAccount currencies={currencies} accounts={accounts} />
      )}
      {accounts.length && <AccountList accounts={accounts} />}

      {accounts.length === 0 && (
        <div className='flex flex-col justify-center align-center h-80'>
          <p className='font-bold text-xl'>
            Oops! looks like you don't have an account yet, try creating a new one
          </p>
          <div className='mt-4'>
            <CreateAccount currencies={currencies} accounts={accounts} />
          </div>
        </div>
      )}
    </div>
  )
}
