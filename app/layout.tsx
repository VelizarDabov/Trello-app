import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Modal from '@/components/Modal'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Trello-App',
  description: 'Generated by the PApAFAM',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='bg-[#f5f6f8]'>
        {children}
        <Modal/>
        </body>
    </html>
  )
}
