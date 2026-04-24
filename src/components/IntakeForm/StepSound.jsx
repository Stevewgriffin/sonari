import { TEMPOS, VOCAL_STYLES_F, VOCAL_STYLES_M } from '../../utils/formData'

export default function StepSound({ data, onChange }) {
  const name = data.recipientName?.trim() || 'them'

  const renderColumn = (heading, voices, gender) => (
    <div>
      <p
        className="section-label"
        style={{ marginTop: 0, marginBottom: 10, fontSize: '0.85rem' }}
      >
        {heading}
      </p>
      <div className="tile-grid" style={{ gridTemplateColumns: '1fr', marginBottom: 0 }}>
        {voices.map(v => {
          const isSelected = data.vocalStyle === v.id && data.vocalGender === gender
          return (
            <div
              key={`${gender}-${v.id}`}
              className={`tile${isSelected ? ' selected' : ''}`}
              onClick={() => onChange({ vocalStyle: v.id, vocalGender: gender })}
              style={{ textAlign: 'left', padding: '14px 18px' }}
            >
              <div style={{ fontWeight: 600 }}>{v.id}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--cream-dim)', marginTop: 4 }}>
                {v.anchors}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )

  return (
    <div>
      <p className="section-label">The Sound</p>

      <div className="field">
        <label>What vocal style fits {name} best?</label>
        <div className="subtitle" style={{ marginTop: -8, marginBottom: 16 }}>
          Pick the voice that sounds most like music they love — from either column.
        </div>
        <div className="vocal-columns">
          {renderColumn('Female Voices', VOCAL_STYLES_F, 'f')}
          {renderColumn('Male Voices', VOCAL_STYLES_M, 'm')}
        </div>
      </div>

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
