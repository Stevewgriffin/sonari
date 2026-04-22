export default async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  const url = new URL(req.url)
  const recipientName = url.searchParams.get('recipient') || ''
  const senderEmail = url.searchParams.get('sender') || ''
  const titleFromQuery = url.searchParams.get('title') || ''

  let body
  try { body = await req.json() } catch {
    console.error('song-webhook: invalid JSON')
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400 })
  }

  const data = body?.data || body
  const state = data?.state

  if (state !== 'success') {
    console.log('song-webhook: non-success state', { state, recipientName, senderEmail })
    return new Response(JSON.stringify({ received: true, state: state || null }), { status: 200 })
  }

  let resultJson = data?.resultJson
  if (typeof resultJson === 'string') {
    try { resultJson = JSON.parse(resultJson) } catch {
      console.error('song-webhook: failed to parse resultJson string')
      resultJson = null
    }
  }

  const first = resultJson?.data?.[0] || {}
  const audioUrl = first.audio_url || null
  const imageUrl = first.image_url || null
  const sunoTitle = first.title || titleFromQuery || ''

  if (!audioUrl) {
    console.error('song-webhook: no audio_url in payload', JSON.stringify(body))
    return new Response(JSON.stringify({ error: 'No audio_url' }), { status: 200 })
  }

  const notifyEmail = process.env.NOTIFY_EMAIL
  if (!notifyEmail) {
    console.error('song-webhook: NOTIFY_EMAIL not set')
    return new Response(JSON.stringify({ error: 'NOTIFY_EMAIL not configured' }), { status: 200 })
  }

  const taskId = data?.taskId || data?.task_id || null
  const displayRecipient = recipientName || '—'
  const displayTitle = sunoTitle || '—'
  const displaySender = senderEmail || '—'

  const html = `
    <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 28px; color: #1a1510; background: #ded7c7;">
      <h1 style="font-size: 1.7rem; color: #5a421a; margin-bottom: 20px;">New Sonari Song Ready</h1>
      <p style="margin: 0 0 16px;">A commissioned song just finished rendering.</p>

      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <tr><td style="padding: 6px 12px 6px 0; color: #4a4238; width: 140px;">Recipient</td><td style="padding: 6px 0; font-weight: 500;">${displayRecipient}</td></tr>
        <tr><td style="padding: 6px 12px 6px 0; color: #4a4238;">Sender email</td><td style="padding: 6px 0; font-weight: 500;">${displaySender}</td></tr>
        <tr><td style="padding: 6px 12px 6px 0; color: #4a4238;">Song title</td><td style="padding: 6px 0; font-weight: 500;">${displayTitle}</td></tr>
        ${taskId ? `<tr><td style="padding: 6px 12px 6px 0; color: #4a4238;">Task ID</td><td style="padding: 6px 0; font-size: 0.85rem; color: #4a4238;">${taskId}</td></tr>` : ''}
      </table>

      <p style="margin: 0 0 8px;"><strong>MP3:</strong></p>
      <p style="margin: 0 0 20px;"><a href="${audioUrl}" style="color: #5a421a; font-weight: 600; word-break: break-all;">${audioUrl}</a></p>

      ${imageUrl ? `
      <p style="margin: 0 0 8px;"><strong>Cover art:</strong></p>
      <p style="margin: 0 0 20px;"><a href="${imageUrl}" style="color: #5a421a; font-weight: 600; word-break: break-all;">${imageUrl}</a></p>
      <p><img src="${imageUrl}" alt="cover art" style="max-width: 280px; border-radius: 8px;" /></p>
      ` : ''}
    </div>
  `

  const textBody = [
    `New Sonari song ready.`,
    ``,
    `Recipient: ${displayRecipient}`,
    `Sender email: ${displaySender}`,
    `Song title: ${displayTitle}`,
    taskId ? `Task ID: ${taskId}` : null,
    ``,
    `MP3: ${audioUrl}`,
    imageUrl ? `Cover art: ${imageUrl}` : null,
  ].filter(Boolean).join('\n')

  const subject = `New Sonari Song Ready — ${displayRecipient}`

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Sonari Songs <onboarding@resend.dev>',
        to: [notifyEmail],
        subject,
        text: textBody,
        html,
      }),
    })

    if (!res.ok) {
      const err = await res.text()
      console.error('song-webhook Resend error:', err)
    }
  } catch (err) {
    console.error('song-webhook email error:', err)
  }

  return new Response(JSON.stringify({ received: true, audioUrl, imageUrl }), { status: 200 })
}

export const config = { path: '/.netlify/functions/song-webhook' }
