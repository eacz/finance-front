import { getCategoriesByUser } from '@/actions'
import { auth } from '@/auth.config'
import { CategoriesList } from '@/modules/category'

export default async function CategoryPage() {
  const session = await auth()
  const { ok, message, data } = await getCategoriesByUser(session?.user.token || '', {
    showTransactionsNumber: true,
  })

  if (!ok || !data) {
    return <p className='text-danger'>{message}</p>
  }

  return (
    <div className='container-main flex flex-col justify-center gap-2'>
      <CategoriesList categories={data} />
      {data.length === 0 && (
        <div className='flex justify-center align-center h-80'>
          <p className='font-bold text-xl'>
            Oops! looks like you don't have created any category yet, try creating a new one
          </p>
        </div>
      )}
    </div>
  )
}
