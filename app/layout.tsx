import type { Metadata } from 'next'
import { Inter as Nunito } from 'next/font/google'
import NavBar from './components/navbar/NavBar'
import './globals.css'

const font = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Airbnb',
  description: 'Airbnb clone',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={font.className}>
        <NavBar />
        {children}
      </body>
    </html>
  )
}
