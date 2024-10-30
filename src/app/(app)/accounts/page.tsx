import { getAccountsByUser, getCurrencies } from '@/actions'
import { auth } from '@/auth.config'
import { AccountList, CreateAccount } from '@/modules/account'

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
      {canCreateNewAccount && <CreateAccount currencies={currencies} accounts={accounts} />}
      <AccountList accounts={accounts} />
      {accounts.length === 0 && (
        <div className='flex justify-center align-center h-80'>
          <p className='font-bold text-xl'>
            Oops! looks like you don't have an account yet, try creating a new one
          </p>
        </div>
      )}
    </div>
  )
}
