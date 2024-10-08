import type { NextAuthConfig } from 'next-auth'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { z } from 'zod'
import { LoginResponse } from './interfaces'

const AUTH_URL_API = `${process.env.BACKEND_URL}/auth`

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/signup',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      console.log({ auth })

      //const isLoggedIn = !!auth?.user
      //const isOnDashboard = nextUrl.pathname.startsWith('/dashboard')
      //if (isOnDashboard) {
      //  if (isLoggedIn) return true
      //  return false // Redirect unauthenticated users to login page
      //} else if (isLoggedIn) {
      //  return Response.redirect(new URL('/dashboard', nextUrl))
      //}
      return true
    },

    jwt({ token, user }) {
      if (user) {
        token.data = user
      }
      return token
    },
    session({ session, token, user }) {
      session.user = token.data as any
      return session
    },
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials)

        if (!parsedCredentials.success) {
          return null
        }

        const { email, password } = parsedCredentials.data

        //validate user through db
        const res = await fetch(`${AUTH_URL_API}/login`, {
          body: JSON.stringify({ email, password }),
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        const { token, user }: LoginResponse = await res.json()

        if (!user) return null

        //TODO: fix this type issue
        return { ...user, token } as any
      },
    }),
  ],
}

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig)
