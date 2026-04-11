import { NextResponse }    from 'next/server'
import { parseStampExcel } from '@/lib/excel/parser'

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'No se recibió ningún archivo.' }, { status: 400 })
    }

    if (!file.name.endsWith('.xlsx') && !file.name.endsWith('.xls')) {
      return NextResponse.json({ error: 'Solo se aceptan archivos .xlsx o .xls' }, { status: 415 })
    }

    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: 'El archivo no puede superar 10MB.' }, { status: 413 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const { rows, errors, total } = parseStampExcel(buffer)

    // En producción: guardar `rows` en la BD mediante Prisma
    // await saveParsedStamps(rows)

    return NextResponse.json({
      total,
      ok:    rows.length,
      errors: errors.map((r) => ({
        rowNumber: r.rowNumber,
        issues:    r.issues,
        rawData:   r.rawData,
      })),
    })
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Error interno del servidor'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
