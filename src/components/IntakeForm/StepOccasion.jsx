import { OCCASIONS } from '../../utils/formData'

export default function StepOccasion({ data, onChange }) {
  return (
    <div>
      <p className="section-label">What's the occasion?</p>
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
  )
}
