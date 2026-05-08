import { useState } from 'react'
import { DRIVERS } from '../../utils/formData'
import Assessment from '../Assessment/Assessment'
import { calculateDriverScores, getScoreDescription } from '../../utils/assessmentScoring'

export default function StepCharacterEnhanced({ data, onChange }) {
  const [showAssessment, setShowAssessment] = useState(false)
  const [assessmentResults, setAssessmentResults] = useState(null)

  const name = data.recipientName?.trim() || 'them'

  const handleAssessmentComplete = (responses) => {
    const profile = calculateDriverScores(responses)
    setAssessmentResults(profile)
    setShowAssessment(false)

    // Auto-select the primary driver
    const driverId = profile.primaryDriver.toLowerCase()
    onChange({ driver: driverId })
  }

  // Map birth decade to age range for assessment
  const getAgeRangeForAssessment = () => {
    const decade = data.birthDecade
    if (!decade) return '25-34' // default

    if (decade === '2000s') return '18-24'
    if (decade === '1990s') return '25-34'
    if (decade === '1980s') return '35-44'
    return '45+' // 1970s and earlier
  }

  if (showAssessment) {
    return (
      <Assessment
        respondentId={`recipient-${data.recipientName || 'unknown'}`}
        ageRange={getAgeRangeForAssessment()}
        onAssessmentComplete={handleAssessmentComplete}
      />
    )
  }

  return (
    <div>
      <p className="section-label">Who They Are</p>

      <div className="field">
        <label>When {name} is at their best, what are they usually doing or talking about?</label>
        <textarea
          value={data.atBest}
          onChange={e => onChange({ atBest: e.target.value })}
          placeholder="This helps us write lyrics that sound like them, not just about them."
          rows={3}
        />
      </div>

      <div className="field">
        <label>What drives {name} most?</label>
        <p style={{ fontSize: '0.9rem', color: 'var(--cream-muted)', marginBottom: 16 }}>
          Pick one of these, or take the assessment below to determine it more precisely.
        </p>
        <div className="voice-grid">
          {DRIVERS.map(d => (
            <div
              key={d.id}
              className={`voice-card${data.driver === d.id ? ' selected' : ''}`}
              onClick={() => onChange({ driver: d.id })}
            >
              <div className="voice-desc">{d.label}</div>
            </div>
          ))}
        </div>

        {/* Assessment Offer */}
        {!assessmentResults && (
          <div
            style={{
              marginTop: 20,
              padding: 16,
              borderRadius: 8,
              background: 'var(--cream-dim)',
              border: '1px solid var(--cream-muted)',
            }}
          >
            <p style={{ margin: '0 0 12px 0', fontSize: '0.95rem' }}>
              <strong>Not sure which driver fits best?</strong> Take the assessment to learn more about {name}'s
              motivations.
            </p>
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => setShowAssessment(true)}
              style={{ fontSize: '0.9rem', padding: '8px 16px' }}
            >
              Take Assessment
            </button>
          </div>
        )}

        {/* Assessment Results Display */}
        {assessmentResults && (
          <div
            style={{
              marginTop: 20,
              padding: 16,
              borderRadius: 8,
              background: 'rgba(212, 175, 55, 0.1)',
              border: '1px solid var(--gold)',
            }}
          >
            <p style={{ margin: '0 0 8px 0', fontSize: '0.9rem', color: 'var(--gold)' }}>
              <strong>✓ Assessment Complete</strong>
            </p>
            <p style={{ margin: '8px 0', fontSize: '0.9rem' }}>
              Primary driver: <strong>{assessmentResults.primaryDriver}</strong> (
              {assessmentResults.normalized[assessmentResults.primaryDriver]}/100)
            </p>
            <p style={{ margin: '0 0 12px 0', fontSize: '0.85rem', color: 'var(--cream-muted)' }}>
              Secondary: {assessmentResults.secondaryDriver} ({assessmentResults.normalized[assessmentResults.secondaryDriver]}/100)
            </p>
            <button
              type="button"
              className="btn btn-text"
              onClick={() => {
                setAssessmentResults(null)
                setShowAssessment(true)
              }}
              style={{ fontSize: '0.85rem', color: 'var(--gold)' }}
            >
              Retake Assessment
            </button>
          </div>
        )}
      </div>

      <div className="field">
        <label>When life gets hard for {name}, what does it usually come back to?</label>
        <textarea
          value={data.hardTimes}
          onChange={e => onChange({ hardTimes: e.target.value })}
          placeholder="What do they worry about, protect, or fight for? (optional)"
          rows={3}
        />
      </div>

      <div className="field">
        <label>What's something {name} does or says that is completely, unmistakably them?</label>
        <textarea
          value={data.signature}
          onChange={e => onChange({ signature: e.target.value })}
          placeholder="A habit, a phrase, a way of being."
          rows={3}
        />
      </div>
    </div>
  )
}
