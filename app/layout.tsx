import { User } from '@prisma/client'
import type { Metadata } from 'next'
import { Inter as Nunito } from 'next/font/google'
import NextTopLoader from 'nextjs-toploader'
import getCurrentUser from './actions/getCurrentUser'
import ClientOnly from './components/ClientOnly'
import LoginModal from './components/modals/LoginModal'
import RegisterModal from './components/modals/RegisterModal'
import NavBar from './components/navbar/NavBar'
import './globals.css'
import ToasterProvider from './providers/ToasterProvider'

const font = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Airbnb',
  description: 'Airbnb clone',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser: User | null = await getCurrentUser()
  return (
    <html lang='en'>
      <body className={font.className}>
        <NextTopLoader color='red' />
        <ClientOnly>
          <ToasterProvider />
          <LoginModal />
          <RegisterModal />
          <NavBar currentUser={currentUser} />
        </ClientOnly>
        {children}
      </body>
    </html>
  )
}
