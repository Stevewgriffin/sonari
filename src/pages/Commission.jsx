import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import StepOccasion from '../components/IntakeForm/StepOccasion'
import StepPeople from '../components/IntakeForm/StepPeople'
import StepMusicalDNA from '../components/IntakeForm/StepMusicalDNA'
import StepSongStyle from '../components/IntakeForm/StepSongStyle'
import StepReviewPay from '../components/IntakeForm/StepReviewPay'

const STEP_TITLES = [
  'Choose the Occasion',
  'The People',
  'Musical DNA & Character',
  'Song Style',
  'Review & Submit',
]

const INITIAL = {
  occasion: '',
  senderName: '',
  recipientName: '',
  relationship: '',
  birthYear: '',
  voiceGender: '',
  voiceStyle: '',
  genre: '',
  traits: [],
  loves: '',
  memory: '',
  feeling: '',
  tempo: '',
  length: '2:30',
  lyricTone: '',
  lyricSeed: '',
  email: '',
}

function getMissing(step, data) {
  const m = []
  switch (step) {
    case 0: if (!data.occasion) m.push('occasion'); break
    case 1:
      if (!data.senderName.trim()) m.push('your name')
      if (!data.recipientName.trim()) m.push("recipient's name")
      if (!data.relationship) m.push('relationship')
      break
    case 2:
      if (!data.birthYear) m.push('birth year')
      if (!data.voiceGender) m.push('voice gender')
      if (!data.voiceStyle) m.push('voice style')
      if (!data.genre) m.push('genre')
      if (!(data.traits || []).length) m.push('at least one trait')
      if (!data.feeling) m.push('feeling')
      break
    case 3:
      if (!data.tempo) m.push('tempo')
      if (!data.lyricTone) m.push('lyric tone')
      break
    case 4:
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

  const handleSubmit = async () => {
    if (!canAdvance) { setShowMissing(true); return }
    const order = { ...data, submittedAt: new Date().toISOString() }
    try {
      await fetch('/api/submit-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order),
      })
    } catch (err) {
      console.error('Submit error:', err)
    }
    setSubmitted(true)
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
        {step === 0 && <StepOccasion data={data} onChange={update} />}
        {step === 1 && <StepPeople data={data} onChange={update} />}
        {step === 2 && <StepMusicalDNA data={data} onChange={update} />}
        {step === 3 && <StepSongStyle data={data} onChange={update} />}
        {step === 4 && <StepReviewPay data={data} onChange={update} />}

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
            <button className="btn btn-gold" onClick={handleSubmit}>
              Request My Sonari (Beta)
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
