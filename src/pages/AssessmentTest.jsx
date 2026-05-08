import { useState } from 'react'
import Assessment from '../components/Assessment/Assessment'

export default function AssessmentTest() {
  const [ageRange, setAgeRange] = useState('18-24')
  const [showAssessment, setShowAssessment] = useState(false)
  const [result, setResult] = useState(null)

  const handleAssessmentComplete = (responses) => {
    console.log('Assessment complete! Responses:', responses)
    setResult(responses)
    setShowAssessment(false)
  }

  if (showAssessment) {
    return (
      <Assessment
        respondentId={`test-${Date.now()}`}
        ageRange={ageRange}
        onAssessmentComplete={handleAssessmentComplete}
      />
    )
  }

  return (
    <div style={{ minHeight: '100vh', padding: '40px 20px', background: '#1a1a1a', color: '#faf6f1' }}>
      <div style={{ maxWidth: 600, margin: '0 auto' }}>
        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '2rem', marginBottom: 32 }}>AlignIQ Assessment Test</h1>

        <div style={{ marginBottom: 32 }}>
          <label style={{ display: 'block', marginBottom: 12 }}>
            <strong>Select Age Range:</strong>
          </label>
          <select
            value={ageRange}
            onChange={e => setAgeRange(e.target.value)}
            style={{
              padding: '10px 12px',
              fontSize: '1rem',
              borderRadius: 6,
              border: '1px solid #d4af37',
              background: '#2a2a2a',
              color: '#faf6f1',
              cursor: 'pointer',
              width: '100%',
            }}
          >
            <option value="18-24">18-24 Years Old</option>
            <option value="25-34">25-34 Years Old</option>
            <option value="35-44">35-44 Years Old</option>
            <option value="45+">45+ Years Old</option>
          </select>
        </div>

        <button
          onClick={() => setShowAssessment(true)}
          style={{
            padding: '12px 24px',
            fontSize: '1rem',
            background: '#d4af37',
            color: '#1a1a1a',
            border: 'none',
            borderRadius: 6,
            cursor: 'pointer',
            fontWeight: '600',
            width: '100%',
          }}
        >
          Start Assessment
        </button>

        {result && (
          <div
            style={{
              marginTop: 40,
              padding: 24,
              border: '1px solid #d4af37',
              borderRadius: 8,
              background: 'rgba(212, 175, 55, 0.05)',
            }}
          >
            <h2 style={{ marginTop: 0 }}>Assessment Results</h2>
            <p>
              <strong>Total responses:</strong> {Object.keys(result).length} / 62
            </p>
            <p>
              <strong>Response IDs (first 10):</strong>
            </p>
            <pre style={{ background: '#2a2a2a', padding: 12, borderRadius: 4, overflow: 'auto' }}>
              {JSON.stringify(Object.entries(result).slice(0, 10), null, 2)}
            </pre>
            <button
              onClick={() => setResult(null)}
              style={{
                marginTop: 16,
                padding: '10px 20px',
                fontSize: '0.95rem',
                background: '#666',
                color: '#faf6f1',
                border: 'none',
                borderRadius: 4,
                cursor: 'pointer',
              }}
            >
              Clear Results
            </button>
          </div>
        )}

        <div style={{ marginTop: 40, padding: 24, background: '#2a2a2a', borderRadius: 8, fontSize: '0.9rem' }}>
          <h3 style={{ marginTop: 0 }}>Test Info:</h3>
          <ul>
            <li>Select an age range and click "Start Assessment" to test the component</li>
            <li>Each age range loads a different contextualized question bank</li>
            <li>Responses are auto-saved in localStorage using your respondent ID</li>
            <li>The assessment randomizes questions based on respondent ID (same ID = same order)</li>
            <li>Results show basic response capture; in production, scoring would happen here</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
