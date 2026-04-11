import * as XLSX from 'xlsx'
import { z } from 'zod'

// ============================================================
// ESQUEMA DE VALIDACIÓN DE FILAS DE EXCEL
// Columnas según investigacion notebook.txt y requerimientos.txt
// ============================================================

export const ExcelRowSchema = z.object({
  country_iso:      z.string().length(2, 'Debe ser código ISO de 2 letras (Ej: PE, US, GB)'),
  catalog_system:   z.enum(['scott', 'michel', 'yvert', 'stanley_gibbons', 'facit'], {
    errorMap: () => ({ message: 'Sistema debe ser: scott, michel, yvert, stanley_gibbons o facit' }),
  }),
  catalog_number:   z.string().min(1, 'Número de catálogo requerido'),
  issue_date:       z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Formato de fecha: yyyy-mm-dd'),
  face_value:       z.string().min(1, 'Valor facial requerido (Ej: 1d, S/. 1.20)'),
  title_es:         z.string().min(1, 'Título en español requerido'),
  title_en:         z.string().optional(),
  group_year:       z.coerce.number().int().min(1800).max(2100),
  group_title_es:   z.string().min(1, 'Título del grupo en español requerido'),
  group_title_en:   z.string().optional(),
  // Opcionales
  print_run:        z.coerce.number().int().positive().optional(),
  perforation:      z.string().optional(),
  watermark:        z.string().optional(),
  printing_method:  z.string().optional(),
  color:            z.string().optional(),
  image_url:        z.string().url('URL de imagen inválida').optional().or(z.literal('')),
})

export type ExcelRow = z.infer<typeof ExcelRowSchema>

export interface ParseResult {
  rows:   ValidRow[]
  errors: RowError[]
  total:  number
}

export interface ValidRow {
  rowNumber: number
  data:      ExcelRow
}

export interface RowError {
  rowNumber: number
  issues:    string[]
  rawData:   Record<string, unknown>
}

// ============================================================
// PARSER PRINCIPAL
// ============================================================

export function parseStampExcel(buffer: Buffer): ParseResult {
  const workbook = XLSX.read(buffer, { type: 'buffer', cellDates: true })
  const sheetName = workbook.SheetNames[0]
  const sheet = workbook.Sheets[sheetName]

  // Convertir a JSON (fila 1 = cabecera)
  const rawRows = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet, {
    defval: '',      // valor por defecto para celdas vacías
    raw: false,      // convierte números a string para validar
  })

  const validRows: ValidRow[] = []
  const errorRows: RowError[] = []

  rawRows.forEach((rawRow, idx) => {
    const rowNumber = idx + 2 // +2 porque fila 1 es cabecera

    // Normalizar claves a lowercase con underscores
    const normalized = normalizeKeys(rawRow)

    const result = ExcelRowSchema.safeParse(normalized)

    if (result.success) {
      validRows.push({ rowNumber, data: result.data })
    } else {
      errorRows.push({
        rowNumber,
        issues: result.error.errors.map(e => `${e.path.join('.')}: ${e.message}`),
        rawData: rawRow,
      })
    }
  })

  return {
    rows:   validRows,
    errors: errorRows,
    total:  rawRows.length,
  }
}

// ============================================================
// HELPERS
// ============================================================

/**
 * Normaliza las claves de la fila: lowercase, espacios → underscores
 * Permite que el Excel tenga encabezados como "Country ISO" o "country_iso"
 */
function normalizeKeys(row: Record<string, unknown>): Record<string, unknown> {
  const normalized: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(row)) {
    const normalizedKey = key
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '_')
    normalized[normalizedKey] = value
  }
  return normalized
}

/**
 * Genera el contenido de la plantilla Excel de ejemplo
 */
export function generateTemplatexlsx(): Buffer {
  const headers = [
    'country_iso', 'catalog_system', 'catalog_number', 'issue_date',
    'face_value', 'title_es', 'title_en', 'group_year', 'group_title_es', 'group_title_en',
    'print_run', 'perforation', 'watermark', 'printing_method', 'color', 'image_url'
  ]

  const exampleRows = [
    ['PE', 'scott', '1', '1857-12-01', '1d', 'Escudo Nacional (1r Azul)', 'National Coat of Arms (1r Blue)',
     1857, 'Primeros Sellos del Perú', 'First Stamps of Peru', '', '11', '', 'Intaglio', 'Azul', ''],
    ['PE', 'scott', '2', '1857-12-01', '1r', 'Escudo Nacional (1r Rojo)', 'National Coat of Arms (1r Red)',
     1857, 'Primeros Sellos del Perú', 'First Stamps of Peru', '', '11', '', 'Intaglio', 'Rojo', ''],
    ['IL', 'scott', '1', '1948-05-16', '3m', 'Bandera de Israel', 'Flag of Israel',
     1948, 'Sellos de la Independencia', 'Independence Stamps', '', '11', '', 'Lithography', 'Azul', ''],
  ]

  const wsData = [headers, ...exampleRows]
  const ws = XLSX.utils.aoa_to_sheet(wsData)
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Estampillas')

  return Buffer.from(XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' }))
}
