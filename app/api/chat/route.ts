import { NextRequest, NextResponse } from 'next/server'

const AGENT_API_URL =
  'https://dapi.cosmic-staging.com/v3/ai/agents/69fcf02e8f7654c5356c7402/messages'

export async function POST(req: NextRequest) {
  const apiKey = process.env.ALEX_API_KEY

  if (!apiKey) {
    return NextResponse.json(
      { error: 'Server is not configured. Missing ALEX_API_KEY.' },
      { status: 500 }
    )
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  try {
    const upstream = await fetch(AGENT_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(body),
    })

    const data = await upstream.json().catch(() => ({}))

    if (!upstream.ok) {
      return NextResponse.json(
        { error: 'Upstream request failed', status: upstream.status, data },
        { status: 502 }
      )
    }

    return NextResponse.json(data)
  } catch (err) {
    return NextResponse.json(
      { error: 'Failed to reach Alex agent' },
      { status: 502 }
    )
  }
}
