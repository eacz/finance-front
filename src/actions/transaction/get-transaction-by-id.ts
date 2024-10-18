'use server'

import { transactionApi } from '@/lib/axios'
import { GetTransactionByIdResponse } from '@/modules/transactions/interfaces/get-transaction-by-id.response'

export const GetTransactionById = async (token: string, id: number) => {
  try {
    const { data } = await transactionApi.get<GetTransactionByIdResponse>(`/transaction/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })

    return { ok: true, data }
  } catch (error: any) {
    console.log(error.response.data)
    return {
      ok: false,
      message: error?.response?.data?.message || 'Unknown error, contact support',
    }
  }
}
