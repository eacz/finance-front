'use server'

import { IPagination } from '@/interfaces'
import { transactionApi } from '@/lib/axios'
import { TransactionWithTotal } from '@/modules/transactions'

interface Payload extends IPagination {
  textFilter?: string
  account?: string
}

export const getTransactionsByUser = async (
  token: string,
  { limit = 10, offset = 0, account, textFilter }: Payload
) => {
  try {
    console.log({ account, textFilter })

    const { data } = await transactionApi.get<TransactionWithTotal>(
      `/transaction/by-user?limit=${limit}&offset=${offset}`,
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
