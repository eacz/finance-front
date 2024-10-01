import Link from 'next/link'

const accounts = [
  {
    name: 'USDT',
    id: 3,
  },
  {
    name: 'USD',
    id: 2,
  },
  {
    name: 'ARS',
    id: 4,
  },
]

export default function ProfilePage() {
  return (
    <div className='container-main flex flex-col justify-center items-center gap-2 '>
      <h1 className='mb-1 text-xl font-medium leading-tight '>Profile Resume</h1>
      <div className='flex flex-col max-w-[600px] w-full'>
        <div className='flex flex-row justify-between mb-4'>
          <p className='text-lg font-bold'>Esteban Canteros</p>
          <p className='text-lg font-bold'>@eacz</p>
        </div>

        <div className='flex flex-row justify-between'>
          <p>Accounts: </p>
          <p>
            {accounts.map((account, index) => (
              <span key={account.id}>
                <Link href={`/accounts/${account.id}`} className='underline'>{account.name}</Link>
                {index !== accounts.length - 1 && ', '}
              </span>
            ))}
          </p>
        </div>
        <div className='flex flex-row justify-between'>
          <p>Email:</p>
          <p>estebanacanteros@gmail.com</p>
        </div>
        <div className='flex flex-row justify-between'>
          <p>Country:</p>
          <p>Argentina</p>
        </div>
        <div className='flex flex-row justify-between'>
          <p>Total Funds: </p>
          <p>300.000</p>
        </div>
        <div className='flex flex-row justify-between'>
          <p></p>
        </div>
      </div>
    </div>
  )
}
