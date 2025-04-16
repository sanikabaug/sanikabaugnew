import { Inter } from 'next/font/google'
import { Providers } from "@/app/providers";
import '@/app/styles/globals.css'
import IMAGES from '@/public';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Sanika Baug',
  description: 'Sanika Baug Admin',
  icon: IMAGES.logowithoutbg,
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className='light'>
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
