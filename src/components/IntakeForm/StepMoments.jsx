export default function StepMoments({ data, onChange }) {
  const name = data.recipientName?.trim() || 'them'

  return (
    <div>
      <p className="section-label">The Moments That Matter</p>

      <div className="field">
        <label>Tell me one specific moment you've shared with {name} that still means something to you.</label>
        <textarea
          value={data.memory}
          onChange={e => onChange({ memory: e.target.value })}
          placeholder="The more specific, the better — a place, a conversation, something that happened."
          rows={4}
        />
      </div>

      <div className="field">
        <label>Has {name} been through a hard season, a turning point, or a loss that shaped who they are?</label>
        <textarea
          value={data.hardSeason}
          onChange={e => onChange({ hardSeason: e.target.value })}
          placeholder="Only if you want the song to acknowledge it. (optional)"
          rows={3}
        />
      </div>

      <div className="field">
        <label>What has {name} done for you — or for others — that you most want them to know you've noticed?</label>
        <textarea
          value={data.gratitude}
          onChange={e => onChange({ gratitude: e.target.value })}
          placeholder="The things that are hard to say out loud."
          rows={3}
        />
      </div>
    </div>
  )
}
