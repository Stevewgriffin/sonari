import { getEra } from '../../utils/eras'
import { VOICES, GENRES, TRAITS, FEELINGS } from '../../utils/formData'

export default function StepMusicalDNA({ data, onChange }) {
  const era = getEra(data.birthYear)
  const voices = data.voiceGender ? VOICES[data.voiceGender] : []

  const toggleTrait = (trait) => {
    const current = data.traits || []
    if (current.includes(trait)) {
      onChange({ traits: current.filter(t => t !== trait) })
    } else if (current.length < 3) {
      onChange({ traits: [...current, trait] })
    }
  }

  return (
    <div>
      {/* --- Musical DNA --- */}
      <p className="section-label">Musical DNA</p>

      <div className="field">
        <label>Recipient's birth year</label>
        <input
          type="number"
          min="1920"
          max="2010"
          value={data.birthYear}
          onChange={e => onChange({ birthYear: e.target.value })}
          placeholder="e.g. 1965"
        />
      </div>

      {era && (
        <div className="era-badge">
          <div className="era-label">{era.label}</div>
          <div className="era-style">{era.style}</div>
          <div className="era-artists">{era.artists}</div>
        </div>
      )}

      <div className="field">
        <label>Lead voice</label>
        <div className="toggle-group">
          <button
            type="button"
            className={`toggle-btn${data.voiceGender === 'male' ? ' active' : ''}`}
            onClick={() => onChange({ voiceGender: 'male', voiceStyle: '' })}
          >
            Male
          </button>
          <button
            type="button"
            className={`toggle-btn${data.voiceGender === 'female' ? ' active' : ''}`}
            onClick={() => onChange({ voiceGender: 'female', voiceStyle: '' })}
          >
            Female
          </button>
        </div>
      </div>

      {data.voiceGender && (
        <div className="field">
          <label>Voice style</label>
          <div className="voice-grid">
            {voices.map(v => (
              <div
                key={v.id}
                className={`voice-card${data.voiceStyle === v.id ? ' selected' : ''}`}
                onClick={() => onChange({ voiceStyle: v.id })}
              >
                <div className="voice-name">{v.name}</div>
                <div className="voice-desc">{v.desc}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="field">
        <label>Music genre</label>
        <select
          value={data.genre}
          onChange={e => onChange({ genre: e.target.value })}
        >
          <option value="">Select a genre…</option>
          {GENRES.map(g => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>
      </div>

      {/* --- Character --- */}
      <p className="section-label" style={{ marginTop: 36 }}>Character</p>

      <div className="field">
        <label>Pick up to 3 traits that define them</label>
        <div className="tag-cloud">
          {TRAITS.map(t => {
            const selected = (data.traits || []).includes(t)
            const full = (data.traits || []).length >= 3 && !selected
            return (
              <span
                key={t}
                className={`tag${selected ? ' selected' : ''}${full ? ' disabled' : ''}`}
                onClick={() => !full && toggleTrait(t)}
              >
                {t}
              </span>
            )
          })}
        </div>
      </div>

      <div className="field">
        <label>What do they love most in life?</label>
        <input
          type="text"
          value={data.loves}
          onChange={e => onChange({ loves: e.target.value })}
          placeholder="e.g. their grandkids, early mornings, making people laugh…"
        />
      </div>

      <div className="field">
        <label>A memory or moment that defines your relationship</label>
        <textarea
          rows={3}
          value={data.memory}
          onChange={e => onChange({ memory: e.target.value })}
          placeholder="Something only the two of you would know…"
        />
      </div>

      <div className="field">
        <label>What feeling should this song leave them with?</label>
        <div className="feeling-grid">
          {FEELINGS.map(f => (
            <div
              key={f}
              className={`feeling-tile${data.feeling === f ? ' selected' : ''}`}
              onClick={() => onChange({ feeling: f })}
            >
              {f}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
