'use client'

import React, { useState } from 'react'
import clsx from 'clsx'
import { IconType } from 'react-icons/lib'

import { avalaibleIcons, textToIcon } from '@/utils'

interface Props {
  initialIcon?: avalaibleIcons
  setter: (value: avalaibleIcons) => void
}

export const IconSelector = ({ initialIcon = 'other', setter }: Props) => {
  const [DisplayedIcon, setDisplayedIcon] = useState<IconType>(() => textToIcon[initialIcon])
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const onSelect = (icon: avalaibleIcons) => {
    setDisplayedIcon(() => textToIcon[icon])
    setter(icon)
    setIsOpen(false)
  }

  return (
    <div className='absolute' style={{ width: 'inherit' }}>
      <button type='button' onClick={() => setIsOpen(!isOpen)}>
        <DisplayedIcon size={25} />
      </button>

      <div
        className={clsx(
          `bg-slate-100 relative rounded grid grid-cols-6 md:grid-cols-8 lg:grid-cols-10  transition-all duration-300 delay-100 overflow-hidden`,
          { 'h-32': isOpen, 'h-0': !isOpen }
        )}>
        {Object.keys(textToIcon).map((icon) => {
          const Icon = textToIcon[icon as avalaibleIcons]
          return (
            <div
              className='flex items-center justify-center '
              key={icon}
              onClick={() => onSelect(icon as avalaibleIcons)}>
              <Icon size={20} className='cursor-pointer' />
            </div>
          )
        })}
      </div>
    </div>
  )
}
