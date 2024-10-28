'use server'

import { transactionApi } from '@/lib/axios'
import { Category } from '@/modules/category'

interface Payload {
  showTransactionsNumber?: boolean
}

export const getCategoriesByUser = async (token: string, { showTransactionsNumber }: Payload) => {
  try {
    const params = new URLSearchParams()
    if (showTransactionsNumber) params.set('showTransactionsAmount', 'true')

    const { data } = await transactionApi.get<Category[]>(`/category?${params.toString()}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return {
      ok: true,
      data,
      message: 'Ok',
    }
  } catch (error: any) {
    console.log(error)
    return {
      ok: false,
      message: error?.response?.data?.message || 'Unknown error, contact support',
    }
  }
}
