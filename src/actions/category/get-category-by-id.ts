'use server'

import { IPagination } from '@/interfaces'
import { getTransactionsByUser } from '../transaction/get-transactions-by-user'
import { transactionApi } from '@/lib/axios'
import { Category } from '@/modules/category'

interface Payload extends IPagination {
  categoryId: string
}

export const getCategoryById = async (token: string, { categoryId, limit, offset }: Payload) => {
  try {
    const categoryPromise = transactionApi.get<Category>(`/category/${categoryId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })

    const transactionPromise = getTransactionsByUser(token, { limit, offset, category: categoryId })
    const [{ data: category }, { data }] = await Promise.all([categoryPromise, transactionPromise])
    if (!category || !data) {
      return { ok: false }
    }

    return { ok: true, category, transactions: data.transactions, totalTransactions: data.total }
  } catch (error: any) {
    console.log(error)
    return {
      ok: false,
      message: error?.response?.data?.message || 'Unknown error, contact support',
    }
  }
}
