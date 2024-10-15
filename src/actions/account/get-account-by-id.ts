'use server'

import { transactionApi } from '@/lib/axios'
import { getAccountsByUserResponse } from '@/modules/account/interfaces/get-accounts-by-user.response'
import { Transaction } from '@/modules/transactions'

interface Payload {
  accountId: number
  limit?: number
  offset?: number
}

export const getAccountById = async (token: string, { accountId, limit = 10, offset = 0 }: Payload) => {
  try {
    transactionApi.defaults.headers['Authorization'] = `Bearer ${token}`
    const accountPromise = transactionApi.get<getAccountsByUserResponse>(`/account/${accountId}`)
    const transactionPromise = await transactionApi.get<Transaction[]>(
      `/transaction/by-account/${accountId}?limit=${limit}&offset=${offset}`
    )

    const [{ data: account }, { data: transactions }] = await Promise.all([
      accountPromise,
      transactionPromise,
    ])

    return { ok: true, account, transactions }
  } catch (error: any) {
    console.log(error)
    return {
      ok: false,
      message: error?.response?.data?.message || 'Unknown error, contact support',
    }
  }
}
