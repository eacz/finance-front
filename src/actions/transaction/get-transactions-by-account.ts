'use server'

import { IPagination } from '@/interfaces'
import { transactionApi } from '@/lib/axios'
import { Transaction } from '@/modules/transactions'

interface Payload extends IPagination {
  accountId: number
}

export const getTransactionsByAccount = async (
  token: string,
  { accountId, limit = 10, offset = 0 }: Payload
) => {
  try {
    const { data } = await transactionApi.get<Transaction[]>(
      `/transaction/by-account/${accountId}?limit=${limit}&offset=${offset}`,
      { headers: { Authorization: `Bearer ${token}` } }
    )

    return { ok: true, transactions: data }
  } catch (error: any) {
    console.log(error.response.data)
    return {
      ok: false,
      message: error?.response?.data?.message || 'Unknown error, contact support',
    }
  }
}
