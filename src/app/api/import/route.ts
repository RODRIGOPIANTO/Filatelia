import { NextResponse } from 'next/server'
import * as XLSX from 'xlsx'
import { supabase } from '@/lib/supabase/client'

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File
    if (!file) return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })

    const buffer = await file.arrayBuffer()
    const workbook = XLSX.read(buffer)
    const sheetName = workbook.SheetNames[0]
    const worksheet = workbook.Sheets[sheetName]
    const data: any[] = XLSX.utils.sheet_to_json(worksheet)

    let ok = 0
    let errors: any[] = []

    for (let i = 0; i < data.length; i++) {
      const row = data[i]
      try {
        // 1. Find or create country
        const { data: country } = await supabase
          .from('countries')
          .select('id')
          .eq('iso_code', row.country_iso)
          .single()
        
        if (!country) throw new Error(`Country ${row.country_iso} not found`)

        // 2. Find or create catalog
        let { data: catalog } = await supabase
          .from('catalogs')
          .select('id')
          .eq('country_id', country.id)
          .single()
        
        if (!catalog) {
          const { data: newCat } = await supabase
            .from('catalogs')
            .insert([{ country_id: country.id, title_es: `Catálogo de ${row.country_iso}`, catalog_type: 'country' }])
            .select()
            .single()
          catalog = newCat
        }

        // 3. Find or create group
        let { data: group } = await supabase
          .from('stamp_groups')
          .select('id')
          .eq('catalog_id', catalog.id)
          .eq('year', row.group_year)
          .single()
        
        if (!group) {
          const { data: newGroup } = await supabase
            .from('stamp_groups')
            .insert([{ catalog_id: catalog.id, title_es: row.group_title_es, year: row.group_year }])
            .select()
            .single()
          group = newGroup
        }

        // 4. Insert stamp
        const { error: stampError } = await supabase
          .from('stamps')
          .insert([{
            group_id: group.id,
            face_value: row.face_value,
            color: row.color,
            issue_date: row.issue_date,
            perforation: row.perforation,
            print_run: row.print_run,
            motivo_es: row.title_es
          }])

        if (stampError) throw stampError
        ok++
      } catch (err: any) {
        errors.push({ rowNumber: i + 2, issues: [err.message], rawData: row })
      }
    }

    return NextResponse.json({
      total: data.length,
      ok,
      errors,
      fileName: file.name
    })
  } catch (error: any) {
    console.error('Import Error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
