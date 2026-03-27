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
  'Review & Pay',
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

function canAdvance(step, data) {
  switch (step) {
    case 0: return !!data.occasion
    case 1: return data.senderName.trim() && data.recipientName.trim() && data.relationship
    case 2: return data.birthYear && data.voiceGender && data.voiceStyle && data.genre && (data.traits || []).length > 0 && data.feeling
    case 3: return data.tempo && data.lyricTone
    default: return true
  }
}

export default function Commission() {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [data, setData] = useState(INITIAL)

  const update = (fields) => setData(prev => ({ ...prev, ...fields }))

  const next = () => { if (step < 4 && canAdvance(step, data)) setStep(s => s + 1); window.scrollTo(0, 0) }
  const prev = () => { if (step > 0) setStep(s => s - 1); window.scrollTo(0, 0) }

  const handleSubmit = () => {
    // Phase 2: this will call create-checkout Netlify Function → Stripe
    alert('Payment integration coming in Phase 2. Your song data is ready!')
    console.log('Sonari order data:', data)
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
        {step === 4 && <StepReviewPay data={data} />}

        {/* Navigation */}
        <div className="btn-row">
          {step === 0 ? (
            <button className="btn btn-outline" onClick={() => navigate('/')}>Back to Home</button>
          ) : (
            <button className="btn btn-outline" onClick={prev}>Back</button>
          )}

          {step < 4 ? (
            <button
              className="btn btn-gold"
              onClick={next}
              disabled={!canAdvance(step, data)}
            >
              Continue
            </button>
          ) : (
            <button className="btn btn-gold" onClick={handleSubmit}>
              Pay $25 & Create My Sonari
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
