import { getCategoriesByUser } from '@/actions'
import { auth } from '@/auth.config'
import { CategoriesList, CreateCategory } from '@/modules/category'

export default async function CategoryPage() {
  const session = await auth()
  const token = session?.user.token ?? ''
  const {
    ok,
    message,
    data: categories,
  } = await getCategoriesByUser(token, {
    showTransactionsNumber: true,
  })

  if (!ok || !categories) {
    return <p className='text-danger'>{message}</p>
  }

  return (
    <div className='container-main flex flex-col md:flex-row  justify-center gap-2'>
      {categories.length > 0 && <CreateCategory token={token} />}
      {categories.length > 0 && <CategoriesList categories={categories} />}
      {categories.length === 0 && (
        <div className='flex flex-col justify-center align-center h-80'>
          <p className='font-bold text-xl'>
            Oops! looks like you don't have an account yet, try creating a new one
          </p>
          <div className='mt-4'>
            <CreateCategory token={token} />
          </div>
        </div>
      )}
    </div>
  )
}
