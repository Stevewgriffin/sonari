import { calculateDriverScores, getDriverInsight, getScoreDescription } from '../../utils/assessmentScoring'
import './Assessment.css'

export default function AssessmentResults({ responses, onContinue }) {
  const profile = calculateDriverScores(responses)

  return (
    <div className="assessment-container">
      <div className="assessment-header">
        <div className="wordmark">Sonari</div>
        <h1 style={{ textAlign: 'center', fontFamily: 'Georgia, serif', fontSize: '2rem', margin: '20px 0' }}>
          Your Driver Profile
        </h1>
      </div>

      <div className="assessment-content">
        <div className="results-container">
          {/* Primary Driver */}
          <div className="driver-card primary">
            <div className="driver-rank">Your Primary Driver</div>
            <div className="driver-name">{profile.primaryDriver}</div>
            <div className="driver-score">
              <div className="score-number">{profile.normalized[profile.primaryDriver]}</div>
              <div className="score-label">out of 100</div>
            </div>
            <p className="driver-insight">{getDriverInsight(profile.primaryDriver)}</p>
          </div>

          {/* Secondary and Tertiary Drivers */}
          <div className="driver-comparison">
            <div className="driver-card secondary">
              <div className="driver-rank">Secondary Driver</div>
              <div className="driver-name-small">{profile.secondaryDriver}</div>
              <div className="driver-score-small">
                <span className="score-number-small">{profile.normalized[profile.secondaryDriver]}</span>
                <span className="score-label-small">/ 100</span>
              </div>
              <p className="driver-insight-small">{getDriverInsight(profile.secondaryDriver)}</p>
            </div>

            <div className="driver-card tertiary">
              <div className="driver-rank">Tertiary Driver</div>
              <div className="driver-name-small">{profile.tertiaryDriver}</div>
              <div className="driver-score-small">
                <span className="score-number-small">{profile.normalized[profile.tertiaryDriver]}</span>
                <span className="score-label-small">/ 100</span>
              </div>
              <p className="driver-insight-small">{getDriverInsight(profile.tertiaryDriver)}</p>
            </div>
          </div>

          {/* Detailed Comparison */}
          <div className="score-breakdown">
            <h2>Your Driver Scores</h2>
            {profile.rankings.map((item, idx) => (
              <div key={item.driver} className="score-bar">
                <div className="score-label-bar">
                  <span className="rank-badge">#{item.rank}</span>
                  <span className="driver-label">{item.driver}</span>
                  <span className="score-value">{item.score}</span>
                </div>
                <div className="bar-track">
                  <div
                    className={`bar-fill ${item.driver.toLowerCase()}`}
                    style={{ width: `${item.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Info card */}
          <div className="results-info">
            <p>
              <strong>What this means:</strong> These three drivers — Appetite, Approval, and Ambition — shape how you
              experience life, what motivates you, and how you make decisions. Understanding them helps you make choices
              aligned with what actually matters to you.
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="assessment-nav">
          <button className="btn btn-gold" onClick={onContinue}>
            Continue to Sonari Form
          </button>
        </div>
      </div>
    </div>
  )
}
