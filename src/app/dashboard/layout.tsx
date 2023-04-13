import getUser from '@lib/get-user'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function DashboardLayout({ children }) {
  // const session = await getUser()

  // if (!session?.user) {
  //   redirect('/login')
  // }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2">
      <Navbar />
      {children}
    </div>
  )
}

function Navbar() {
  return (
    <nav className="flex gap-2">
      <Link href="/stats">Stats</Link>
      <Link href="/settings">Settings</Link>
    </nav>
  )
}
