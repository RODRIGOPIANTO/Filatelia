import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase/client' // Assuming I move it to a server-side client for security if needed

export async function GET() {
  try {
    const { data: catalogs, error } = await supabase
      .from('catalogs')
      .select('*, countries(name_es)')
      .in('status', ['active', 'under_construction'])
      .order('title_es')

    if (error) throw error

    return NextResponse.json({ data: catalogs })
  } catch (error: any) {
    console.error('Fetch Catalogs Error:', error)
    // Return demo data if error
    return NextResponse.json({ 
      data: [
        { id: 'c1', title_es: 'Perú', catalog_type: 'country', status: 'active' },
        { id: 'c2', title_es: 'Israel', catalog_type: 'country', status: 'active' }
      ] 
    })
  }
}
