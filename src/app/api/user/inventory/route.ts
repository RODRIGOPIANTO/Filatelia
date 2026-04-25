import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase/client'

export async function GET() {
  try {
    // In production: use auth to get user ID
    // For now, return all inventory for demo purposes
    const { data: inventory, error } = await supabase
      .from('user_inventory')
      .select('*, stamp:stamps(*, group:stamp_groups(*))')

    if (error) throw error

    return NextResponse.json({ data: inventory })
  } catch (error: any) {
    console.error('Fetch Inventory Error:', error)
    return NextResponse.json({ data: [] })
  }
}

export async function POST(req: Request) {
  try {
    const { stamp_id, condition } = await req.json()
    // In production: get user_id from session
    const user_id = '00000000-0000-0000-0000-000000000000' // Placeholder

    const { data, error } = await supabase
      .from('user_inventory')
      .insert([{ user_id, stamp_id, condition }])
      .select()

    if (error) throw error

    return NextResponse.json({ data })
  } catch (error: any) {
    console.error('Add to Inventory Error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
