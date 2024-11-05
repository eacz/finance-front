'use client'

import React, { useState } from 'react'
import { IconType } from 'react-icons/lib'

import { avalaibleIcons, textToIcon } from '@/utils'

interface Props {
  initialIcon?: avalaibleIcons
}

export const IconSelector = ({ initialIcon = 'other' }: Props) => {
  const [DisplayedIcon, setDisplayedIcon] = useState<IconType>(() => textToIcon[initialIcon])
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const onSelect = (icon: avalaibleIcons) => {
    setDisplayedIcon(() => textToIcon[icon])
    setIsOpen(false)
  }

  return (
    <div className=''>
      <button type='button' onClick={() => setIsOpen(true)}>
        <DisplayedIcon size={25} />
      </button>
      {/*{!isOpen && (
      )}*/}

      {isOpen && (
        <div className='bg-slate-100 p-2 rounded text-4xl grid grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-1'>
          {Object.keys(textToIcon).map((icon, index) => {
            const Icon = textToIcon[icon as avalaibleIcons]
            return (
              <div onClick={() => onSelect(icon as avalaibleIcons)}>
                <Icon key={icon} size={20} />
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
