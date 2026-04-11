// ============================================================
// TIPOS TYPESCRIPT — Catálogo Filatélico
// ============================================================

export type CatalogStatus = 'ACTIVE' | 'UNDER_CONSTRUCTION' | 'DRAFT' | 'INACTIVE'
export type CatalogType   = 'COUNTRY' | 'THEME'

export interface Catalog {
  id:          string
  slug:        string
  nameEs:      string
  nameEn?:     string
  descEs?:     string
  descEn?:     string
  type:        CatalogType
  countryCode?: string
  status:      CatalogStatus
  coverUrl?:   string
  order:       number
  createdAt:   string
  updatedAt:   string
  _count?: {
    groups: number
    stamps: number
  }
}

export interface StampGroup {
  id:          string
  catalogId:   string
  year:        number
  titleEs:     string
  titleEn?:    string
  description?: string
  order:       number
  stamps:      Stamp[]
}

export type CatalogNumberSystem = 'SCOTT' | 'MICHEL' | 'YVERT' | 'STANLEY_GIBBONS' | 'FACIT'

export type StampCondition = 'MNH' | 'MH' | 'NG' | 'HR' | 'USED' | 'CTO' | 'FDC' | 'FLT'

// Multiplicadores de valor por condición (de investigacion notebook.txt)
export const CONDITION_MULTIPLIERS: Record<StampCondition, number> = {
  MNH:  1.0,
  MH:   0.5,
  USED: 0.2,
  NG:   0.175,
  HR:   0.3,
  CTO:  0.1,
  FDC:  1.2,  // puede superar valor base si es raro
  FLT:  0.075,
}

// 15 Temáticas principales (investigacion notebook.txt)
export const STAMP_THEMES = [
  { slug: 'flora',           nameEs: 'Flora' },
  { slug: 'fauna',           nameEs: 'Fauna' },
  { slug: 'deportes',        nameEs: 'Deportes / Juegos Olímpicos' },
  { slug: 'aviacion',        nameEs: 'Aviación / Aviones' },
  { slug: 'navidad',         nameEs: 'Navidad' },
  { slug: 'gatos',           nameEs: 'Gatos' },
  { slug: 'perros',          nameEs: 'Perros' },
  { slug: 'ajedrez',         nameEs: 'Ajedrez' },
  { slug: 'ferrocarriles',   nameEs: 'Ferrocarriles / Trenes' },
  { slug: 'cruz-roja',       nameEs: 'Cruz Roja' },
  { slug: 'escultismo',      nameEs: 'Escultismo (Scouts)' },
  { slug: 'automoviles',     nameEs: 'Automóviles' },
  { slug: 'hongos',          nameEs: 'Hongos / Setas' },
  { slug: 'faros',           nameEs: 'Faros' },
  { slug: 'prefilatelia',    nameEs: 'Historia Postal / Prefilatelia' },
] as const

export interface StampCatalogNumber {
  id:     string
  system: CatalogNumberSystem
  number: string
}

export interface StampImage {
  id:        string
  url:       string
  altEs?:    string
  altEn?:    string
  isPrimary: boolean
  isFront:   boolean
  order:     number
}

export interface Stamp {
  id:             string
  groupId:        string
  order:          number
  issueDate?:     string
  faceValue?:     string
  printRun?:      number
  perforation?:   string
  watermark?:     string
  printingMethod?: string
  color?:         string
  conditionCode?: StampCondition
  catalogValue?:  number
  isPublished:    boolean
  images:         StampImage[]
  catalogNumbers: StampCatalogNumber[]
}

// Helper para calcular valor de mercado
export function calculateMarketValue(catalogValue: number, condition: StampCondition): number {
  const multiplier = CONDITION_MULTIPLIERS[condition] ?? 0.2
  return catalogValue * multiplier
}

// Helper para obtener el número Scott (más común en América)
export function getScottNumber(numbers: StampCatalogNumber[]): string | undefined {
  return numbers.find(n => n.system === 'SCOTT')?.number
}
