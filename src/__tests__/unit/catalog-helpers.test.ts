import { calculateMarketValue, getScottNumber } from '@/types/catalog'
import type { StampCatalogNumber, StampCondition } from '@/types/catalog'

describe('calculateMarketValue', () => {
  const cases: [StampCondition, number, number][] = [
    ['MNH',  100, 100.00],
    ['MH',   100,  50.00],
    ['USED', 100,  20.00],
    ['NG',   100,  17.50],
    ['HR',   100,  30.00],
    ['CTO',  100,  10.00],
    ['FDC',  100, 120.00],
    ['FLT',  100,   7.50],
  ]

  test.each(cases)('condition %s on $%i = $%i', (condition, base, expected) => {
    expect(calculateMarketValue(base, condition)).toBeCloseTo(expected, 2)
  })

  it('handles zero base value', () => {
    expect(calculateMarketValue(0, 'MNH')).toBe(0)
  })

  it('handles large catalog values', () => {
    expect(calculateMarketValue(10000, 'MNH')).toBe(10000)
    expect(calculateMarketValue(10000, 'MH')).toBe(5000)
  })
})

describe('getScottNumber', () => {
  const numbers: StampCatalogNumber[] = [
    { id: '1', system: 'MICHEL', number: 'M1' },
    { id: '2', system: 'SCOTT',  number: 'S42' },
    { id: '3', system: 'YVERT',  number: 'Y10' },
  ]

  it('returns the Scott number when present', () => {
    expect(getScottNumber(numbers)).toBe('S42')
  })

  it('returns undefined when Scott is not present', () => {
    const noScott = numbers.filter(n => n.system !== 'SCOTT')
    expect(getScottNumber(noScott)).toBeUndefined()
  })

  it('returns undefined for empty array', () => {
    expect(getScottNumber([])).toBeUndefined()
  })
})
