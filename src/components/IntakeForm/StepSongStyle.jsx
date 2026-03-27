import { TEMPOS, LENGTHS, LYRIC_TONES } from '../../utils/formData'

export default function StepSongStyle({ data, onChange }) {
  return (
    <div>
      <p className="section-label">Song Style</p>

      <div className="field">
        <label>Tempo feel</label>
        <div className="toggle-group">
          {TEMPOS.map(t => (
            <button
              key={t}
              type="button"
              className={`toggle-btn${data.tempo === t ? ' active' : ''}`}
              onClick={() => onChange({ tempo: t })}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="field">
        <label>Song length</label>
        <div className="toggle-group">
          {LENGTHS.map(l => (
            <button
              key={l.value}
              type="button"
              className={`toggle-btn${data.length === l.value ? ' active' : ''}`}
              onClick={() => onChange({ length: l.value })}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>

      <div className="field">
        <label>Lyric tone</label>
        <select
          value={data.lyricTone}
          onChange={e => onChange({ lyricTone: e.target.value })}
        >
          <option value="">Select a tone…</option>
          {LYRIC_TONES.map(t => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      <div className="field">
        <label>Lyric seed <span style={{ color: 'var(--cream-muted)', fontFamily: 'var(--sans)', fontSize: '0.82rem' }}>(optional)</span></label>
        <textarea
          rows={3}
          value={data.lyricSeed}
          onChange={e => onChange({ lyricSeed: e.target.value })}
          placeholder="A phrase, line, or word you want in the song…"
        />
      </div>
    </div>
  )
}
