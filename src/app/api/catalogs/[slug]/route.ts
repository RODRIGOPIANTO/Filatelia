import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase/client'

export async function GET(
  _req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    // In the new schema, slug might be the catalog ID or a slug field if I add it.
    // For now, let's try to match by ID or title.
    const { data: cat, error: catError } = await supabase
      .from('catalogs')
      .select(`
        *,
        countries(name_es),
        stamp_groups (
          *,
          stamps (*)
        )
      `)
      .eq('id', params.slug) // Assuming slug is the ID for now
      .single()

    if (catError) {
      // Try by title if ID fails (simple fallback)
      const { data: catByTitle, error: titleError } = await supabase
        .from('catalogs')
        .select(`
          *,
          countries(name_es),
          stamp_groups (
            *,
            stamps (*)
          )
        `)
        .ilike('title_es', `%${params.slug}%`)
        .single()
      
      if (titleError || !catByTitle) throw catError
      return NextResponse.json({ data: catByTitle })
    }

    return NextResponse.json({ data: cat })
  } catch (error: any) {
    console.error('Fetch Catalog Error:', error)
    return NextResponse.json({ error: 'Catalog not found' }, { status: 404 })
  }
}
