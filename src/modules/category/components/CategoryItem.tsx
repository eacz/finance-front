import Link from 'next/link'
import { Category } from '../interfaces/Category'
import { getCategoryIcon } from '@/utils'

interface Props {
  category: Category
}
export const CategoryItem = ({ category }: Props) => {
  const Icon = getCategoryIcon(category.icon)

  return (
    <div className='shadow block w-full rounded-lg bg-white text-left text-surface shadow-secondary-1 dark:bg-surface-dark dark:text-white md:max-w-56'>
      <div className='p-6'>
        <div className='flex items-center mb-2 gap-1 '>
          <Icon size={20}/>
          <h5 className='text-xl font-medium leading-tight '>{category.name}</h5>
        </div>
        <p className='mb-4 text-base leading-normal'>Transactions: {category.transactionsAmount}</p>
        <Link
          type='button'
          href={`/categories/${category.id}`}
          className='pointer-events-auto me-5 inline-block cursor-pointer rounded text-base font-normal leading-normal text-secondary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:text-primary-700 dark:text-primary-400'>
          More info
        </Link>
      </div>
    </div>
  )
}
