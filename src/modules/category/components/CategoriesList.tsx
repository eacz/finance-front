import { Category } from '../interfaces/Category'
import { CategoryItem } from './CategoryItem'

interface Props {
  categories: Category[]
}

export const CategoriesList = ({ categories }: Props) => {
  return (
    <div className='flex flex-col md:flex-row gap-4 w-full flex-wrap'>
      {categories.map((category) => (
        <CategoryItem category={category} key={category.id} />
      ))}
    </div>
  )
}
