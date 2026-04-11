import { renderHook, act } from '@testing-library/react'
import React from 'react'
import { CartProvider, useCart } from '@/context/CartContext'

const wrapper = ({ children }: { children: React.ReactNode }) =>
  React.createElement(CartProvider, null, children)

const DEMO_ITEM = {
  id: 'p1',
  name: 'Estuche Filatélico Negro',
  price: 85.00,
  category: 'accesorios',
  icon: '🗂️',
}

describe('CartContext', () => {
  it('starts with empty cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    expect(result.current.items).toHaveLength(0)
    expect(result.current.totalItems).toBe(0)
    expect(result.current.totalPrice).toBe(0)
    expect(result.current.isOpen).toBe(false)
  })

  it('adds an item and opens the drawer', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    act(() => { result.current.addItem(DEMO_ITEM) })
    expect(result.current.items).toHaveLength(1)
    expect(result.current.items[0].quantity).toBe(1)
    expect(result.current.totalItems).toBe(1)
    expect(result.current.totalPrice).toBe(85.00)
    expect(result.current.isOpen).toBe(true)
  })

  it('increments quantity when same item added twice', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    act(() => { result.current.addItem(DEMO_ITEM) })
    act(() => { result.current.addItem(DEMO_ITEM) })
    expect(result.current.items).toHaveLength(1)
    expect(result.current.items[0].quantity).toBe(2)
    expect(result.current.totalItems).toBe(2)
    expect(result.current.totalPrice).toBeCloseTo(170.00, 2)
  })

  it('removes an item', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    act(() => { result.current.addItem(DEMO_ITEM) })
    act(() => { result.current.removeItem('p1') })
    expect(result.current.items).toHaveLength(0)
    expect(result.current.totalPrice).toBe(0)
  })

  it('updates quantity correctly', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    act(() => { result.current.addItem(DEMO_ITEM) })
    act(() => { result.current.updateQty('p1', 5) })
    expect(result.current.items[0].quantity).toBe(5)
    expect(result.current.totalPrice).toBeCloseTo(425.00, 2)
  })

  it('removes item when quantity set to 0', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    act(() => { result.current.addItem(DEMO_ITEM) })
    act(() => { result.current.updateQty('p1', 0) })
    expect(result.current.items).toHaveLength(0)
  })

  it('clears all items', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    act(() => { result.current.addItem(DEMO_ITEM) })
    act(() => { result.current.addItem({ ...DEMO_ITEM, id: 'p2', name: 'Pinzas', price: 32 }) })
    act(() => { result.current.clearCart() })
    expect(result.current.items).toHaveLength(0)
    expect(result.current.totalItems).toBe(0)
  })

  it('toggles cart drawer', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    expect(result.current.isOpen).toBe(false)
    act(() => { result.current.toggleCart() })
    expect(result.current.isOpen).toBe(true)
    act(() => { result.current.toggleCart() })
    expect(result.current.isOpen).toBe(false)
  })

  it('opens and closes cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    act(() => { result.current.openCart() })
    expect(result.current.isOpen).toBe(true)
    act(() => { result.current.closeCart() })
    expect(result.current.isOpen).toBe(false)
  })

  it('computes totalItems across multiple products', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    act(() => { result.current.addItem(DEMO_ITEM) })
    act(() => { result.current.addItem(DEMO_ITEM) })
    act(() => { result.current.addItem({ ...DEMO_ITEM, id: 'p2', name: 'Pinzas', price: 32 }) })
    expect(result.current.totalItems).toBe(3)
    expect(result.current.totalPrice).toBeCloseTo(85 * 2 + 32, 2)
  })

  it('throws if used outside CartProvider', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {})
    expect(() => renderHook(() => useCart())).toThrow('useCart must be used within CartProvider')
    spy.mockRestore()
  })
})
