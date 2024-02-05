import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Provider from '@/utils/Provider'
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const inter = Inter({ subsets: ['latin'] });

import AuthProvider from "@/components/Providers";

export const metadata: Metadata = {
  title: 'Travel Yatri',
  description: 'Discover Your Next Adventure: Where Journeys Begin and Memories Last.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </Provider>
        <ToastContainer />
      </body>
    </html>
  )
}