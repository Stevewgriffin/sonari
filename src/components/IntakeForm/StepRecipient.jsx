import { BIRTH_DECADES, GENDERS, OCCASIONS, RELATIONSHIPS } from '../../utils/formData'

export default function StepRecipient({ data, onChange }) {
  return (
    <div>
      <p className="section-label">The Recipient</p>

      <div className="field">
        <label>What is the recipient's name?</label>
        <input
          type="text"
          value={data.recipientName}
          onChange={e => onChange({ recipientName: e.target.value })}
          placeholder="Their first name"
        />
      </div>

      <div className="field">
        <label>What is your relationship to them?</label>
        <select
          value={data.relationship}
          onChange={e => onChange({ relationship: e.target.value })}
        >
          <option value="">Select relationship…</option>
          {RELATIONSHIPS.map(r => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
      </div>

      <div className="field">
        <label>What is the recipient's gender?</label>
        <div className="tile-grid">
          {GENDERS.map(g => (
            <div
              key={g.id}
              className={`tile${data.gender === g.id ? ' selected' : ''}`}
              onClick={() => onChange({ gender: g.id })}
            >
              {g.label}
            </div>
          ))}
        </div>
      </div>

      <div className="field">
        <label>What decade were they born in?</label>
        <select
          value={data.birthDecade}
          onChange={e => onChange({ birthDecade: e.target.value })}
        >
          <option value="">Select decade…</option>
          {BIRTH_DECADES.map(d => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
      </div>

      <div className="field">
        <label>Exact birth date <span style={{ color: 'var(--cream-dim)', fontWeight: 'normal' }}>(optional — only if this is a birthday song)</span></label>
        <input
          type="text"
          value={data.birthDate}
          onChange={e => onChange({ birthDate: e.target.value })}
          placeholder="e.g. March 14, 1972"
        />
      </div>

      <div className="field">
        <label>What is the occasion for this song?</label>
        <div className="tile-grid">
          {OCCASIONS.map(occ => (
            <div
              key={occ}
              className={`tile${data.occasion === occ ? ' selected' : ''}`}
              onClick={() => onChange({ occasion: occ })}
            >
              {occ}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
