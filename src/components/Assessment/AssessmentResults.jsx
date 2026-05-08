import { calculateDriverScores, getDriverInsight } from '../../utils/assessmentScoring'
import { getArchetype } from '../../utils/archetypeDefinitions'
import './Assessment.css'

export default function AssessmentResults({ responses, onContinue }) {
  const profile = calculateDriverScores(responses)
  const archetype = getArchetype({
    primaryDriver: profile.primaryDriver,
    secondaryDriver: profile.secondaryDriver,
    tertiaryDriver: profile.tertiaryDriver,
  })

  if (!archetype) {
    return (
      <div className="assessment-container">
        <div className="assessment-content">
          <div style={{ textAlign: 'center', padding: '40px 20px' }}>
            <p>Unable to generate your report. Please try again.</p>
            <button className="btn btn-outline" onClick={onContinue} style={{ marginTop: 20 }}>
              Back
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="assessment-container">

      <div className="assessment-content">
        <div className="results-container">
          {/* Archetype Hero */}
          <div className="archetype-hero">
            <div className="archetype-label">You Are A</div>
            <div className="archetype-name">{archetype.name}</div>
            <div className="archetype-tagline">{archetype.tagline}</div>
          </div>

          {/* Archetype Summary */}
          <div className="archetype-section summary-section">
            <p className="archetype-summary">{archetype.summary}</p>
          </div>

          {/* Driver Breakdown */}
          <div className="driver-breakdown">
            <h2>Your Driver Profile</h2>
            <div className="driver-trio">
              <div className="driver-position primary-pos">
                <div className="driver-position-label">Primary</div>
                <div className="driver-position-name">{profile.primaryDriver}</div>
                <div className="driver-position-score">{profile.normalized[profile.primaryDriver]}</div>
              </div>
              <div className="driver-position secondary-pos">
                <div className="driver-position-label">Secondary</div>
                <div className="driver-position-name">{profile.secondaryDriver}</div>
                <div className="driver-position-score">{profile.normalized[profile.secondaryDriver]}</div>
              </div>
              <div className="driver-position tertiary-pos">
                <div className="driver-position-label">Tertiary</div>
                <div className="driver-position-name">{profile.tertiaryDriver}</div>
                <div className="driver-position-score">{profile.normalized[profile.tertiaryDriver]}</div>
              </div>
            </div>
          </div>

          {/* Strengths and Considerations */}
          <div className="archetype-section">
            <h3>Your Strengths</h3>
            <ul className="archetype-list">
              {archetype.strengths.map((strength, idx) => (
                <li key={idx}>{strength}</li>
              ))}
            </ul>
          </div>

          <div className="archetype-section">
            <h3>Things to Consider</h3>
            <ul className="archetype-list considerations-list">
              {archetype.considerations.map((consideration, idx) => (
                <li key={idx}>{consideration}</li>
              ))}
            </ul>
          </div>

          {/* Context Cards */}
          <div className="context-cards">
            <div className="context-card">
              <h4>At Work</h4>
              <p>{archetype.atWork}</p>
            </div>
            <div className="context-card">
              <h4>In Relationships</h4>
              <p>{archetype.inRelationships}</p>
            </div>
          </div>

          {/* Closing */}
          <div className="results-info">
            <p>
              Your unique combination of life drivers shapes how you experience meaning, what fulfills you, and how you
              navigate the world. Understanding your archetype helps you make choices that align with what truly matters
              to you.
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="assessment-nav">
          <button className="btn btn-gold" onClick={onContinue}>
            Done
          </button>
        </div>
      </div>
    </div>
  )
}
