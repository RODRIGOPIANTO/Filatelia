'use client'
import { notFound, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useState } from 'react'
import { useCart } from '@/context/CartContext'
import styles from './page.module.css'

interface ProductSpec { label: string; value: string }
interface Product {
  id: string; name: string; price: number; category: string
  desc: string; badge?: string; icon: string; detail: string
  specs: ProductSpec[]
}

const PRODUCTS: Record<string, Product> = {
  p1: { id: 'p1', name: 'Estuche Filatélico Negro', price: 85.00, category: 'accesorios', icon: '🗂️', badge: 'Popular', desc: 'Estuche de lujo para conservar sellos en óptimas condiciones', detail: 'Estuche rígido de alta densidad con forro interior de terciopelo negro y sistema de cierre magnético. Protección UV integrada. Ideal para coleccionistas que buscan la máxima protección para sus piezas más valiosas.', specs: [{ label: 'Material', value: 'ABS + Terciopelo' }, { label: 'Dimensiones', value: '25 × 18 × 5 cm' }, { label: 'Capacidad', value: 'Hasta 200 sellos' }, { label: 'Cierre', value: 'Magnético' }, { label: 'Protección UV', value: 'Sí' }] },
  p2: { id: 'p2', name: 'Pinzas de Acero Inoxidable', price: 32.00, category: 'accesorios', icon: '✂️', desc: 'Pinzas profesionales de punta fina para manipular sellos sin daño', detail: 'Pinzas de acero 18/8, con anti-deslizante en el mango. Punta curvada de 1.5mm de precisión cirujana. Indispensable para el coleccionista que quiere manipular sus piezas sin dejar huellas ni dañar el papel.', specs: [{ label: 'Material', value: 'Acero inox 18/8' }, { label: 'Longitud', value: '14 cm' }, { label: 'Punta', value: '1.5 mm curva' }, { label: 'Mango', value: 'Anti-deslizante' }] },
  p3: { id: 'p3', name: 'Lupa de 10x con Luz LED', price: 55.00, category: 'accesorios', icon: '🔍', desc: 'Lupa con iluminación integrada para inspeccionar dentado y marcas de agua', detail: 'Lupa óptica de 10x con escala milimétrica y 8 LEDs blancos de alta luminosidad, alimentada por 2 pilas AAA (incluidas). Perfecta para identificar dentados, filigrana y sobrecargas.', specs: [{ label: 'Aumento', value: '10x' }, { label: 'Diámetro', value: '40 mm' }, { label: 'Iluminación', value: '8 LEDs' }, { label: 'Escala', value: 'Milimétrica' }] },
  p4: { id: 'p4', name: 'Bolsas Protectoras (100 unid.)', price: 18.00, category: 'accesorios', icon: '📦', desc: 'Mangas de polietileno transparente anti-UV para proteger sellos sueltos', detail: 'Fundas de polietileno libre de ácidos y PVC, grosor 60 micras, transparencia óptica >90%. Compatibles con sellos estándar. Esenciales para conservar el grado MNH.', specs: [{ label: 'Material', value: 'Polietileno HDPE' }, { label: 'Tamaño', value: '45 × 55 mm' }, { label: 'Quantidade', value: '100 unidades' }, { label: 'Libre de ácidos', value: 'Sí' }] },
  p5: { id: 'p5', name: 'Álbum Clasificador 64 Hojas', price: 145.00, category: 'albumes', icon: '📚', badge: 'Más vendido', desc: 'Álbum con 64 hojas negras de 275×325mm, ideal para colecciones grandes', detail: 'Tapa dura con lomo reforzado en piel sintética granada. Hojas de cartón negro con 4 tiras transparentes cada una. Incluye estuche de cartón protector para almacenamiento vertical.', specs: [{ label: 'Hojas', value: '64 hojas negras' }, { label: 'Formato', value: '275 × 325 mm' }, { label: 'Tiras/hoja', value: '4 tiras' }, { label: 'Cubierta', value: 'Piel sintética' }] },
  p6: { id: 'p6', name: 'Álbum Clasificador 32 Hojas', price: 98.00, category: 'albumes', icon: '📘', desc: 'Álbum compacto con cubierta de piel sintética y estuche incluido', detail: 'Formato A5 con 32 hojas de cartulina blanca de 160g/m². Incluye 5 tipos de tiras para diferentes tamaños de sellos. Ideal para viajes y exhibiciones.', specs: [{ label: 'Hojas', value: '32 hojas blancas' }, { label: 'Formato', value: 'A5 (148×210mm)' }, { label: 'Cubierta', value: 'Piel sintética marrón' }] },
  p7: { id: 'p7', name: 'Álbum Stock A4 (20 Páginas)', price: 75.00, category: 'albumes', icon: '📋', desc: 'Álbum A4 con páginas transparentes y 16 tiras por hoja', detail: 'Encuadernado en espiral con cubierta de PVC resistente. Páginas de polipropileno con protección UV. Apto para sellos de hasta 50mm de ancho.', specs: [{ label: 'Páginas', value: '20 páginas A4' }, { label: 'Tiras/hoja', value: '16 tiras' }, { label: 'Cubierta', value: 'PVC negro' }] },
  p8: { id: 'p8', name: 'Estampillas Clásicas del Perú (Lote)', price: 220.00, category: 'estampillas', icon: '🏷️', badge: 'Exclusivo', desc: 'Lote de 10 estampillas históricas del Perú — Estado MNH verificado', detail: 'Selección curada de 10 estampillas del Perú (1857-1900), todas en estado MNH (nuevo sin charnela). Cada pieza viene con certificado de autenticidad y ficha técnica individual con número Scott, fecha de emisión y descripción histórica.', specs: [{ label: 'Cantidad', value: '10 estampillas' }, { label: 'Período', value: '1857 – 1900' }, { label: 'Estado', value: 'MNH (certificado)' }, { label: 'Certificado', value: 'Autenticidad incluido' }] },
}

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = PRODUCTS[params.id]
  if (!product) notFound()

  const { addItem } = useCart()
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)

  function handleAdd() {
    for (let i = 0; i < qty; i++) {
      addItem({ id: product.id, name: product.name, price: product.price, category: product.category, icon: product.icon })
    }
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className={styles.page}>
      <div className="container">
        <p className={styles.breadcrumb}>
          <Link href="/tienda">Tienda</Link> / {product.name}
        </p>

        <div className={styles.layout}>
          {/* Left — Image / Icon */}
          <div className={styles.imageBox}>
            <div className={styles.imageInner}>
              <span className={styles.productIcon}>{product.icon}</span>
            </div>
            {product.badge && (
              <span className={styles.badge}>{product.badge}</span>
            )}
          </div>

          {/* Right — Info */}
          <div className={styles.info}>
            <p className={styles.category}>{product.category}</p>
            <h1 className={styles.name}>{product.name}</h1>
            <p className={styles.price}>S/. {product.price.toFixed(2)}</p>
            <p className={styles.desc}>{product.detail}</p>

            {/* Specs */}
            <div className={styles.specsTable}>
              {product.specs.map((s) => (
                <div key={s.label} className={styles.specRow}>
                  <span className={styles.specLabel}>{s.label}</span>
                  <span className={styles.specValue}>{s.value}</span>
                </div>
              ))}
            </div>

            {/* Qty + Add */}
            <div className={styles.addRow}>
              <div className={styles.qtyControl}>
                <button
                  className={styles.qtyBtn}
                  onClick={() => setQty(q => Math.max(1, q - 1))}
                  aria-label="Reducir cantidad"
                >−</button>
                <span className={styles.qty}>{qty}</span>
                <button
                  className={styles.qtyBtn}
                  onClick={() => setQty(q => q + 1)}
                  aria-label="Aumentar cantidad"
                >+</button>
              </div>
              <button
                className={`btn btn--primary ${styles.addBtn} ${added ? styles.addBtnDone : ''}`}
                onClick={handleAdd}
                id={`detail-add-${product.id}`}
              >
                {added ? '✓ Añadido al carrito' : '🛒 Añadir al carrito'}
              </button>
            </div>
          </div>
        </div>

        {/* Related products */}
        <section className={styles.related}>
          <h2 className={styles.relatedTitle}>Más productos</h2>
          <div className={styles.relatedGrid}>
            {Object.values(PRODUCTS)
              .filter(p => p.id !== product.id && p.category === product.category)
              .slice(0, 3)
              .map(p => (
                <Link key={p.id} href={`/tienda/${p.id}`} className={styles.relatedCard}>
                  <span className={styles.relatedIcon}>{p.icon}</span>
                  <div>
                    <p className={styles.relatedName}>{p.name}</p>
                    <p className={styles.relatedPrice}>S/. {p.price.toFixed(2)}</p>
                  </div>
                </Link>
              ))}
          </div>
        </section>
      </div>
    </div>
  )
}
