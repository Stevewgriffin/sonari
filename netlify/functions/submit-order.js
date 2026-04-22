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
    // The Recipient
    recipientName, relationship, gender, birthDecade, birthDate, occasion,
    // Who They Are
    atBest, driver, hardTimes, signature,
    // The Moments
    memory, hardSeason, gratitude,
    // The Sound
    vocalStyle, genre, tempo,
    // The Gift
    feeling, extras, senderName, email,
  } = order

  const genderLabel = { m: 'Male', f: 'Female' }[gender] || '—'

  const driverLabel = {
    ambition: 'Ambition — driven by achieving things and moving toward their goals',
    approval: 'Approval — driven by people, belonging, being loved, being accepted',
    appetite: 'Appetite — driven by enjoying life, experiences, pleasures, the good things',
  }[driver] || driver || '—'

  const row = (label, value) => `
    <tr>
      <td style="padding: 8px 12px 8px 0; color: #4a4238; width: 180px; vertical-align: top;">${label}</td>
      <td style="padding: 8px 0; color: #1a1510; font-weight: 500;">${value || '—'}</td>
    </tr>
  `

  const html = `
    <div style="font-family: Georgia, serif; max-width: 640px; margin: 0 auto; padding: 32px; color: #1a1510; background: #ded7c7;">
      <h1 style="font-size: 1.8rem; color: #5a421a; margin-bottom: 4px;">New Sonari Order</h1>
      <p style="color: #4a4238; margin-bottom: 32px;">Submitted ${new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' })} CT</p>

      <h2 style="font-size: 0.9rem; text-transform: uppercase; letter-spacing: 0.12em; color: #5a421a; margin-bottom: 12px;">The Recipient</h2>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
        ${row('Recipient', recipientName)}
        ${row('Relationship', relationship)}
        ${row('Gender', genderLabel)}
        ${row('Birth decade', birthDecade)}
        ${row('Exact birth date', birthDate)}
        ${row('Occasion', occasion)}
      </table>

      <h2 style="font-size: 0.9rem; text-transform: uppercase; letter-spacing: 0.12em; color: #5a421a; margin-bottom: 12px;">Who They Are</h2>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
        ${row('At their best', atBest)}
        ${row('Primary driver', driverLabel)}
        ${row('When life gets hard', hardTimes)}
        ${row('Unmistakably them', signature)}
      </table>

      <h2 style="font-size: 0.9rem; text-transform: uppercase; letter-spacing: 0.12em; color: #5a421a; margin-bottom: 12px;">The Moments That Matter</h2>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
        ${row('Shared moment', memory)}
        ${row('Hard season / turning point', hardSeason)}
        ${row('What you want them to know', gratitude)}
      </table>

      <h2 style="font-size: 0.9rem; text-transform: uppercase; letter-spacing: 0.12em; color: #5a421a; margin-bottom: 12px;">The Sound</h2>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
        ${row('Vocal style', vocalStyle)}
        ${row('Genre / style', genre)}
        ${row('Tempo', tempo)}
      </table>

      <h2 style="font-size: 0.9rem; text-transform: uppercase; letter-spacing: 0.12em; color: #5a421a; margin-bottom: 12px;">The Gift</h2>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 32px;">
        ${row('Feeling to leave them with', feeling)}
        ${row('Anything else', extras)}
        ${row('From', senderName)}
        ${row('Customer email', email)}
      </table>

      <div style="background: #c5b699; border-radius: 8px; padding: 16px 20px;">
        <p style="margin: 0; font-size: 0.9rem; color: #1a1510;">
          <strong>Reply to ${email}</strong> with ${recipientName}'s song when it's ready.
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
        from: 'Sonari Orders <onboarding@resend.dev>',
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

    const siteUrl = process.env.URL || 'https://sonari-music-group.netlify.app'
    let song = null
    try {
      const analyze = await fetch(`${siteUrl}/api/analyze-submission`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order),
      })
      if (!analyze.ok) {
        console.error('analyze-submission non-OK:', analyze.status, await analyze.text())
      } else {
        song = await analyze.json()
      }
    } catch (chainErr) {
      console.error('Chain to analyze-submission failed:', chainErr)
    }

    if (song?.lyrics && song?.title && song?.style) {
      try {
        const create = await fetch(`${siteUrl}/api/create-song`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            lyrics: song.lyrics,
            title: song.title,
            style: song.style,
            senderEmail: email,
            recipientName,
            vocalGender: gender === 'f' ? 'f' : 'm',
          }),
        })
        if (!create.ok) {
          console.error('create-song non-OK:', create.status, await create.text())
        }
      } catch (chainErr) {
        console.error('Chain to create-song failed:', chainErr)
      }
    }

    return new Response(JSON.stringify({ ok: true }), { status: 200 })
  } catch (err) {
    console.error('Submit order error:', err)
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 })
  }
}

export const config = { path: '/api/submit-order' }
