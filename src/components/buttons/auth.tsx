'use client'
import { signIn, signOut } from 'next-auth/react'

export function Login() {
  return (
    <button type="button" onClick={() => signIn('google', { callbackUrl: '/' })}>
      Login to Google
    </button>
  )
}

export function Logout() {
  return (
    <button type="button" onClick={() => signOut({ callbackUrl: '/' })}>
      Logout
    </button>
  )
}
