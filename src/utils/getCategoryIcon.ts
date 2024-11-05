import {
  IoAirplaneOutline,
  IoBagOutline,
  IoBarbellOutline,
  IoBookOutline,
  IoCarOutline,
  IoDocumentOutline,
  IoDocumentTextOutline,
  IoFastFoodOutline,
  IoFitnessOutline,
  IoGridOutline,
  IoHammerOutline,
  IoHomeOutline,
  IoLaptopOutline,
  IoLogoSteam,
  IoMailOutline,
  IoMusicalNoteOutline,
  IoPeopleOutline,
  IoServerOutline,
  IoShirtOutline,
  IoStorefrontOutline,
  IoTicketOutline,
  IoTvOutline,
} from 'react-icons/io5'

export const getCategoryIcon = (iconText: avalaibleIcons) => {
  const icon = textToIcon[iconText]

  return icon ?? textToIcon['other']
}

export const textToIcon = {
  other: IoGridOutline,
  food: IoFastFoodOutline,
  hammer: IoHammerOutline,
  home: IoHomeOutline,
  book: IoBookOutline,
  store: IoStorefrontOutline,
  shirt: IoShirtOutline,
  car: IoCarOutline,
  people: IoPeopleOutline,
  heart: IoFitnessOutline,
  document: IoDocumentOutline,
  documentText: IoDocumentTextOutline,
  laptop: IoLaptopOutline,
  mail: IoMailOutline,
  steam: IoLogoSteam,
  music: IoMusicalNoteOutline,
  db: IoServerOutline,
  ticket: IoTicketOutline,
  bag: IoBagOutline,
  barbell: IoBarbellOutline,
  tv: IoTvOutline,
  airplane: IoAirplaneOutline,
}

export type avalaibleIcons = keyof typeof textToIcon
