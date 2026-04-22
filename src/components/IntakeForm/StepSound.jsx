import { TEMPOS, VOCAL_STYLES_F, VOCAL_STYLES_M } from '../../utils/formData'

export default function StepSound({ data, onChange }) {
  const name = data.recipientName?.trim() || 'them'
  const vocalOptions = data.gender === 'f' ? VOCAL_STYLES_F : data.gender === 'm' ? VOCAL_STYLES_M : null

  return (
    <div>
      <p className="section-label">The Sound</p>

      <div className="field">
        <label>What vocal style fits {name} best?</label>
        <div className="subtitle" style={{ marginTop: -8, marginBottom: 12 }}>
          Pick the voice that sounds most like music they love.
        </div>
        {vocalOptions ? (
          <div className="tile-grid" style={{ gridTemplateColumns: '1fr' }}>
            {vocalOptions.map(v => (
              <div
                key={v.id}
                className={`tile${data.vocalStyle === v.id ? ' selected' : ''}`}
                onClick={() => onChange({ vocalStyle: v.id })}
                style={{ textAlign: 'left', padding: '14px 18px' }}
              >
                <div style={{ fontWeight: 600 }}>{v.id}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--cream-dim)', marginTop: 4 }}>
                  {v.anchors}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ fontSize: '0.9rem', color: 'var(--cream-dim)' }}>
            Go back to step 1 and choose a gender first — vocal options depend on it.
          </div>
        )}
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
