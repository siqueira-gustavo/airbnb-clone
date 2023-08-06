import type { Metadata } from 'next'
import { Inter as Nunito } from 'next/font/google'
import ClientOnly from './components/ClientOnly'
import Modal from './components/modlas/Modal'
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
        <ClientOnly>
          <Modal isOpen />
          <NavBar />
        </ClientOnly>
        {children}
      </body>
    </html>
  )
}
