import { getServerSession } from 'next-auth'
import { cache } from 'react'
import authOptions from './auth-options'

export default cache(async function getUser() {
  return await getServerSession(authOptions)
})
