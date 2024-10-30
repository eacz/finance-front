'use server'

import { transactionApi } from '@/lib/axios'
import { Currency } from '@/modules/currency'

export const getCurrencies = async (token: string) => {
  try {
    const { data } = await transactionApi.get<Currency[]>('/currency/all', {
      headers: { Authorization: `Bearer ${token}` },
    })
    return { ok: true, currencies: data }
  } catch (error: any) {
    console.log(error)
    return {
      ok: false,
      message: error?.response?.data?.message || 'Unknown error, contact support',
    }
  }
}
