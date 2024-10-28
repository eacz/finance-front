import Link from 'next/link'
import { Category } from '../interfaces/Category'

interface Props {
  category: Category
}
export const CategoryItem = ({ category }: Props) => {
  return (
    <div className='shadow block w-full rounded-lg bg-white text-left text-surface shadow-secondary-1 dark:bg-surface-dark dark:text-white'>
      <div className='p-6'>
        <h5 className='mb-1 text-xl font-medium leading-tight '>{category.name}</h5>
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
