'use server'

import { transactionApi } from '@/lib/axios'

interface Payload {
  id: number
  title?: string
  description?: string
}

export const modifyTransaction = async (token: string, { id, ...toUpdate }: Payload) => {
  try {
    const {
      data: { ok },
    } = await transactionApi.patch<{ ok: boolean }>(`/transaction/${id}`, toUpdate, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return { ok, message: ok ? '' : 'Error updating the transaction' }
  } catch (error: any) {
    console.log(error.response.data)
    return {
      ok: false,
      message: error?.response?.data?.message || 'Unknown error, contact support',
    }
  }
}
