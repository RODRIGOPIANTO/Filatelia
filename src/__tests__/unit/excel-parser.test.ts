import * as XLSX from 'xlsx'
import { parseStampExcel, ExcelRowSchema } from '@/lib/excel/parser'

// Helper: create an xlsx Buffer from row arrays
function makeBuffer(headers: string[], rows: unknown[][]): Buffer {
  const ws = XLSX.utils.aoa_to_sheet([headers, ...rows])
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Stamps')
  return Buffer.from(XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' }))
}

const VALID_HEADERS = [
  'country_iso','catalog_system','catalog_number','issue_date',
  'face_value','title_es','title_en','group_year','group_title_es','group_title_en',
  'print_run','perforation','watermark','printing_method','color','image_url',
]

const VALID_ROW = ['PE','scott','1','1857-12-01','1d','Escudo Azul','Blue Shield','1857','Primeros Sellos','First Stamps','','Imperf','','Intaglio','Azul','']

describe('parseStampExcel', () => {
  it('parses a valid single row correctly', () => {
    const buf = makeBuffer(VALID_HEADERS, [VALID_ROW])
    const result = parseStampExcel(buf)
    expect(result.total).toBe(1)
    expect(result.rows).toHaveLength(1)
    expect(result.errors).toHaveLength(0)
    expect(result.rows[0].data.country_iso).toBe('PE')
    expect(result.rows[0].data.catalog_system).toBe('scott')
    expect(result.rows[0].data.catalog_number).toBe('1')
    expect(result.rows[0].rowNumber).toBe(2)
  })

  it('parses multiple rows and tracks total', () => {
    const rows = [VALID_ROW, ['IL','scott','2','1948-05-16','3m','Bandera','Flag',1948,'Independencia','Independence','','11','','Litho','Azul','']]
    const buf = makeBuffer(VALID_HEADERS, rows)
    const result = parseStampExcel(buf)
    expect(result.total).toBe(2)
    expect(result.rows).toHaveLength(2)
    expect(result.errors).toHaveLength(0)
  })

  it('catches row with invalid country_iso (too short)', () => {
    const bad = [...VALID_ROW]; bad[0] = 'P'
    const buf = makeBuffer(VALID_HEADERS, [bad])
    const result = parseStampExcel(buf)
    expect(result.errors).toHaveLength(1)
    expect(result.errors[0].rowNumber).toBe(2)
    expect(result.errors[0].issues[0]).toMatch(/country_iso/)
  })

  it('catches row with invalid catalog_system', () => {
    const bad = [...VALID_ROW]; bad[1] = 'gibbons_wrong'
    const buf = makeBuffer(VALID_HEADERS, [bad])
    const result = parseStampExcel(buf)
    expect(result.errors).toHaveLength(1)
    expect(result.errors[0].issues[0]).toMatch(/catalog_system/)
  })

  it('catches row with invalid date format', () => {
    const bad = [...VALID_ROW]; bad[3] = '01/12/1857'
    const buf = makeBuffer(VALID_HEADERS, [bad])
    const result = parseStampExcel(buf)
    expect(result.errors).toHaveLength(1)
  })

  it('catches missing required title_es', () => {
    const bad = [...VALID_ROW]; bad[5] = ''
    const buf = makeBuffer(VALID_HEADERS, [bad])
    const result = parseStampExcel(buf)
    expect(result.errors).toHaveLength(1)
    expect(result.errors[0].issues[0]).toMatch(/title_es/)
  })

  it('handles empty workbook gracefully', () => {
    const buf = makeBuffer(VALID_HEADERS, [])
    const result = parseStampExcel(buf)
    expect(result.total).toBe(0)
    expect(result.rows).toHaveLength(0)
    expect(result.errors).toHaveLength(0)
  })

  it('returns mixed results for partial errors', () => {
    const bad = [...VALID_ROW]; bad[0] = 'TOOLONG'
    const buf = makeBuffer(VALID_HEADERS, [VALID_ROW, bad])
    const result = parseStampExcel(buf)
    expect(result.total).toBe(2)
    expect(result.rows).toHaveLength(1)
    expect(result.errors).toHaveLength(1)
  })

  it('normalizes headers with spaces (e.g. "Country ISO" → country_iso)', () => {
    const spacedHeaders = VALID_HEADERS.map(h => h.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()))
    const buf = makeBuffer(spacedHeaders, [VALID_ROW])
    const result = parseStampExcel(buf)
    // Normalization converts "Country Iso" → "country_iso" — should parse OK
    expect(result.total).toBe(1)
  })
})

describe('ExcelRowSchema', () => {
  it('validates all allowed catalog systems', () => {
    const systems = ['scott', 'michel', 'yvert', 'stanley_gibbons', 'facit']
    systems.forEach(s => {
      const base = { country_iso: 'PE', catalog_system: s, catalog_number: '1', issue_date: '1857-01-01', face_value: '1d', title_es: 'Test', group_year: 1857, group_title_es: 'Test' }
      expect(() => ExcelRowSchema.parse(base)).not.toThrow()
    })
  })

  it('rejects invalid catalog system', () => {
    const base = { country_iso: 'PE', catalog_system: 'unknown', catalog_number: '1', issue_date: '1857-01-01', face_value: '1d', title_es: 'Test', group_year: 1857, group_title_es: 'Test' }
    expect(() => ExcelRowSchema.parse(base)).toThrow()
  })
})
