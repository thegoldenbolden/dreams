import { Analytics } from '@vercel/analytics/react'
import { montserrat } from '@lib/fonts'
import './globals.css'

export default function RootLayout({ children }: { children?: React.ReactNode }) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body className="bg-tw-black text-tw-white font-montserrat">
        <div className="max-w-screen-2xl">{children}</div>
        <Analytics />
      </body>
    </html>
  )
}
