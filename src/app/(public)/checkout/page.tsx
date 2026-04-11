'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import styles from './page.module.css'

type Step = 'carrito' | 'datos' | 'pago' | 'confirmar'

interface OrderForm {
  name: string; email: string; phone: string; address: string
  city: string; country: string; notes: string
  paymentMethod: 'card' | 'transfer' | 'yape'
}

export default function CheckoutPage() {
  const { items, totalPrice, totalItems, clearCart } = useCart()
  const [step, setStep] = useState<Step>('carrito')
  const [form, setForm] = useState<OrderForm>({
    name: '', email: '', phone: '', address: '', city: '', country: 'PE', notes: '', paymentMethod: 'card',
  })
  const [orderDone, setOrderDone] = useState(false)

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  function handlePlaceOrder(e: React.FormEvent) {
    e.preventDefault()
    // En producción: POST /api/orders
    setOrderDone(true)
    clearCart()
  }

  const STEPS: { key: Step; label: string }[] = [
    { key: 'carrito', label: 'Carrito' },
    { key: 'datos', label: 'Datos' },
    { key: 'pago', label: 'Pago' },
    { key: 'confirmar', label: 'Confirmar' },
  ]

  if (orderDone) {
    return (
      <div className={styles.page}>
        <div className="container">
          <div className={styles.success}>
            <span className={styles.successIcon}>✅</span>
            <h1 className={styles.successTitle}>¡Pedido realizado!</h1>
            <p className={styles.successMsg}>
              Hemos recibido tu pedido. Te enviaremos un correo de confirmación a <strong>{form.email}</strong> con los detalles de envío.
            </p>
            <div style={{ display: 'flex', gap: 'var(--sp-4)', justifyContent: 'center' }}>
              <Link href="/tienda" className="btn btn--primary" id="checkout-back-shop">Seguir comprando</Link>
              <Link href="/perfil" className="btn btn--outline">Ver mi perfil</Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <div className="container">
        <h1 className={styles.title}>Checkout</h1>

        {/* Steps indicator */}
        <div className={styles.steps}>
          {STEPS.map((s, i) => (
            <div key={s.key} className={`${styles.step} ${step === s.key ? styles.stepActive : ''} ${STEPS.findIndex(x => x.key === step) > i ? styles.stepDone : ''}`}>
              <span className={styles.stepNum}>{i + 1}</span>
              <span className={styles.stepLabel}>{s.label}</span>
              {i < STEPS.length - 1 && <span className={styles.stepSep}>→</span>}
            </div>
          ))}
        </div>

        <div className={styles.layout}>
          {/* Main content */}
          <div className={styles.main}>
            {/* STEP 1 — Cart review */}
            {step === 'carrito' && (
              <div className={styles.panel}>
                <h2 className={styles.panelTitle}>Revisión del Carrito ({totalItems} artículos)</h2>
                {items.length === 0 ? (
                  <div className={styles.emptyCart}>
                    <p>Tu carrito está vacío.</p>
                    <Link href="/tienda" className="btn btn--primary" id="checkout-empty-shop">Ir a la tienda</Link>
                  </div>
                ) : (
                  <>
                    {items.map(item => (
                      <div key={item.id} className={styles.cartRow}>
                        <span className={styles.cartIcon}>{item.icon}</span>
                        <div className={styles.cartInfo}>
                          <p className={styles.cartName}>{item.name}</p>
                          <p className={styles.cartCat}>{item.category}</p>
                        </div>
                        <div className={styles.cartRight}>
                          <span className={styles.cartQty}>×{item.quantity}</span>
                          <span className={styles.cartPrice}>S/. {(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      </div>
                    ))}
                    <button className="btn btn--primary" style={{ marginTop: 'var(--sp-6)' }} onClick={() => setStep('datos')} id="checkout-next-datos">
                      Continuar →
                    </button>
                  </>
                )}
              </div>
            )}

            {/* STEP 2 — Shipping data */}
            {step === 'datos' && (
              <div className={styles.panel}>
                <h2 className={styles.panelTitle}>Datos de Envío</h2>
                <div className={styles.form}>
                  <div className={styles.formGrid2}>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Nombre completo *</label>
                      <input name="name" value={form.name} onChange={handleChange} className={styles.formInput} placeholder="Juan Pérez" required />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Email *</label>
                      <input name="email" type="email" value={form.email} onChange={handleChange} className={styles.formInput} placeholder="correo@ejemplo.com" required />
                    </div>
                  </div>
                  <div className={styles.formGrid2}>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Teléfono</label>
                      <input name="phone" value={form.phone} onChange={handleChange} className={styles.formInput} placeholder="+51 999 000 000" />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>País</label>
                      <select name="country" value={form.country} onChange={handleChange} className={styles.formInput}>
                        <option value="PE">🇵🇪 Perú</option>
                        <option value="AR">🇦🇷 Argentina</option>
                        <option value="CL">🇨🇱 Chile</option>
                        <option value="US">🇺🇸 Estados Unidos</option>
                        <option value="ES">🇪🇸 España</option>
                      </select>
                    </div>
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Dirección *</label>
                    <input name="address" value={form.address} onChange={handleChange} className={styles.formInput} placeholder="Av. República de Panamá 123, Lima" required />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Ciudad</label>
                    <input name="city" value={form.city} onChange={handleChange} className={styles.formInput} placeholder="Lima" />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Notas del pedido</label>
                    <textarea name="notes" value={form.notes} onChange={handleChange} className={styles.formInput} placeholder="Instrucciones especiales (opcional)" rows={3} />
                  </div>
                  <div style={{ display: 'flex', gap: 'var(--sp-3)' }}>
                    <button className="btn btn--outline" onClick={() => setStep('carrito')}>← Volver</button>
                    <button className="btn btn--primary" onClick={() => setStep('pago')} id="checkout-next-pago">Continuar →</button>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3 — Payment */}
            {step === 'pago' && (
              <div className={styles.panel}>
                <h2 className={styles.panelTitle}>Método de Pago</h2>
                <div className={styles.payMethods}>
                  {[
                    { key: 'card', label: 'Tarjeta de crédito/débito', icon: '💳' },
                    { key: 'transfer', label: 'Transferencia bancaria', icon: '🏦' },
                    { key: 'yape', label: 'Yape / Plin', icon: '📱' },
                  ].map(m => (
                    <label key={m.key} className={`${styles.payMethod} ${form.paymentMethod === m.key ? styles.payMethodActive : ''}`}>
                      <input type="radio" name="paymentMethod" value={m.key} checked={form.paymentMethod === m.key} onChange={handleChange} className={styles.payRadio} />
                      <span className={styles.payIcon}>{m.icon}</span>
                      <span className={styles.payLabel}>{m.label}</span>
                    </label>
                  ))}
                </div>
                {form.paymentMethod === 'card' && (
                  <div className={styles.cardForm}>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Número de tarjeta</label>
                      <input className={styles.formInput} placeholder="4242 4242 4242 4242" maxLength={19} />
                    </div>
                    <div className={styles.formGrid2}>
                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Vencimiento</label>
                        <input className={styles.formInput} placeholder="MM/AA" maxLength={5} />
                      </div>
                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>CVV</label>
                        <input className={styles.formInput} placeholder="123" maxLength={4} type="password" />
                      </div>
                    </div>
                  </div>
                )}
                {form.paymentMethod === 'yape' && (
                  <div className={styles.infoBox}>📱 Al confirmar el pedido recibirás el número Yape/Plin y el QR de pago por correo.</div>
                )}
                {form.paymentMethod === 'transfer' && (
                  <div className={styles.infoBox}>🏦 Datos bancarios: <br/>BCP Cta. 195-12345678-0-39 · CCI 002-195-012345678039-14 a nombre de Filatelia Peruana SAC</div>
                )}
                <div style={{ display: 'flex', gap: 'var(--sp-3)', marginTop: 'var(--sp-6)' }}>
                  <button className="btn btn--outline" onClick={() => setStep('datos')}>← Volver</button>
                  <button className="btn btn--primary" onClick={() => setStep('confirmar')} id="checkout-next-confirm">Revisar pedido →</button>
                </div>
              </div>
            )}

            {/* STEP 4 — Confirm */}
            {step === 'confirmar' && (
              <form onSubmit={handlePlaceOrder} className={styles.panel}>
                <h2 className={styles.panelTitle}>Confirmar Pedido</h2>
                <div className={styles.confirmSection}>
                  <h3 className={styles.confirmSubtitle}>Datos de envío</h3>
                  <div className={styles.confirmGrid}>
                    <span className={styles.confirmKey}>Nombre</span><span className={styles.confirmVal}>{form.name || '—'}</span>
                    <span className={styles.confirmKey}>Email</span><span className={styles.confirmVal}>{form.email || '—'}</span>
                    <span className={styles.confirmKey}>Teléfono</span><span className={styles.confirmVal}>{form.phone || '—'}</span>
                    <span className={styles.confirmKey}>Dirección</span><span className={styles.confirmVal}>{form.address || '—'}, {form.city}</span>
                    <span className={styles.confirmKey}>País</span><span className={styles.confirmVal}>{form.country}</span>
                  </div>
                </div>
                <div className={styles.confirmSection}>
                  <h3 className={styles.confirmSubtitle}>Pago</h3>
                  <div className={styles.confirmGrid}>
                    <span className={styles.confirmKey}>Método</span>
                    <span className={styles.confirmVal}>{form.paymentMethod === 'card' ? '💳 Tarjeta' : form.paymentMethod === 'yape' ? '📱 Yape/Plin' : '🏦 Transferencia'}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 'var(--sp-3)', marginTop: 'var(--sp-6)' }}>
                  <button type="button" className="btn btn--outline" onClick={() => setStep('pago')}>← Volver</button>
                  <button type="submit" className="btn btn--primary" id="checkout-place-order">
                    ✅ Confirmar y pagar S/. {totalPrice.toFixed(2)}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Order summary sidebar */}
          <aside className={styles.summary}>
            <div className={styles.summaryCard}>
              <h2 className={styles.summaryTitle}>Resumen</h2>
              {items.map(item => (
                <div key={item.id} className={styles.summaryItem}>
                  <span>{item.icon} {item.name} ×{item.quantity}</span>
                  <span>S/. {(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className={styles.summaryDivider} />
              <div className={styles.summaryTotal}>
                <span>Total</span>
                <span>S/. {totalPrice.toFixed(2)}</span>
              </div>
              <p className={styles.summaryNote}>Envío calculado al ingresar dirección</p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
