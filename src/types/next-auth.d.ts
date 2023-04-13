import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface Session {
    error?: 'RefreshAccessTokenError'
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    access_token: string
    expires_in: number
    expires_at: number
    refresh_token: string
    error?: 'RefreshAccessTokenError'
  }
}
