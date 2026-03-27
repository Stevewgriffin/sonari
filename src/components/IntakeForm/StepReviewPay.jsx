import { VOICES } from '../../utils/formData'
import { getEra } from '../../utils/eras'

function ReviewRow({ label, value }) {
  if (!value) return null
  return (
    <div className="review-row">
      <span className="label">{label}</span>
      <span className="value">{value}</span>
    </div>
  )
}

export default function StepReviewPay({ data }) {
  const era = getEra(data.birthYear)
  const voiceList = data.voiceGender ? VOICES[data.voiceGender] : []
  const voice = voiceList.find(v => v.id === data.voiceStyle)

  return (
    <div>
      <p className="section-label">Review your song</p>

      <div className="review-section">
        <h3>Occasion & People</h3>
        <ReviewRow label="Occasion" value={data.occasion} />
        <ReviewRow label="From" value={data.senderName} />
        <ReviewRow label="For" value={data.recipientName} />
        <ReviewRow label="Relationship" value={data.relationship} />
      </div>

      <div className="review-section">
        <h3>Musical DNA</h3>
        <ReviewRow label="Birth year" value={data.birthYear} />
        {era && <ReviewRow label="Musical era" value={era.label} />}
        <ReviewRow label="Voice" value={voice ? `${voice.name} (${data.voiceGender})` : ''} />
        <ReviewRow label="Genre" value={data.genre} />
      </div>

      <div className="review-section">
        <h3>Character</h3>
        <ReviewRow label="Traits" value={(data.traits || []).join(', ')} />
        <ReviewRow label="They love" value={data.loves} />
        <ReviewRow label="Memory" value={data.memory} />
        <ReviewRow label="Feeling" value={data.feeling} />
      </div>

      <div className="review-section">
        <h3>Song Style</h3>
        <ReviewRow label="Tempo" value={data.tempo} />
        <ReviewRow label="Length" value={data.length} />
        <ReviewRow label="Lyric tone" value={data.lyricTone} />
        {data.lyricSeed && <ReviewRow label="Lyric seed" value={data.lyricSeed} />}
      </div>

      <div className="price-bar">
        <div className="price">$25.00</div>
        <div className="price-note">One original song · Delivered within minutes</div>
      </div>

      <div className="field">
        <label>Your email (for delivery)</label>
        <input
          type="email"
          value={data.email || ''}
          placeholder="you@example.com"
          readOnly
          style={{ opacity: 0.5, cursor: 'not-allowed' }}
        />
        <p style={{ fontSize: '0.78rem', marginTop: 6, color: 'var(--cream-faint)' }}>
          Payment will be connected in Phase 2 (Stripe Checkout)
        </p>
      </div>
    </div>
  )
}
