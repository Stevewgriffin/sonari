import { TEMPOS } from '../../utils/formData'

export default function StepSound({ data, onChange }) {
  const name = data.recipientName?.trim() || 'them'

  return (
    <div>
      <p className="section-label">The Sound</p>

      <div className="field">
        <label>What genre or style feels most like {name}?</label>
        <input
          type="text"
          value={data.genre}
          onChange={e => onChange({ genre: e.target.value })}
          placeholder="e.g. country, gospel, pop, folk, R&B, blues, worship — or describe the feel"
        />
      </div>

      <div className="field">
        <label>What tempo feels right for this song?</label>
        <div className="tile-grid">
          {TEMPOS.map(t => (
            <div
              key={t}
              className={`tile${data.tempo === t ? ' selected' : ''}`}
              onClick={() => onChange({ tempo: t })}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
