'use server'

import { transactionApi } from '@/lib/axios'
import { Account } from 'next-auth'

interface Payload {
  funds: number
  currency: number
}

export const createAccount = async (token: string, payload: Payload) => {
  try {
    const { data: account } = await transactionApi.post<Account>('/account', payload, {
      headers: { Authorization: `Bearer ${token}` },
    })

    return { account, ok: true }
  } catch (error: any) {
    console.log(error)
    return {
      ok: false,
      message: error?.response?.data?.message || 'Unknown error, contact support',
    }
  }
}
