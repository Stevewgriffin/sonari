export default async (req, context) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  let order
  try {
    order = await req.json()
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400 })
  }

  const {
    occasion, senderName, recipientName, relationship,
    birthYear, voiceGender, voiceStyle, genre, traits,
    loves, memory, feeling, tempo, length, lyricTone, lyricSeed, email
  } = order

  const html = `
    <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 32px; color: #1a1816;">
      <h1 style="font-size: 2rem; color: #86690f; margin-bottom: 4px;">New Sonari Order</h1>
      <p style="color: #706862; margin-bottom: 32px;">Submitted ${new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' })} CT</p>

      <h2 style="font-size: 1rem; text-transform: uppercase; letter-spacing: 0.1em; color: #86690f; margin-bottom: 12px;">Occasion & People</h2>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
        <tr><td style="padding: 6px 0; color: #706862; width: 140px;">Occasion</td><td style="padding: 6px 0; font-weight: 600;">${occasion}</td></tr>
        <tr><td style="padding: 6px 0; color: #706862;">From</td><td style="padding: 6px 0; font-weight: 600;">${senderName}</td></tr>
        <tr><td style="padding: 6px 0; color: #706862;">For</td><td style="padding: 6px 0; font-weight: 600;">${recipientName}</td></tr>
        <tr><td style="padding: 6px 0; color: #706862;">Relationship</td><td style="padding: 6px 0; font-weight: 600;">${relationship}</td></tr>
        <tr><td style="padding: 6px 0; color: #706862;">Customer email</td><td style="padding: 6px 0; font-weight: 600;">${email}</td></tr>
      </table>

      <h2 style="font-size: 1rem; text-transform: uppercase; letter-spacing: 0.1em; color: #86690f; margin-bottom: 12px;">Musical DNA</h2>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
        <tr><td style="padding: 6px 0; color: #706862; width: 140px;">Birth year</td><td style="padding: 6px 0; font-weight: 600;">${birthYear}</td></tr>
        <tr><td style="padding: 6px 0; color: #706862;">Voice</td><td style="padding: 6px 0; font-weight: 600;">${voiceStyle} (${voiceGender})</td></tr>
        <tr><td style="padding: 6px 0; color: #706862;">Genre</td><td style="padding: 6px 0; font-weight: 600;">${genre}</td></tr>
        <tr><td style="padding: 6px 0; color: #706862;">Traits</td><td style="padding: 6px 0; font-weight: 600;">${(traits || []).join(', ')}</td></tr>
        <tr><td style="padding: 6px 0; color: #706862;">They love</td><td style="padding: 6px 0; font-weight: 600;">${loves || '—'}</td></tr>
        <tr><td style="padding: 6px 0; color: #706862;">Memory</td><td style="padding: 6px 0; font-weight: 600;">${memory || '—'}</td></tr>
        <tr><td style="padding: 6px 0; color: #706862;">Feeling</td><td style="padding: 6px 0; font-weight: 600;">${feeling}</td></tr>
      </table>

      <h2 style="font-size: 1rem; text-transform: uppercase; letter-spacing: 0.1em; color: #86690f; margin-bottom: 12px;">Song Style</h2>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 32px;">
        <tr><td style="padding: 6px 0; color: #706862; width: 140px;">Tempo</td><td style="padding: 6px 0; font-weight: 600;">${tempo}</td></tr>
        <tr><td style="padding: 6px 0; color: #706862;">Length</td><td style="padding: 6px 0; font-weight: 600;">${length}</td></tr>
        <tr><td style="padding: 6px 0; color: #706862;">Lyric tone</td><td style="padding: 6px 0; font-weight: 600;">${lyricTone}</td></tr>
        ${lyricSeed ? `<tr><td style="padding: 6px 0; color: #706862;">Lyric seed</td><td style="padding: 6px 0; font-weight: 600;">${lyricSeed}</td></tr>` : ''}
      </table>

      <div style="background: #ede6d4; border-radius: 8px; padding: 16px 20px;">
        <p style="margin: 0; font-size: 0.9rem; color: #3d3832;">
          <strong>Reply to ${email}</strong> with their song when it's ready.
        </p>
      </div>
    </div>
  `

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Sonari Orders <orders@sonarimusic.com>',
        to: ['stevewgriffin@gmail.com'],
        reply_to: email,
        subject: `New Sonari — ${occasion} for ${recipientName}`,
        html,
      }),
    })

    if (!res.ok) {
      const err = await res.text()
      console.error('Resend error:', err)
      return new Response(JSON.stringify({ error: 'Email failed' }), { status: 500 })
    }

    return new Response(JSON.stringify({ ok: true }), { status: 200 })
  } catch (err) {
    console.error('Submit order error:', err)
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 })
  }
}

export const config = { path: '/api/submit-order' }
