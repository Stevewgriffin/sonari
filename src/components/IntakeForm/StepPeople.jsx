import { RELATIONSHIPS } from '../../utils/formData'

export default function StepPeople({ data, onChange }) {
  return (
    <div>
      <p className="section-label">Who is this song for?</p>

      <div className="field">
        <label>Your first name</label>
        <input
          type="text"
          value={data.senderName}
          onChange={e => onChange({ senderName: e.target.value })}
          placeholder="Your name"
        />
      </div>

      <div className="field">
        <label>Recipient's first name</label>
        <input
          type="text"
          value={data.recipientName}
          onChange={e => onChange({ recipientName: e.target.value })}
          placeholder="Their name"
        />
      </div>

      <div className="field">
        <label>Your relationship</label>
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
    </div>
  )
}
