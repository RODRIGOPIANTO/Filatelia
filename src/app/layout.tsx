import type { Metadata } from 'next'
import '@/styles/tokens.css'
import { CartProvider } from '@/context/CartContext'
import CartDrawer from '@/components/CartDrawer/CartDrawer'

export const metadata: Metadata = {
  title: {
    default: 'Filatelia Peruana — La Primera Tienda Filatélica Online del Perú',
    template: '%s | Filatelia Peruana',
  },
  description:
    'Catálogo filatélico digital de estampillas del Perú e Israel. La primera tienda de sellos online del Perú.',
  keywords: ['filatelia', 'sellos', 'estampillas', 'peru', 'catálogo filatélico'],
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'es_PE',
    siteName: 'Filatelia Peruana',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <CartProvider>
          <CartDrawer />
          {children}
        </CartProvider>
      </body>
    </html>
  )
}
