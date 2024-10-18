'use client'

import { redirect, usePathname, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import clsx from 'clsx'

import { generatePaginationNumber } from '@/utils'
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5'

interface Props {
  totalPages: number
}

export const Pagination = ({ totalPages }: Props) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const pageString = searchParams.get('page') ?? 1
  const currentPage = isNaN(+pageString) ? 1 : +pageString

  if (currentPage < 1 || isNaN(+pageString)) {
    redirect(pathname)
  }

  const allPages = generatePaginationNumber(currentPage, totalPages)

  const createPageUrl = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams)
    if (pageNumber === '...') {
      return `${pathname}?${params.toString()}`
    }

    if (+pageNumber <= 0) {
      return `${pathname}`
    }
    if (+pageNumber > totalPages) {
      return `${pathname}?${params.toString()}`
    }

    params.set('page', pageNumber.toString())
    return `${pathname}?${params.toString()}`
  }

  return (
    <div className='flex text-center mt-4 justify-center md:col-start-2 md:col-end-4'>
      <nav aria-label='Page navigation example'>
        <ul className='flex list-style-none'>
          <li className='page-item'>
            <Link className='chevron-button' href={createPageUrl(currentPage - 1)} aria-disabled='true'>
              <IoChevronBackOutline size={30} />
            </Link>
          </li>

          {allPages.map((element, index) => (
            <li className='page-item' key={index}>
              <Link
                className={clsx('pagination-button', {
                  'pagination-button-active': element === currentPage,
                })}
                href={createPageUrl(element)}>
                {element}
              </Link>
            </li>
          ))}

          <li className='page-item'>
            <Link className='chevron-button' href={createPageUrl(currentPage + 1)}>
              <IoChevronForwardOutline size={30} />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}
