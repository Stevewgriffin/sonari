import { DRIVERS } from '../../utils/formData'

export default function StepCharacter({ data, onChange }) {
  const name = data.recipientName?.trim() || 'them'

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
        <label>Pick the one that fits {name} most:</label>
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
