'use server'

import { transactionApi } from '@/lib/axios'
import { Transaction } from '@/modules/transactions'

export const revertTransaction = async (token: string, id: number) => {
  try {
    const { data } = await transactionApi.patch<Transaction>(
      `/transaction/revert/${id}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
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
