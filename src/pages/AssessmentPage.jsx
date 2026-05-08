import { useState } from 'react'
import Assessment from '../components/Assessment/Assessment'
import './AssessmentPage.css'

export default function AssessmentPage() {
  const [stage, setStage] = useState('intro') // 'intro', 'demographics', 'assessment', 'results'
  const [respondentData, setRespondentData] = useState({
    name: '',
    email: '',
    ageRange: '25-34',
  })
  const [responses, setResponses] = useState(null)

  const handleStartAssessment = () => {
    if (!respondentData.name.trim()) {
      alert('Please enter your name')
      return
    }
    if (!respondentData.email.trim() || !respondentData.email.includes('@')) {
      alert('Please enter a valid email')
      return
    }
    setStage('assessment')
  }

  const handleAssessmentComplete = (finalResponses) => {
    setResponses(finalResponses)
    setStage('results')
  }

  if (stage === 'intro') {
    return (
      <div className="assessment-page">
        <div className="assessment-page-container">
          <div className="wordmark">Sonari</div>

          <div className="intro-content">
            <h1>Discover Your Life Drivers</h1>
            <p className="intro-subtitle">Understand what motivates you with the AlignIQ Assessment</p>

            <div className="intro-box">
              <h2>What are Life Drivers?</h2>
              <p>
                Your Life Drivers are the fundamental forces that shape your decisions, relationships, and sense of
                fulfillment. We measure three core drivers:
              </p>

              <div className="drivers-preview">
                <div className="driver-preview-card">
                  <div className="driver-preview-name">Appetite</div>
                  <p>What experiences, sensations, and pleasures energize you?</p>
                </div>
                <div className="driver-preview-card">
                  <div className="driver-preview-name">Approval</div>
                  <p>How much do connection and others' perception matter to you?</p>
                </div>
                <div className="driver-preview-card">
                  <div className="driver-preview-name">Ambition</div>
                  <p>What drives your pursuit of achievement and impact?</p>
                </div>
              </div>

              <p style={{ fontSize: '0.95rem', marginTop: 24, lineHeight: 1.6 }}>
                The AlignIQ Assessment uses 62 carefully designed questions to measure these drivers and generate your
                personalized Life Driver Report.
              </p>
            </div>

            <button className="btn btn-gold" onClick={() => setStage('demographics')} style={{ width: '100%' }}>
              Begin Assessment
            </button>

            <p style={{ textAlign: 'center', fontSize: '0.85rem', color: 'var(--cream-muted)', marginTop: 16 }}>
              Takes about 8-10 minutes
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (stage === 'demographics') {
    return (
      <div className="assessment-page">
        <div className="assessment-page-container">
          <div className="wordmark">Sonari</div>

          <div className="demographics-content">
            <h2>Your Information</h2>
            <p style={{ color: 'var(--cream-muted)', marginBottom: 24 }}>We'll use this to personalize your assessment</p>

            <div className="field">
              <label>Your Name</label>
              <input
                type="text"
                value={respondentData.name}
                onChange={e => setRespondentData({ ...respondentData, name: e.target.value })}
                placeholder="First and last name"
              />
            </div>

            <div className="field">
              <label>Email Address</label>
              <input
                type="email"
                value={respondentData.email}
                onChange={e => setRespondentData({ ...respondentData, email: e.target.value })}
                placeholder="your@email.com"
              />
            </div>

            <div className="field">
              <label>Age Group</label>
              <select
                value={respondentData.ageRange}
                onChange={e => setRespondentData({ ...respondentData, ageRange: e.target.value })}
              >
                <option value="18-24">18-24 years old</option>
                <option value="25-34">25-34 years old</option>
                <option value="35-44">35-44 years old</option>
                <option value="45+">45+ years old</option>
              </select>
            </div>

            <div className="demographics-buttons">
              <button className="btn btn-outline" onClick={() => setStage('intro')}>
                Back
              </button>
              <button className="btn btn-gold" onClick={handleStartAssessment}>
                Start Assessment
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (stage === 'assessment') {
    return (
      <Assessment
        respondentId={`${respondentData.name}-${Date.now()}`}
        ageRange={respondentData.ageRange}
        onAssessmentComplete={handleAssessmentComplete}
      />
    )
  }

  return null
}
