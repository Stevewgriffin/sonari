const ERAS = [
  { start: 1922, end: 1935, label: 'Big Band / Swing era', hint: 'big band, swing, early jazz, WWII ballads, crooners' },
  { start: 1936, end: 1945, label: 'Early Rock & Roll era', hint: 'early rock and roll, doo-wop, Sinatra-style crooners' },
  { start: 1946, end: 1955, label: 'British Invasion / Motown era', hint: 'Motown, folk, early rock, Beatles, soul' },
  { start: 1956, end: 1965, label: 'Classic Rock era', hint: 'classic rock, country rock, soft rock, disco' },
  { start: 1966, end: 1975, label: 'Power Ballad / Arena Rock era', hint: 'arena rock, new wave, early hip hop, synthpop, power ballads' },
  { start: 1976, end: 1985, label: 'Alt & Grunge era', hint: 'alternative, grunge, R&B, country crossover' },
  { start: 1986, end: 1995, label: 'Post-Millennial Mix', hint: 'pop punk, pop country, hip hop, emo, early EDM' },
  { start: 1996, end: 2010, label: 'Streaming Age', hint: 'indie pop, trap, country-pop, bedroom pop' },
]

function eraFromDecade(birthDecade) {
  if (!birthDecade) return null
  const decadeStart = parseInt(String(birthDecade).slice(0, 4), 10)
  if (Number.isNaN(decadeStart)) return null
  const formativeStart = decadeStart + 17
  const formativeEnd = decadeStart + 25
  const midpoint = Math.floor((formativeStart + formativeEnd) / 2)
  const match = ERAS.find(e => midpoint >= e.start && midpoint <= e.end)
  return {
    formativeStart,
    formativeEnd,
    label: match?.label || null,
    hint: match?.hint || null,
  }
}

const DRIVER_LABEL = {
  ambition: 'Ambition — driven by achieving things and moving toward their goals',
  approval: 'Approval — driven by people, belonging, being loved, being accepted',
  appetite: 'Appetite — driven by enjoying life, experiences, pleasures, the good things',
}

// vocalStyle (customer-facing label) → full Suno descriptor.
// The customer-facing label and artist anchors never touch Suno — only these descriptors do.
const VOCAL_DESCRIPTORS = {
  // Female
  'Powerful & Theatrical': 'soaring dramatic soprano with powerful chest-to-head voice transitions, wide four-octave dynamic range, Broadway-trained precision on consonants, emotionally intense phrasing with deliberate dramatic pauses, controlled vibrato on held notes, climactic belting on chorus peaks, lush orchestral or cinematic arrangement underneath, production that builds from intimate verses to explosive full-voice choruses, each lyric landed with theatrical intentionality',
  'Soaring Power Voice': 'powerhouse soprano with effortless upper register, stadium-scale vocal presence, anthemic melodic phrasing designed for mass singalong, massive dynamic swell from verse to chorus, crystal clear diction even at full volume, emotional urgency on every held note, gospel-influenced runs on key lyric moments, production with driving drums and full band swell, voice that feels like it could fill an arena without a microphone',
  'Gritty Modern Country': 'husky low-mid alto with natural rasp and raw southern texture, unpolished authenticity in every phrase, hard consonants and earthy vowels, attitude and confidence in the delivery, short punchy melodic lines with unexpected note choices, subtle blues influence underneath the country structure, production that mixes acoustic guitar with modern low-end, voice that feels lived-in and unafraid, emotional directness with no sentimentality',
  'Pure Country Storyteller': 'warm traditional country alto with authentic Appalachian twang, storytelling phrasing that treats every lyric like a sentence in a letter, unhurried melodic delivery with space between words, natural vibrato on held notes, emotional weight carried through simplicity not ornamentation, classic country instrumentation with steel guitar and fiddle, production that feels like it was recorded in 1974, voice that trusts the lyric to do the work',
  'Pop Clarity & Brightness': 'clear bright soprano with light airy tone, conversational intimate phrasing like she is singing directly to one person, crisp articulation on every word, youthful emotional openness, melodic lines that feel naturally spoken rather than performed, subtle breath between phrases for intimacy, production that is clean and modern with acoustic guitar or piano forward, dynamic restraint in verses opening up fully in chorus, voice that feels like a friend not a performer',
  'Soulful & Gospel-Rooted': 'rich full-bodied gospel soprano with deep chest resonance, melismatic runs on emotionally charged words, call-and-response phrasing instinct, dynamic range from hushed reverence to full-voice proclamation, natural growl on the attack of key phrases, sustained notes that bloom with vibrato, production rooted in organ and piano with rhythm section underneath, voice that carries the weight of something believed not just performed, emotional authenticity that comes from the gut not the head',
  'Smooth & Timeless': 'warm intimate alto with slight breathiness on the front of phrases, jazz-influenced note choices that land slightly behind the beat, understated delivery that trusts negative space, close-mic production that makes the voice feel inches away, soft vibrato used sparingly for emotional emphasis, sophisticated harmonic phrasing, arrangement built around piano or acoustic bass, voice that feels like a late night in a small room, emotional intelligence over emotional volume',
  'Bluesy & Earthy': 'raspy weathered alto with authentic blues texture, slight vocal crack on emotionally charged moments used as expression not error, guitar-like bending of notes at phrase ends, raw honesty in delivery with zero artifice, deeply felt phrasing that feels improvised even when written, production anchored in slide guitar and organic rhythm section, voice that has lived through something and is singing from the other side of it, emotional grit over emotional polish',
  'R&B Richness': 'soulful alto with powerful mid-range and controlled upper register, piano-forward phrasing instinct, gospel-rooted melisma on sustained notes, dynamic contrast between conversational verse delivery and full-voiced chorus proclamation, warm chest tone with natural vibrato, production layered with keys and subtle strings, rhythmic precision on syncopated melodic lines, voice that is equally at home in intimacy and power, emotional depth that reads as both personal and universal',
  'Mystical Rock & Soul': 'ethereal breathy alto with slightly haunted quality, folk-rock phrasing that floats above the beat rather than locking into it, vintage warm tone with natural imperfection, lyric delivery that feels like she discovered the words rather than memorized them, subtle reverb on the voice in production, arrangement built around acoustic guitar and atmospheric keys, emotional quality that is wistful and mysterious simultaneously, voice that feels like it exists slightly outside of time',
  // Male
  'Rugged Country Storyteller': 'raw raspy baritone-tenor with authentic southern texture, gritty vocal cord weight on every phrase, blues-informed note bending at phrase ends, unhurried storytelling delivery where every word lands with intention, natural vocal crack on emotionally charged moments used as expression, production anchored in acoustic guitar with organic rhythm section and occasional pedal steel, voice that sounds like it was earned not trained, emotional authenticity rooted in experience not performance, dynamic restraint that makes the loud moments matter',
  'Classic Smooth Country': 'warm clean baritone with classic country resonance, understated sincerity in every phrase, traditional melodic phrasing that honors the lyric without ornamentation, natural slight twang that feels regional not affected, production with classic country instrumentation including pedal steel fiddle and acoustic guitar, voice that sits comfortably in the mid-range and never strains, emotional honesty through simplicity, delivery that feels like a handshake rather than a performance, timeless rather than trendy',
  'Soulful & Tender': 'smooth warm baritone with rich chest resonance and effortless upper register, jazz-influenced phrasing that plays with rhythmic placement landing notes slightly ahead or behind the beat, romantic intimacy in every phrase, slight breathiness on the front of soft lines, production built around piano and upright bass with brushed drums, voice that smiles through the delivery even on tender emotional moments, sophisticated melodic choices, vibrato used tastefully on held notes, emotional warmth that feels like being held rather than being performed at',
  'Gospel & Soul Depth': 'silky soulful tenor with natural falsetto that floats effortlessly above the staff, gospel-trained call-and-response instinct in phrasing, melismatic runs on key emotional words that feel spontaneous not rehearsed, dynamic range from barely-there whisper to full proclamation, warm mid-range chest tone that transitions seamlessly into falsetto, production rooted in organ and piano with rhythm section, voice that carries genuine spiritual weight, emotional delivery that comes from belief, each phrase feeling like a testimony rather than a performance',
  'Folk & Acoustic Storyteller': 'gentle warm tenor with natural conversational quality, acoustic fingerpicking phrasing instinct where the voice and guitar feel like one instrument, unhurried delivery that breathes between lines, emotional transparency without sentimentality, slight natural imperfection in tone that reads as authenticity, production that is spare and intimate with acoustic guitar centered, voice that feels like it is speaking directly to one person in a quiet room, melodic lines that sound like they were just thought of, emotional honesty through vulnerability not volume',
  'Classic Rock Anthem': 'confident melodic tenor with rock-trained chest voice, anthemic phrasing designed for crowd participation, clear powerful diction even at full voice, production with electric guitar drums and full band, dynamic build from restrained verses to full-voiced anthemic chorus, voice that feels like it belongs on a stadium stage, emotional delivery that is equal parts personal and universal, melodic hooks that stick immediately, rock conviction in every phrase without aggression, the kind of voice that makes a song feel important',
  'Warm Worship & Inspirational': 'clear sincere tenor with open warm tone, worship-phrasing instinct that leaves space for the listener to enter the song, transparent emotional delivery without manipulation, production that builds from intimate acoustic opening to full anthemic chorus with layered vocals and swelling arrangement, voice that feels like an invitation rather than a performance, melodic lines that are easy to follow and sing along with, vibrato used gently for sincerity not show, emotional quality that is hopeful and grounding simultaneously, production that feels like a sanctuary',
  'Deep Soulful Blues': 'rich deep baritone with authentic blues timbre, natural rasp and gravel woven through every phrase, guitar-like note bending and blue note choices throughout the melody, call-and-response phrasing instinct, production anchored in electric blues guitar with organic rhythm section, dynamic contrast between quiet introspective verses and full-voiced emotional peaks, voice that carries the weight of real experience, emotional delivery that is honest and unadorned, slight vocal roughness that reads as authenticity not limitation, the kind of voice that sounds better with age',
  'Soaring Soft Rock Anthem': 'pure clear tenor with effortless high register and crystalline upper voice, soft rock melodic phrasing that builds deliberately toward soaring chorus peaks, cinematic romantic quality in every line, production with lush strings electric piano and full band that swells underneath the vocal, emotional urgency that builds from tender verses to full-voiced declarations, vibrato that blooms naturally on sustained high notes, voice that feels like it was made for movie soundtracks and meaningful moments, melodic lines that ascend toward emotional release, delivery that is both powerful and vulnerable simultaneously',
  'Smooth R&B Soul': 'warm mid-range tenor with rich harmonic resonance, piano-forward melodic instinct where the voice phrases like a keyboard player, intimate conversational delivery in verses opening to full emotional voice in chorus, subtle gospel undertones in note choices and phrasing, production centered on piano with layered warm instrumentation, slow deliberate vibrato on sustained notes, dynamic contrast between hushed intimacy and full proclamation, voice that feels equally at home on a love song and an anthem, emotional depth that is both personal and universal, sophisticated melodic choices that reward close listening',
  // Shared label — female and male variants share the name
  // The male version overrides above via object key collision, so pick based on gender at runtime (see getDescriptor).
}

const VOCAL_DESCRIPTORS_GENDERED = {
  f: {
    'Melodic Rap & Sing': 'confident female voice that moves fluidly between rhythmic rap flow and melodic sung hooks, conversational rap verses with precise rhythmic articulation and feminine authority, sung choruses with full melodic voice and emotional warmth, production with modern trap or hip-hop beat underneath, punchy delivery on rap sections transitioning smoothly to open melodic singing, voice that feels current and confident, lyric delivery that emphasizes attitude and authenticity over vocal gymnastics',
  },
  m: {
    'Melodic Rap & Sing': 'smooth voice that transitions fluidly between rhythmic conversational rap and melodic sung passages, rap verses with precise rhythmic flow and emotional intelligence rather than aggression, sung choruses and hooks with full warm melodic voice, modern hip-hop production with melodic instrumentation underneath, delivery that feels introspective and emotionally honest rather than performative, voice that carries vulnerability in both the rap and sung sections, melodic hooks that are immediately memorable, production that balances modern trap elements with musical warmth, emotional authenticity that feels personal rather than constructed',
  },
}

function getDescriptor(vocalStyle, gender) {
  if (!vocalStyle) return null
  const gendered = VOCAL_DESCRIPTORS_GENDERED[gender]?.[vocalStyle]
  if (gendered) return gendered
  return VOCAL_DESCRIPTORS[vocalStyle] || null
}

const SYSTEM_PROMPT = `You are a professional songwriter writing a deeply personal commissioned song for Sonari — a service that writes a one-of-a-kind song for one specific person, paid for by someone who loves them.

You will receive a brief describing the recipient. Your job is to return three things by calling the write_song tool: complete song lyrics, a title, and a Suno style string.

REQUIRED STRUCTURE — every Sonari song follows this shape, no exceptions:

1. [Intro (instrumental)]
2. [Verse 1]
3. [Pre-Chorus]
4. [Chorus]
5. [Verse 2]
6. [Pre-Chorus]
7. [Chorus]
8. [Verse 3]
9. [Pre-Chorus]
10. [Chorus]
11. [Outro (instrumental)]

The two instrumental sections contain no lyrics — put the bracketed tag on its own line with nothing after it. All three verses must be distinct; do not repeat Verse 1 as Verse 3. The pre-chorus can repeat across choruses or shift slightly as the song develops. Do NOT add a bridge. Section tags go on their own lines; no stage directions inside lyric lines.

LYRIC CONTENT — non-negotiable:
- Reference specific real moments and details from the brief, not generic sentiments. A real shared memory, a real hard season, a real piece of gratitude. Generic lines betray the gift.
- Reflect the recipient's dominant driver: if Ambition, celebrate what they have built and where they are going; if Approval, make them feel deeply seen and deeply belonging; if Appetite, celebrate the joy and richness they bring to life.
- Match the emotional tone to the gift intention the giver selected. Don't write a funeral dirge when they asked for celebration, and don't write fireworks when they asked for tender.

TITLE:
- Short, specific, memorable. Usually drawn from a key phrase in the chorus.

STYLE STRING for Suno:
- Combine, in one rich comma-separated production description: the recipient's formative sonic era, the requested genre, the requested tempo, and the full vocal descriptor provided in the brief. Write it as a single cohesive string Suno can read as a production direction. Do not mention any artist names.

Return your answer by calling the write_song tool.`

export default async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  let order
  try { order = await req.json() } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400 })
  }

  const {
    recipientName, relationship, gender, birthDecade, birthDate, occasion,
    atBest, driver, hardTimes, signature,
    memory, hardSeason, gratitude,
    vocalStyle, genre, tempo,
    feeling, extras, senderName, email,
  } = order

  const era = eraFromDecade(birthDecade)
  const driverLabel = DRIVER_LABEL[driver] || driver || '—'
  const vocalDescriptor = getDescriptor(vocalStyle, gender)

  const brief = [
    `# Recipient brief`,
    ``,
    `**Recipient:** ${recipientName || '—'}`,
    `**Relationship to giver:** ${relationship || '—'}`,
    `**Occasion:** ${occasion || '—'}`,
    `**Gender:** ${gender === 'm' ? 'male' : gender === 'f' ? 'female' : '—'}`,
    `**Birth decade:** ${birthDecade || '—'}`,
    birthDate ? `**Exact birth date:** ${birthDate}` : null,
    era ? `**Formative music years:** ${era.formativeStart}–${era.formativeEnd}${era.label ? ` (${era.label})` : ''}${era.hint ? ` — typical sound: ${era.hint}` : ''}` : null,
    ``,
    `## Who they are`,
    `**At their best:** ${atBest || '—'}`,
    `**Primary driver:** ${driverLabel}`,
    `**When life gets hard:** ${hardTimes || '—'}`,
    `**Unmistakably them:** ${signature || '—'}`,
    ``,
    `## Moments that matter`,
    `**A shared moment:** ${memory || '—'}`,
    `**A hard season / turning point:** ${hardSeason || '—'}`,
    `**What the giver wants them to know:** ${gratitude || '—'}`,
    ``,
    `## The sound the giver asked for`,
    `**Genre / style:** ${genre || '—'}`,
    `**Tempo:** ${tempo || '—'}`,
    vocalStyle ? `**Vocal style label (customer-facing, do not include in style string):** ${vocalStyle}` : null,
    vocalDescriptor ? `**Vocal descriptor (INCLUDE VERBATIM in the style string):** ${vocalDescriptor}` : null,
    ``,
    `## The gift`,
    `**Feeling to leave them with:** ${feeling || '—'}`,
    extras ? `**Anything else:** ${extras}` : null,
    `**From:** ${senderName || '—'}`,
  ].filter(Boolean).join('\n')

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 4096,
        system: [
          { type: 'text', text: SYSTEM_PROMPT, cache_control: { type: 'ephemeral' } },
        ],
        tools: [
          {
            name: 'write_song',
            description: 'Return the complete song lyrics, a title, and a Suno style string for this recipient.',
            input_schema: {
              type: 'object',
              properties: {
                lyrics: { type: 'string', description: 'Complete song lyrics following the required 11-section structure.' },
                title: { type: 'string', description: 'Short, specific, memorable song title.' },
                style: { type: 'string', description: 'Single comma-separated Suno style string combining era, genre, tempo, and the full vocal descriptor verbatim.' },
              },
              required: ['lyrics', 'title', 'style'],
            },
          },
        ],
        tool_choice: { type: 'tool', name: 'write_song' },
        messages: [{ role: 'user', content: brief }],
      }),
    })

    if (!res.ok) {
      const errText = await res.text()
      console.error('Anthropic error:', res.status, errText)
      return new Response(JSON.stringify({ error: 'Analysis failed' }), { status: 500 })
    }

    const payload = await res.json()
    const toolUse = (payload.content || []).find(b => b.type === 'tool_use' && b.name === 'write_song')
    if (!toolUse) {
      console.error('No write_song tool use in response:', JSON.stringify(payload))
      return new Response(JSON.stringify({ error: 'No song generated' }), { status: 500 })
    }
    const { lyrics, title, style } = toolUse.input || {}
    if (!lyrics || !title || !style) {
      console.error('Incomplete song fields:', toolUse.input)
      return new Response(JSON.stringify({ error: 'Incomplete song' }), { status: 500 })
    }

    return new Response(JSON.stringify({ lyrics, title, style }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (err) {
    console.error('analyze-submission error:', err)
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 })
  }
}

export const config = { path: '/api/analyze-submission' }
