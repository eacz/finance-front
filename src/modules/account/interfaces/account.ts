export interface Account {
  id: number
  primary: boolean
  funds: number
  createdAt: Date
  updatedAt: Date
  currency: Currency
}

export interface Currency {
  id: number
  code: string
  name: string
  primary: boolean
  valueAgainstPrimary: number
  createdAt: Date
  updatedAt: Date
}
