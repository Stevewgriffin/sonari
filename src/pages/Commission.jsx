import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import StepRecipient from '../components/IntakeForm/StepRecipient'
import StepCharacter from '../components/IntakeForm/StepCharacter'
import StepMoments from '../components/IntakeForm/StepMoments'
import StepSound from '../components/IntakeForm/StepSound'
import StepGift from '../components/IntakeForm/StepGift'

const STEP_TITLES = [
  'The Recipient',
  'Who They Are',
  'The Moments That Matter',
  'The Sound',
  'The Gift',
]

const INITIAL = {
  // Step 1 — The Recipient
  recipientName: '',
  relationship: '',
  gender: '',
  birthDecade: '',
  birthDate: '',
  occasion: '',
  // Step 2 — Who They Are
  atBest: '',
  driver: '',
  hardTimes: '',
  signature: '',
  // Step 3 — The Moments
  memory: '',
  hardSeason: '',
  gratitude: '',
  // Step 4 — The Sound
  vocalStyle: '',
  genre: '',
  tempo: '',
  // Step 5 — The Gift
  feeling: '',
  extras: '',
  senderName: '',
  email: '',
}

function getMissing(step, data) {
  const m = []
  switch (step) {
    case 0:
      if (!data.recipientName.trim()) m.push("recipient's name")
      if (!data.relationship) m.push('relationship')
      if (!data.gender) m.push("recipient's gender")
      if (!data.birthDecade) m.push('birth decade')
      if (!data.occasion) m.push('occasion')
      break
    case 1:
      if (!data.atBest.trim()) m.push('what they do at their best')
      if (!data.driver) m.push('what drives them')
      if (!data.signature.trim()) m.push("something that's unmistakably them")
      break
    case 2:
      if (!data.memory.trim()) m.push('a shared moment')
      if (!data.gratitude.trim()) m.push('something you want them to know you noticed')
      break
    case 3:
      if (!data.vocalStyle) m.push('vocal style')
      if (!data.genre.trim()) m.push('genre or style')
      if (!data.tempo) m.push('tempo')
      break
    case 4:
      if (!data.feeling) m.push('what you want them to feel')
      if (!data.senderName.trim()) m.push('your name')
      if (!data.email || !data.email.includes('@')) m.push('a valid email')
      break
  }
  return m
}

export default function Commission() {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [data, setData] = useState(INITIAL)
  const [showMissing, setShowMissing] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const update = (fields) => { setData(prev => ({ ...prev, ...fields })); setShowMissing(false) }

  const missing = getMissing(step, data)
  const canAdvance = missing.length === 0

  const next = () => {
    if (step >= 4) return
    if (!canAdvance) { setShowMissing(true); return }
    setShowMissing(false)
    setStep(s => s + 1)
    window.scrollTo(0, 0)
  }
  const prev = () => { if (step > 0) { setStep(s => s - 1); setShowMissing(false); window.scrollTo(0, 0) } }

  const handleSubmit = () => {
    if (!canAdvance) { setShowMissing(true); return }
    if (submitting || submitted) return
    setSubmitting(true)
    const order = { ...data, submittedAt: new Date().toISOString() }
    // Flip to the confirmation screen immediately; the backend chain (email +
    // Claude + APIPASS) can take 15-20s, and blocking the UI that long makes
    // users think the form is broken. Fire the request and let it finish
    // independently.
    fetch('/api/submit-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order),
      keepalive: true,
    }).catch(err => console.error('Submit error:', err))
    setSubmitted(true)
    setSubmitting(false)
    window.scrollTo(0, 0)
  }

  if (submitted) {
    return (
      <div style={{ minHeight: '100vh', paddingTop: 20 }}>
        <div className="container">
          <div className="form-header">
            <div className="wordmark">Sonari</div>
          </div>
          <div style={{ textAlign: 'center', padding: '48px 0' }}>
            <div style={{ fontSize: '3rem', marginBottom: 16 }}>♪</div>
            <h1 style={{ fontFamily: 'var(--serif)', fontSize: '2rem', marginBottom: 12 }}>You're in the beta.</h1>
            <p style={{ color: 'var(--cream-muted)', marginBottom: 8 }}>
              We received your song brief for <strong>{data.recipientName}</strong>.
            </p>
            <p style={{ color: 'var(--cream-muted)', marginBottom: 32 }}>
              We'll be in touch at <strong>{data.email}</strong> when your Sonari is ready.
            </p>
            <div style={{ background: 'var(--gold-faint)', borderRadius: 12, padding: '20px 24px', maxWidth: 400, margin: '0 auto 32px', textAlign: 'left' }}>
              <p style={{ fontSize: '0.85rem', color: 'var(--cream-dim)', margin: 0, lineHeight: 1.7 }}>
                <strong>What happens next:</strong><br />
                Our team will use your brief to create a one-of-a-kind song for {data.recipientName}.
                Once it's ready, you'll receive a link to your personalized song and digital card.
              </p>
            </div>
            <button className="btn btn-outline" onClick={() => navigate('/')}>Back to Home</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', paddingTop: 20 }}>
      <div className="container">
        {/* Header */}
        <div className="form-header">
          <div className="wordmark">Sonari</div>
          <h1>{STEP_TITLES[step]}</h1>
          <div className="subtitle">Step {step + 1} of 5</div>
        </div>

        {/* Progress dots */}
        <div className="step-progress">
          {[0, 1, 2, 3, 4].map(i => (
            <div
              key={i}
              className={`step-dot${i === step ? ' active' : ''}${i < step ? ' done' : ''}`}
            />
          ))}
        </div>

        {/* Step content */}
        {step === 0 && <StepRecipient data={data} onChange={update} />}
        {step === 1 && <StepCharacter data={data} onChange={update} />}
        {step === 2 && <StepMoments data={data} onChange={update} />}
        {step === 3 && <StepSound data={data} onChange={update} />}
        {step === 4 && <StepGift data={data} onChange={update} />}

        {/* Missing fields hint */}
        {showMissing && missing.length > 0 && (
          <div className="missing-hint">
            Please complete: {missing.join(', ')}
          </div>
        )}

        {/* Navigation */}
        <div className="btn-row">
          {step === 0 ? (
            <button className="btn btn-outline" onClick={() => navigate('/')}>Back to Home</button>
          ) : (
            <button className="btn btn-outline" onClick={prev}>Back</button>
          )}

          {step < 4 ? (
            <button className="btn btn-gold" onClick={next}>
              Continue
            </button>
          ) : (
            <button className="btn btn-gold" onClick={handleSubmit} disabled={submitting}>
              {submitting ? 'Sending…' : 'Request My Sonari (Beta)'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
