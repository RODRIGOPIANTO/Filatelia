/**
 * Convierte un texto a slug URL-amigable
 * Ej: "Perú 1857-1900" → "peru-1857-1900"
 */
export function slugify(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // quitar tildes
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

/**
 * Formatea fecha ISO a formato legible en español
 * Ej: "1997-05-01" → "1 de mayo de 1997"
 */
export function formatDateEs(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleDateString('es-PE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

/**
 * Formatea un solo año: "1997"
 */
export function formatYear(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.getFullYear().toString()
}

/**
 * Formatea valor facial de sello con moneda
 * Ej: "1.20" → "S/. 1.20"
 */
export function formatPrice(amount: number, currency = 'PEN'): string {
  return new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(amount)
}

/**
 * Mapea el código de condición a texto legible
 */
export const CONDITION_LABELS: Record<string, string> = {
  MNH:  'Nuevo Sin Charnela (MNH)',
  MH:   'Nuevo Con Charnela (MH)',
  NG:   'Sin Goma (NG)',
  HR:   'Resto de Charnela (HR)',
  USED: 'Usado',
  CTO:  'Cancelado a Pedido (CTO)',
  FDC:  'Primer Día de Emisión (FDC)',
  FLT:  'Con Defectos',
}

export function getConditionLabel(code: string): string {
  return CONDITION_LABELS[code] ?? code
}

/**
 * Determina la clase CSS de tinte según el color del sello
 * Ej: "Azul" → "stampCard--blue"
 */
export function getStampColorClass(color?: string): string {
  if (!color) return ''
  const c = color.toLowerCase()
  if (c.includes('azul') || c.includes('blue'))     return 'stampCard--blue'
  if (c.includes('rojo') || c.includes('red') || c.includes('carmin')) return 'stampCard--red'
  if (c.includes('verde') || c.includes('green'))   return 'stampCard--green'
  if (c.includes('marrón') || c.includes('brown') || c.includes('sepia')) return 'stampCard--brown'
  if (c.includes('violeta') || c.includes('violet') || c.includes('lila')) return 'stampCard--violet'
  return ''
}

/**
 * Trunca texto a N caracteres con elipsis
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return `${text.slice(0, maxLength).trimEnd()}…`
}

/**
 * Formatea número grande con separadores de miles
 * Ej: 68158080 → "68.158.080"
 */
export function formatNumber(n: number): string {
  return new Intl.NumberFormat('es-PE').format(n)
}
