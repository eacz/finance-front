'use server'

import { transactionApi } from '@/lib/axios'

import { IPagination } from '@/interfaces'
import { getAccountsByUserResponse } from '@/modules/account/interfaces/get-accounts-by-user.response'

import { getTransactionsByAccount } from '../transaction/get-transactions-by-account'

interface Payload extends IPagination {
  accountId: number
}

export const getAccountById = async (token: string, { accountId, limit, offset }: Payload) => {
  try {
    const accountPromise = transactionApi.get<getAccountsByUserResponse>(`/account/${accountId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    const transactionPromise = getTransactionsByAccount(token, { accountId, limit, offset })

    const [{ data: account }, { ok, data, message }] = await Promise.all([accountPromise, transactionPromise])

    if (!data || !ok) {
      return { ok: false, message }
    }

    return { ok: true, account, transactions: data.transactions || [], totalTransactions: data.total }
  } catch (error: any) {
    console.log(error)
    return {
      ok: false,
      message: error?.response?.data?.message || 'Unknown error, contact support',
    }
  }
}
