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

  let body: { messages?: { role: string; content: string }[] }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  // The Alex API expects a single `message` string — extract the last user message
  const messages = body?.messages ?? []
  const lastUserMessage = [...messages].reverse().find((m) => m.role === 'user')

  if (!lastUserMessage?.content?.trim()) {
    return NextResponse.json(
      { error: 'No user message found in request' },
      { status: 400 }
    )
  }

  const origin =
    req.headers.get('origin') ||
    (req.headers.get('host') ? `https://${req.headers.get('host')}` : '')

  try {
    const upstream = await fetch(AGENT_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
        ...(origin ? { Origin: origin } : {}),
      },
      body: JSON.stringify({ message: lastUserMessage.content }),
    })

    const data = await upstream.json().catch(() => ({}))

    if (!upstream.ok) {
      console.error('Alex upstream error', {
        status: upstream.status,
        data,
        origin,
      })
      return NextResponse.json(
        { error: 'Upstream request failed', status: upstream.status, data },
        { status: 502 }
      )
    }

    return NextResponse.json(data)
  } catch (err) {
    console.error('Alex proxy fetch threw', err)
    return NextResponse.json(
      { error: 'Failed to reach Alex agent' },
      { status: 502 }
    )
  }
}
