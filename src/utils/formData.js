// --- Occasions ---
export const OCCASIONS = [
  'Birthday', 'Anniversary', 'Wedding', 'Graduation',
  'Retirement', 'Just Because', 'Tribute / Memorial', 'Celebration',
]

// --- Relationships ---
export const RELATIONSHIPS = [
  'Spouse / Partner', 'Parent', 'Child', 'Sibling', 'Best Friend',
  'Close Friend', 'Grandparent', 'Grandchild', 'Colleague', 'Mentor', 'Other',
]

// --- Voice Styles (5 male, 5 female — balanced) ---
export const VOICES = {
  male: [
    { id: 'gravelly-baritone', name: 'Gravelly Baritone', desc: 'Deep, worn, honest — Jelly Roll meets Chris Stapleton', sunoTags: 'gravelly baritone, raw emotional delivery, southern grit, acoustic guitar, slide guitar, heavy soul, worn voice, truth-telling, Chris Stapleton influence' },
    { id: 'warm-tenor', name: 'Warm Tenor', desc: 'Smooth, heartfelt, radio-ready — Sam Hunt, Vance Joy', sunoTags: 'warm tenor, smooth delivery, radio pop, polished production, acoustic-electric, heartfelt' },
    { id: 'country-rasp', name: 'Country Rasp', desc: 'Road-worn twang with edge — Sturgill Simpson, Tyler Childers', sunoTags: 'raspy tenor, outlaw country, fiddle, steel guitar, dusty, road-worn, Tyler Childers feel' },
    { id: 'soulful-crooner', name: 'Soulful Crooner', desc: 'Rich, emotional, old-school — Al Green, Michael Bublé', sunoTags: 'rich baritone, classic soul, horns, reverb, old school R&B, Al Green influence' },
    { id: 'spoken-word-male', name: 'Spoken Word', desc: 'Warm, deliberate narration over music — a letter read aloud', sunoTags: 'male spoken word, warm narration, gentle acoustic background, intimate, poetic, storytelling voice' },
  ],
  female: [
    { id: 'smoky-alto', name: 'Smoky Alto', desc: 'Deep, warm, intimate — Brandi Carlile, Patty Griffin', sunoTags: 'smoky female alto, indie folk, fingerpicked acoustic, intimate, close-mic, confessional' },
    { id: 'clear-soprano', name: 'Clear Soprano', desc: 'Bright, emotional, pure — Kacey Musgraves, early Taylor Swift', sunoTags: 'bright female soprano, clear emotional delivery, pop country, lush production, Kacey Musgraves feel' },
    { id: 'soulful-rnb', name: 'Soulful R&B', desc: 'Powerful, expressive, textured — Fantasia, Jazmine Sullivan', sunoTags: 'powerful female R&B, gospel undertones, expressive, full production, contemporary soul' },
    { id: 'indie-whisper', name: 'Indie Whisper', desc: 'Soft, confessional, close-mic — Phoebe Bridgers, Julien Baker', sunoTags: 'whisper vocal, soft indie, bedroom pop, reverb, Phoebe Bridgers style, sparse arrangement' },
    { id: 'spoken-word-female', name: 'Spoken Word', desc: 'Gentle, heartfelt narration over music — a letter read aloud', sunoTags: 'female spoken word, gentle narration, soft piano background, intimate, poetic, storytelling voice' },
  ],
}

// --- Genres (curated for greeting cards / personalized songs) ---
export const GENRES = [
  'Pop',
  'Country',
  'Folk / Acoustic',
  'Singer-Songwriter',
  'R&B / Soul',
  'Classic Rock',
  'Jazz / Blues',
  'Gospel',
  'Bluegrass',
  'Indie / Alternative',
  'Spoken Word over Music',
  'Lullaby',
]

// --- Trait tags ---
export const TRAITS = [
  'Joyful', 'Strong', 'Gentle', 'Funny', 'Loyal',
  'Creative', 'Tenacious', 'Wise', 'Adventurous', 'Nurturing',
  'Driven', 'Warm', 'Quiet', 'Bold', 'Faithful',
  'Fierce', 'Tender', 'Playful', 'Steady', 'Grateful',
]

// --- Desired feeling ---
export const FEELINGS = [
  'Loved', 'Celebrated', 'Seen', 'Grateful',
  'Inspired', 'At Peace', 'Proud', 'Joyful', 'Overwhelmed',
]

// --- Tempo ---
export const TEMPOS = ['Slow & Tender', 'Mid-Groove', 'Upbeat & Celebratory']

// --- Song lengths ---
export const LENGTHS = [
  { label: 'Short (1:30)', value: '1:30' },
  { label: 'Standard (2:30)', value: '2:30' },
  { label: 'Full (3:30)', value: '3:30' },
]

// --- Lyric tone ---
export const LYRIC_TONES = [
  'Heartfelt & Sincere',
  'Warm & Funny',
  'Deep & Poetic',
  'Simple & Sweet',
  'Storytelling / Narrative',
]
