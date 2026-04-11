import type { Metadata } from 'next'
import Navbar from '@/components/Navbar/Navbar'
import Footer from '@/components/Footer/Footer'

export const metadata: Metadata = {
  title: 'Filatelia Peruana — La Primera Tienda Filatélica Online del Perú',
  description:
    'Catálogos filatélicos digitales tipo álbum, organizados por países y temáticas. La primera tienda de sellos online del Perú.',
}

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 'var(--navbar-height)' }}>{children}</main>
      <Footer />
    </>
  )
}
