'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import styles from './page.module.css'

interface Product {
  id: string; name: string; price: number; category: string
  desc: string; badge?: string; icon: string; detail: string
  specs: { label: string; value: string }[]
}

const PRODUCTS: Product[] = [
  {
    id: 'p1', name: 'Estuche Filatélico Negro', price: 85.00, category: 'accesorios', icon: '🗂️', badge: 'Popular',
    desc: 'Estuche de lujo para conservar sellos en óptimas condiciones',
    detail: 'Estuche rígido de alta densidad con forro interior de terciopelo negro y sistema de cierre magnético. Protección UV integrada.',
    specs: [{ label: 'Material', value: 'ABS + Terciopelo' }, { label: 'Dimensiones', value: '25 × 18 × 5 cm' }, { label: 'Capacidad', value: 'Hasta 200 sellos' }],
  },
  {
    id: 'p2', name: 'Pinzas de Acero Inoxidable', price: 32.00, category: 'accesorios', icon: '✂️',
    desc: 'Pinzas profesionales de punta fina para manipular sellos sin daño',
    detail: 'Pinzas de acero 18/8, con anti-deslizante en el mango. Punta curvada de 1.5mm de precisión cirujana.',
    specs: [{ label: 'Material', value: 'Acero inox 18/8' }, { label: 'Longitud', value: '14 cm' }, { label: 'Punta', value: '1.5 mm curva' }],
  },
  {
    id: 'p3', name: 'Lupa de 10x con Luz LED', price: 55.00, category: 'accesorios', icon: '🔍',
    desc: 'Lupa con iluminación integrada para inspeccionar dentado y marcas de agua',
    detail: 'Lupa óptica de 10x con escala milimétrica y 8 LEDs blancos de alta luminosidad, alimentada por 2 pilas AAA (incluidas).',
    specs: [{ label: 'Aumento', value: '10x' }, { label: 'Diámetro', value: '40 mm' }, { label: 'Iluminación', value: '8 LEDs' }],
  },
  {
    id: 'p4', name: 'Bolsas Protectoras (100 unid.)', price: 18.00, category: 'accesorios', icon: '📦',
    desc: 'Mangas de polietileno transparente anti-UV para proteger sellos sueltos',
    detail: 'Fundas de polietileno libre de ácidos y PVC, grosor 60 micras, transparencia óptica >90%. Compatibles con sellos estándar.',
    specs: [{ label: 'Material', value: 'Polietileno HDPE' }, { label: 'Tamaño', value: '45 × 55 mm' }, { label: 'Quantidade', value: '100 unidades' }],
  },
  {
    id: 'p5', name: 'Álbum Clasificador 64 Hojas', price: 145.00, category: 'albumes', icon: '📚', badge: 'Más vendido',
    desc: 'Álbum con 64 hojas negras de 275×325mm, ideal para colecciones grandes',
    detail: 'Tapa dura con lomo reforzado en piel sintética granada. Hojas de cartón negro con 4 tiras transparentes cada una. Incluye estuche de cartón.',
    specs: [{ label: 'Hojas', value: '64 hojas negras' }, { label: 'Formato', value: '275 × 325 mm' }, { label: 'Tiras/hoja', value: '4 tiras' }],
  },
  {
    id: 'p6', name: 'Álbum Clasificador 32 Hojas', price: 98.00, category: 'albumes', icon: '📘',
    desc: 'Álbum compacto con cubierta de piel sintética y estuche incluido',
    detail: 'Formato A5 con 32 hojas de cartulina blanca de 160g/m². Incluye 5 tipos de tiras para diferentes tamaños de sellos.',
    specs: [{ label: 'Hojas', value: '32 hojas blancas' }, { label: 'Formato', value: 'A5 (148 × 210 mm)' }, { label: 'Cubierta', value: 'Piel sintética marrón' }],
  },
  {
    id: 'p7', name: 'Álbum Stock A4 (20 Páginas)', price: 75.00, category: 'albumes', icon: '📋',
    desc: 'Álbum A4 con páginas transparentes y 16 tiras por hoja',
    detail: 'Encuadernado en espiral con cubierta de PVC resistente. Páginas de polipropileno con protección UV. Apto para sellos de hasta 50mm.',
    specs: [{ label: 'Páginas', value: '20 páginas A4' }, { label: 'Tiras/hoja', value: '16 tiras' }, { label: 'Cubierta', value: 'PVC negro' }],
  },
  {
    id: 'p8', name: 'Estampillas Clásicas del Perú (Lote)', price: 220.00, category: 'estampillas', icon: '🏷️', badge: 'Exclusivo',
    desc: 'Lote de 10 estampillas históricas del Perú — Estado MNH verificado',
    detail: 'Selección curada de 10 estampillas del Perú (1857-1900), todas en estado MNH (nuevo sin charnela). Vienen con certificado de autenticidad y ficha técnica individual.',
    specs: [{ label: 'Cantidad', value: '10 estampillas' }, { label: 'Período', value: '1857 – 1900' }, { label: 'Estado', value: 'MNH (certificado)' }],
  },
]

const categories = [
  { slug: '', label: 'Todo' },
  { slug: 'estampillas', label: 'Estampillas' },
  { slug: 'accesorios', label: 'Accesorios' },
  { slug: 'albumes', label: 'Álbumes' },
]

export default function TiendaPage() {
  const { addItem } = useCart()
  const [activeCategory, setActiveCategory] = useState('')
  const [addedId, setAddedId] = useState<string | null>(null)

  const filtered = activeCategory
    ? PRODUCTS.filter((p) => p.category === activeCategory)
    : PRODUCTS

  function handleAddToCart(product: Product) {
    addItem({ id: product.id, name: product.name, price: product.price, category: product.category, icon: product.icon })
    setAddedId(product.id)
    setTimeout(() => setAddedId(null), 1800)
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className="container">
          <h1 className={styles.title}>Tienda Filatélica</h1>
          <p className={styles.subtitle}>Accesorios, álbumes y estampillas de colección</p>
        </div>
      </header>

      {/* Filter bar */}
      <div className={styles.filterBar}>
        <div className="container">
          <div className={styles.filters}>
            {categories.map((cat) => (
              <button
                key={cat.slug}
                className={`${styles.filterBtn} ${activeCategory === cat.slug ? styles.filterBtnActive : ''}`}
                onClick={() => setActiveCategory(cat.slug)}
                id={`filter-${cat.slug || 'all'}`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products grid */}
      <section className={styles.products}>
        <div className="container">
          <div className={styles.productsGrid}>
            {filtered.map((product) => {
              const added = addedId === product.id
              return (
                <article key={product.id} className={styles.productCard} id={`product-${product.id}`}>
                  {product.badge && (
                    <span className={styles.productBadge}>{product.badge}</span>
                  )}
                  <div className={styles.productIcon}>{product.icon}</div>
                  <div className={styles.productBody}>
                    <p className={styles.productCategory}>{product.category}</p>
                    <h2 className={styles.productName}>{product.name}</h2>
                    <p className={styles.productDesc}>{product.desc}</p>
                  </div>
                  <div className={styles.productFooter}>
                    <span className={styles.productPrice}>S/. {product.price.toFixed(2)}</span>
                    <div className={styles.productActions}>
                      <Link
                        href={`/tienda/${product.id}`}
                        className="btn btn--outline btn--sm"
                        id={`view-${product.id}`}
                      >
                        Ver
                      </Link>
                      <button
                        className={`btn btn--primary btn--sm ${added ? styles.btnAdded : ''}`}
                        onClick={() => handleAddToCart(product)}
                        id={`add-cart-${product.id}`}
                        aria-label={`Agregar ${product.name} al carrito`}
                      >
                        {added ? '✓ Añadido' : '+ Carrito'}
                      </button>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
          {filtered.length === 0 && (
            <p className={styles.empty}>No hay productos en esta categoría aún.</p>
          )}
        </div>
      </section>
    </div>
  )
}
