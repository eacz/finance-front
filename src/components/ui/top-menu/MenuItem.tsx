interface Props {
  name: string
  href: string
  mobile?: boolean
}

export const MenuItem = ({ name, href, mobile }: Props) => {
  if (mobile) {
    return (
      <li className='mb-1'>
        <a
          className='block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded'
          href={href}>
          {name}
        </a>
      </li>
    )
  }

  return (
    <li>
      <a className='text-sm text-gray-400 hover:text-gray-500' href={href}>
        {name}
      </a>
    </li>
  )
}
