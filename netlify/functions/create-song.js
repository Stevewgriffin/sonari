const APIPASS_ENDPOINT = 'https://api.apipass.dev/api/v1/jobs/createTask'
const CALLBACK_BASE = 'https://sonari-music-group.netlify.app/.netlify/functions/song-webhook'

export default async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  let body
  try { body = await req.json() } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400 })
  }

  const { lyrics, title, style, senderEmail, recipientName, vocalGender } = body

  if (!lyrics || !title || !style) {
    return new Response(JSON.stringify({ error: 'Missing lyrics, title, or style' }), { status: 400 })
  }

  const gender = vocalGender === 'f' ? 'f' : 'm'

  // Encode display context in the callback URL so the webhook can render a
  // complete notification email without an external store.
  const callbackUrl = new URL(CALLBACK_BASE)
  if (recipientName) callbackUrl.searchParams.set('recipient', recipientName)
  if (senderEmail) callbackUrl.searchParams.set('sender', senderEmail)
  if (title) callbackUrl.searchParams.set('title', title)

  try {
    const res = await fetch(APIPASS_ENDPOINT, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.APIPASS_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'suno/generate',
        callBackUrl: callbackUrl.toString(),
        input: {
          model_version: 'V5',
          prompt: lyrics,
          customMode: true,
          instrumental: false,
          style,
          title,
          vocalGender: gender,
        },
      }),
    })

    const text = await res.text()
    let payload
    try { payload = JSON.parse(text) } catch { payload = { raw: text } }

    if (!res.ok) {
      console.error('APIPASS error:', res.status, text)
      return new Response(JSON.stringify({ error: 'Song creation failed', status: res.status, payload }), { status: 500 })
    }

    const taskId = payload?.data?.taskId || payload?.taskId || null
    if (!taskId) {
      console.error('No taskId in APIPASS response:', text)
      return new Response(JSON.stringify({ error: 'No taskId returned', payload }), { status: 500 })
    }

    console.log('APIPASS task created', { taskId, recipientName, senderEmail, title })

    return new Response(JSON.stringify({ taskId }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (err) {
    console.error('create-song error:', err)
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 })
  }
}

export const config = { path: '/api/create-song' }
