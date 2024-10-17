'use server'

import { transactionApi } from '@/lib/axios'
import { CreateTransactionResponse } from '@/modules/transactions/interfaces/create-transaction.response'

interface Payload {
  title: string
  description?: string
  amount: number
  type: 'INCOME' | 'OUTCOME'
  account: number
}

export const createTransaction = async (token: string, payload: Payload) => {
  try {
    const { data } = await transactionApi.post<CreateTransactionResponse>('/transaction', payload, {
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
