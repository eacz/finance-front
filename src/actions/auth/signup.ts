'use server'

import { AuthResponse } from '@/interfaces'

const AUTH_URL_API = `${process.env.BACKEND_URL}/auth`

interface Payload {
  username: string
  email: string
  firstName: string
  lastName: string
  password: string
  country: string
}

export const signup = async (payload: Payload) => {
  try {
    const res = await fetch(`${AUTH_URL_API}/signup`, {
      body: JSON.stringify(payload),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const { token, user }: AuthResponse = await res.json()
    return { ok: true, token, user }
  } catch (error) {
    console.log(error)
    return {
      ok: false,
      message: "Couldn't register properly",
    }
  }
}
