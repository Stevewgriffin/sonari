import { FEELINGS } from '../../utils/formData'

export default function StepGift({ data, onChange }) {
  const name = data.recipientName?.trim() || 'them'

  return (
    <div>
      <p className="section-label">The Gift</p>

      <div className="field">
        <label>When {name} hears this song, what do you most want them to feel?</label>
        <div className="voice-grid">
          {FEELINGS.map(f => (
            <div
              key={f}
              className={`voice-card${data.feeling === f ? ' selected' : ''}`}
              onClick={() => onChange({ feeling: f })}
            >
              <div className="voice-desc">{f}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="field">
        <label>Is there anything else we should know?</label>
        <textarea
          value={data.extras}
          onChange={e => onChange({ extras: e.target.value })}
          placeholder="A word, a name, a place, a memory — that should find its way into the song. (optional)"
          rows={3}
        />
      </div>

      <div className="field">
        <label>Your name</label>
        <input
          type="text"
          value={data.senderName}
          onChange={e => onChange({ senderName: e.target.value })}
          placeholder="Your first name"
        />
      </div>

      <div className="field">
        <label>Your email</label>
        <input
          type="email"
          value={data.email}
          onChange={e => onChange({ email: e.target.value })}
          placeholder="you@example.com"
        />
        <p style={{ fontSize: 13, color: 'var(--cream-muted)', marginTop: 8 }}>
          So we can deliver the finished song to you. No payment required during beta.
        </p>
      </div>
    </div>
  )
}
