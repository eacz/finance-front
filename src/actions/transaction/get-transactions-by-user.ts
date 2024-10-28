'use server'

import { IPagination } from '@/interfaces'
import { transactionApi } from '@/lib/axios'
import { TransactionWithTotal } from '@/modules/transactions'

interface Payload extends IPagination {
  textFilter?: string
  account?: string
  category?: string
}

export const getTransactionsByUser = async (
  token: string,
  { limit = 10, offset = 0, account, textFilter, category }: Payload
) => {
  try {
    const params = new URLSearchParams()

    params.set('limit', limit.toString())
    params.set('offset', offset.toString())
    if (account) params.set('account', account.toString())
    if (textFilter) params.set('textFilter', textFilter.toString())
    if (category) params.set('category', category.toString())

    const { data } = await transactionApi.get<TransactionWithTotal>(
      `/transaction/by-user?${params.toString()}`,
      { headers: { Authorization: `Bearer ${token}` } }
    )
    return { ok: true, data }
  } catch (error: any) {
    console.log(error.response.data)
    return {
      ok: false,
      message: error?.response?.data?.message || 'Unknown error, contact support',
    }
  }
}
