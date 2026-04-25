import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { image } = await req.json() // Base64 image
    
    if (!image) {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 })
    }

    const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY
    
    if (!OPENROUTER_API_KEY) {
      return NextResponse.json({ error: 'OpenRouter API Key not configured' }, { status: 500 })
    }

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
        "X-Title": "Filatelia Peruana AI Scanner",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "model": "google/gemini-2.0-flash-001", // Using Gemini 2.0 Flash as it's fast and has vision
        "messages": [
          {
            "role": "system",
            "content": "Eres un filatelista experto. Analiza la imagen de este sello postal y devuelve un objeto JSON estricto con las siguientes claves: pais_origen, ano_estimado, valor_facial, moneda, motivo_principal, y catalogo_estimado. Si detectas matasellos, inclúyelo en notas_condicion."
          },
          {
            "role": "user",
            "content": [
              {
                "type": "text",
                "text": "Identifica este sello postal y devuelve solo el JSON."
              },
              {
                "type": "image_url",
                "image_url": {
                  "url": image // Should be data:image/jpeg;base64,...
                }
              }
            ]
          }
        ],
        "response_format": { "type": "json_object" }
      })
    })

    const data = await response.json()
    const aiResult = JSON.parse(data.choices[0].message.content)

    // ─── Matchmaking (Cruce de Datos) ──────────────────────────────────────────
    // Search in the database using the AI result
    const { supabase } = await import('@/lib/supabase/client') // Use client or server-side supabase
    
    const { data: matches, error: matchError } = await supabase
      .from('stamps')
      .select('*, group:stamp_groups(*, catalog:catalogs(*))')
      .or(`face_value.ilike.%${aiResult.valor_facial}%,motivo_es.ilike.%${aiResult.motivo_principal}%,color.ilike.%${aiResult.motivo_principal}%`)
      .limit(3)

    return NextResponse.json({
      ...aiResult,
      db_matches: matches || []
    })
  } catch (error: any) {
    console.error('AI Scanner Error:', error)
    return NextResponse.json({ error: 'Failed to process image' }, { status: 500 })
  }
}
