'use server'

import { transactionApi } from '@/lib/axios'

interface getProfileResumeResponse {
  user: {
    fullName: string
    username: string
    country: string
    email: string
  }
  totalFunds: number
  accounts: { accountId: number; currency: string }[]
}

export const getProfileResume = async (token: string) => {
  try {
    const { data } = await transactionApi.get<getProfileResumeResponse>('/user/resume', {
      headers: { Authorization: `Bearer ${token}` },
    })

    return { ok: true, data }
  } catch (error) {
    console.log(error)
    return { ok: false }
  }
}
