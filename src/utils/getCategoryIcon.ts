import { IoFastFoodOutline, IoSquareOutline } from 'react-icons/io5'

export const getCategoryIcon = (iconText: avalaibleIcons) => {
  const icon = textToIcon[iconText]

  return icon ?? textToIcon['other']
}

const textToIcon = {
  other: IoSquareOutline,
  food: IoFastFoodOutline,
}

export type avalaibleIcons = keyof typeof textToIcon
