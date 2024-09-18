'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface Props {
  name: string
  href: string
  mobile?: boolean
  onClick?: () => void
}

export const MenuItem = ({ name, href, mobile, onClick }: Props) => {
  const pathname = usePathname()
  const isCurrentPage = href === pathname

  if (mobile) {
    return (
      <li className='mb-1' onClick={onClick}>
        <Link
          className={clsx(
            'block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded',
            { 'text-secondary font-bold': isCurrentPage }
          )}
          href={href}>
          {name}
        </Link>
      </li>
    )
  }

  return (
    <li>
      <Link
        className={clsx('text-sm', {
          'text-gray-400 hover:text-gray-500': !isCurrentPage,
          'text-secondary font-bold': isCurrentPage,
        })}
        href={href}>
        {name}
      </Link>
    </li>
  )
}
