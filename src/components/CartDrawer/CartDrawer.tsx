'use client'
import { useCart } from '@/context/CartContext'
import { useEffect } from 'react'
import Link from 'next/link'
import styles from './CartDrawer.module.css'

export default function CartDrawer() {
  const { items, isOpen, totalItems, totalPrice, removeItem, updateQty, clearCart, closeCart } = useCart()

  // Close on Escape
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') closeCart()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [closeCart])

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className={styles.backdrop}
          onClick={closeCart}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <aside
        className={`${styles.drawer} ${isOpen ? styles.drawerOpen : ''}`}
        aria-label="Carrito de compras"
        role="complementary"
        id="cart-drawer"
      >
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>
            🛒 Carrito
            {totalItems > 0 && (
              <span className={styles.count}>{totalItems}</span>
            )}
          </h2>
          <button
            className={styles.closeBtn}
            onClick={closeCart}
            aria-label="Cerrar carrito"
            id="cart-close-btn"
          >
            ✕
          </button>
        </div>

        {/* Items */}
        <div className={styles.items}>
          {items.length === 0 ? (
            <div className={styles.empty}>
              <span className={styles.emptyIcon}>🏷️</span>
              <p>Tu carrito está vacío</p>
              <Link href="/tienda" className="btn btn--primary" onClick={closeCart} id="cart-go-shop">
                Ir a la Tienda
              </Link>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className={styles.item} id={`cart-item-${item.id}`}>
                <span className={styles.itemIcon}>{item.icon}</span>
                <div className={styles.itemInfo}>
                  <p className={styles.itemName}>{item.name}</p>
                  <p className={styles.itemCat}>{item.category}</p>
                  <p className={styles.itemPrice}>S/. {item.price.toFixed(2)}</p>
                </div>
                <div className={styles.itemControls}>
                  <button
                    className={styles.qtyBtn}
                    onClick={() => updateQty(item.id, item.quantity - 1)}
                    aria-label="Reducir cantidad"
                  >−</button>
                  <span className={styles.qty}>{item.quantity}</span>
                  <button
                    className={styles.qtyBtn}
                    onClick={() => updateQty(item.id, item.quantity + 1)}
                    aria-label="Aumentar cantidad"
                  >+</button>
                  <button
                    className={styles.removeBtn}
                    onClick={() => removeItem(item.id)}
                    aria-label={`Eliminar ${item.name}`}
                  >🗑</button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className={styles.footer}>
            <div className={styles.total}>
              <span>Total</span>
              <span className={styles.totalAmt}>S/. {totalPrice.toFixed(2)}</span>
            </div>
            <Link
              href="/checkout"
              className={`btn btn--primary ${styles.checkoutBtn}`}
              onClick={closeCart}
              id="cart-checkout-btn"
            >
              Proceder al Pago
            </Link>
            <button className={styles.clearBtn} onClick={clearCart} id="cart-clear-btn">
              Vaciar carrito
            </button>
          </div>
        )}
      </aside>
    </>
  )
}
