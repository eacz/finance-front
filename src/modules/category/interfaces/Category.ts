import { avalaibleIcons } from "@/utils/getCategoryIcon"

export interface Category {
  id: number
  name: string
  icon: avalaibleIcons
  description: string
  transactionsAmount?: number
}
