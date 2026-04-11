import { NextResponse } from 'next/server'

// The real template would be generated via exceljs.
// For now we return the column schema as a JSON-describable CSV to let the admin
// understand the format while the exceljs library is integrated in production.
const TEMPLATE_CSV = `country_iso,catalog_system,catalog_number,issue_date,face_value,title_es,title_en,group_year,group_title_es,group_title_en,print_run,perforation,color,condition_code,image_url
PE,SCOTT,1,1857-12-01,1d,Escudo Nacional Azul,National Shield Blue,1857,Primeros Sellos del Perú,First Stamps of Peru,,Imperf,Azul,MNH,
PE,SCOTT,2,1857-12-01,1r,Escudo Nacional Rojo,National Shield Red,1857,Primeros Sellos del Perú,First Stamps of Peru,,Imperf,Rojo,MNH,
`

export async function GET() {
  return new NextResponse(TEMPLATE_CSV, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': 'attachment; filename="plantilla_importacion.csv"',
    },
  })
}
