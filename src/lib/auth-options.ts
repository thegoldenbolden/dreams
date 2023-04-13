import type { AuthOptions, TokenSet } from 'next-auth'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import GoogleProvider from 'next-auth/providers/google'
import prisma from '@lib/prisma'

const authOptions: AuthOptions = {
  debug: process.env.NODE_ENV === 'development',
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'database',
    maxAge: 7 * 24 * 60 * 60,
    updateAge: 60 * 60 * 24,
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      authorization: { params: { access_type: 'offline', prompt: 'consent' } },
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      // Refresh Token Rotation
      const [google] = await prisma.account.findMany({
        where: { userId: user.id, provider: 'google' },
      })

      if (google.expires_at && google.expires_at * 1000 < Date.now()) {
        try {
          const response = await fetch('https://oauth2.googleapis.com/token', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
              client_id: process.env.GOOGLE_ID,
              client_secret: process.env.GOOGLE_SECRET,
              grant_type: 'refresh_token',
              refresh_token: `${google.refresh_token}`,
            }),
          })

          const tokens: TokenSet & { expires_in: number } = await response.json()
          if (!response.ok) throw tokens
          await prisma.account.update({
            data: {
              refresh_token: tokens.refresh_token ?? google.refresh_token,
              expires_at: Math.floor(Date.now() / 1000 + tokens.expires_in),
            },
            where: {
              provider_providerAccountId: {
                provider: 'google',
                providerAccountId: google.providerAccountId,
              },
            },
          })
        } catch (error) {
          console.log({
            body: new URLSearchParams({
              client_id: process.env.GOOGLE_ID,
              client_secret: process.env.GOOGLE_SECRET,
              grant_type: 'refresh_token',
              refresh_token: `${google.refresh_token}`,
            }),
          })
          console.error('Error refreshing access token', error)
          session.error = 'RefreshAccessTokenError'
        }
      }

      return {
        ...session,
        user: {
          name: user.name,
          image: user.image,
        },
      }
    },
  },
}

export default authOptions
