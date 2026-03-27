// Maps birth year → musical era based on when the recipient was ~14-18
export const ERAS = [
  { minYear: 1922, maxYear: 1935, label: 'The Big Band Era', style: 'Big band, swing, early jazz, WWII ballads', artists: 'Glenn Miller, Ella Fitzgerald, Duke Ellington' },
  { minYear: 1936, maxYear: 1945, label: 'The Birth of Rock', style: 'Early rock & roll, doo-wop, Sinatra crooners', artists: 'Elvis Presley, Chuck Berry, Frank Sinatra' },
  { minYear: 1946, maxYear: 1955, label: 'The British Invasion', style: 'Motown, folk, early rock, Beatles, soul', artists: 'The Beatles, Aretha Franklin, Bob Dylan' },
  { minYear: 1956, maxYear: 1965, label: 'The Classic Rock Era', style: 'Classic rock, country rock, soft rock, disco', artists: 'Led Zeppelin, Fleetwood Mac, Eagles' },
  { minYear: 1966, maxYear: 1975, label: 'The Power Ballad Era', style: 'Arena rock, new wave, early hip hop, synthpop', artists: 'Journey, Prince, Whitney Houston' },
  { minYear: 1976, maxYear: 1985, label: 'The Alt & Grunge Era', style: 'Alternative, grunge, R&B, country crossover', artists: 'Nirvana, TLC, Garth Brooks' },
  { minYear: 1986, maxYear: 1995, label: 'The Post-Millennial Mix', style: 'Pop punk, pop country, hip hop, emo, early EDM', artists: 'Eminem, Beyoncé, Blink-182' },
  { minYear: 1996, maxYear: 2010, label: 'The Streaming Age', style: 'Indie pop, trap, country-pop, bedroom pop', artists: 'Billie Eilish, Post Malone, Olivia Rodrigo' },
]

export function getEra(birthYear) {
  if (!birthYear) return null
  const year = Number(birthYear)
  return ERAS.find(e => year >= e.minYear && year <= e.maxYear) || null
}
