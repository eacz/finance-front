import NextAuth, { DefaultSession, User } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: number
      username: string
      firstName: string
      lastName: string
      email: string
      active: boolean
      country: string
      createdAt: Date
      updatedAt: Date
      token: string
    } & DefaultSession['user']
  }

  interface User {
    id: number
    username: string
    firstName: string
    lastName: string
    email: string
    active: boolean
    country: string
    createdAt: Date
    updatedAt: Date
    token: string
  }
}
