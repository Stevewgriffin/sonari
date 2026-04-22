// --- Occasions ---
export const OCCASIONS = [
  'Birthday', 'Anniversary', 'Wedding', 'Graduation',
  'Retirement', 'Just Because', 'Tribute / Memorial', 'Celebration',
]

// --- Birth decades (drives sonic-era selection) ---
export const BIRTH_DECADES = [
  '1940s', '1950s', '1960s', '1970s', '1980s', '1990s', '2000s',
]

// --- Gender (feeds Suno vocalGender) ---
export const GENDERS = [
  { id: 'm', label: 'Male' },
  { id: 'f', label: 'Female' },
]

// --- Vocal styles ---
// id is the canonical label (also the mapping key on the server).
// anchors are three name references shown as small gray text — never sent to Suno.
export const VOCAL_STYLES_F = [
  { id: 'Powerful & Theatrical',   anchors: 'Barbra Streisand · Idina Menzel · Ariana Grande' },
  { id: 'Soaring Power Voice',     anchors: 'Celine Dion · Kelly Clarkson · Carrie Underwood' },
  { id: 'Gritty Modern Country',   anchors: 'Tanya Tucker · Gretchen Wilson · Lainey Wilson' },
  { id: 'Pure Country Storyteller',anchors: 'Loretta Lynn · Wynonna Judd · Ashley McBryde' },
  { id: 'Pop Clarity & Brightness',anchors: 'Olivia Newton-John · Jewel · Taylor Swift' },
  { id: 'Soulful & Gospel-Rooted', anchors: 'Aretha Franklin · Whitney Houston · Jennifer Hudson' },
  { id: 'Smooth & Timeless',       anchors: 'Peggy Lee · Diana Krall · Norah Jones' },
  { id: 'Bluesy & Earthy',         anchors: 'Joni Mitchell · Bonnie Raitt · Brandi Carlile' },
  { id: 'R&B Richness',            anchors: 'Anita Baker · Mary J. Blige · Alicia Keys' },
  { id: 'Melodic Rap & Sing',      anchors: 'Queen Latifah · Missy Elliott · Cardi B' },
  { id: 'Mystical Rock & Soul',    anchors: 'Stevie Nicks · Sheryl Crow · Florence Welch' },
]

export const VOCAL_STYLES_M = [
  { id: 'Rugged Country Storyteller', anchors: 'Waylon Jennings · Travis Tritt · Chris Stapleton' },
  { id: 'Classic Smooth Country',     anchors: 'George Strait · Tim McGraw · Dierks Bentley' },
  { id: 'Soulful & Tender',           anchors: 'Frank Sinatra · Harry Connick Jr. · Michael Bublé' },
  { id: 'Gospel & Soul Depth',        anchors: 'Al Green · Boyz II Men · Anthony Hamilton' },
  { id: 'Folk & Acoustic Storyteller',anchors: 'James Taylor · Dave Matthews · Ed Sheeran' },
  { id: 'Classic Rock Anthem',        anchors: 'Don Henley · Tom Petty · Dave Grohl' },
  { id: 'Warm Worship & Inspirational', anchors: 'Michael W. Smith · MercyMe · Brandon Lake' },
  { id: 'Deep Soulful Blues',         anchors: 'Ray Charles · B.B. King · Gary Clark Jr.' },
  { id: 'Soaring Soft Rock Anthem',   anchors: 'Peter Cetera · Richard Marx · Josh Groban' },
  { id: 'Smooth R&B Soul',            anchors: 'Marvin Gaye · Brian McKnight · John Legend' },
  { id: 'Melodic Rap & Sing',         anchors: 'LL Cool J · Kanye West · Drake' },
]

// --- Relationships ---
export const RELATIONSHIPS = [
  'Spouse / Partner', 'Parent', 'Child', 'Sibling', 'Best Friend',
  'Close Friend', 'Grandparent', 'Grandchild', 'Colleague', 'Mentor', 'Other',
]

// --- Life Drivers (one primary motivation) ---
export const DRIVERS = [
  {
    id: 'ambition',
    label: "They're most driven by achieving things and moving toward their goals.",
  },
  {
    id: 'approval',
    label: "They're most driven by people — belonging, being loved, being accepted.",
  },
  {
    id: 'appetite',
    label: "They're most driven by enjoying life — experiences, pleasures, the good things.",
  },
]

// --- Tempo ---
export const TEMPOS = [
  'Upbeat and celebratory',
  'Warm and tender',
  'Reflective and moving',
  'Somewhere in between',
]

// --- Desired feeling ---
export const FEELINGS = [
  'Seen and truly known',
  'Celebrated and honored',
  'Loved and held',
  'Encouraged and sent forward',
  'Grieved and remembered with love',
]
