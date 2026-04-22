import { OCCASIONS, RELATIONSHIPS } from '../../utils/formData'

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
