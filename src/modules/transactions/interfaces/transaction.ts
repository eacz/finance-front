export interface Transaction {
  id: number
  type: 'INCOME' | 'OUTCOME'
  title: string
  description: null | string
  amount: number
  isEditable: boolean;
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
