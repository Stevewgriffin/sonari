/**
 * Scoring utility for AlignIQ Three Life Drivers assessment
 * Calculates Appetite, Approval, and Ambition driver scores
 */

// Map question IDs to their domains for scoring
const QUESTION_DOMAIN_MAP = {
  // Appetite (D1) — 18 questions
  // D1.1: Stimulation-Seeking (4q)
  'A1': { domain: 'D1', subdomain: 'D1.1', driver: 'Appetite' },
  'A2': { domain: 'D1', subdomain: 'D1.1', driver: 'Appetite' },
  'A3': { domain: 'D1', subdomain: 'D1.1', driver: 'Appetite' },
  'A4': { domain: 'D1', subdomain: 'D1.1', driver: 'Appetite' },
  // D1.2: Hedonic/Comfort-Seeking (4q)
  'A5': { domain: 'D1', subdomain: 'D1.2', driver: 'Appetite', reverseScored: false },
  'A6': { domain: 'D1', subdomain: 'D1.2', driver: 'Appetite' },
  'A7': { domain: 'D1', subdomain: 'D1.2', driver: 'Appetite' },
  'A8': { domain: 'D1', subdomain: 'D1.2', driver: 'Appetite', reverseScored: true },
  // D1.3: Gratification Timing (2q)
  'A9': { domain: 'D1', subdomain: 'D1.3', driver: 'Appetite' },
  'A10': { domain: 'D1', subdomain: 'D1.3', driver: 'Appetite' },
  // D1.4: Boredom Relationship (2q)
  'A12': { domain: 'D1', subdomain: 'D1.4', driver: 'Appetite' },
  'A13': { domain: 'D1', subdomain: 'D1.4', driver: 'Appetite' },
  // D1.5: Sensory/Aesthetic (1q)
  'A15': { domain: 'D1', subdomain: 'D1.5', driver: 'Appetite' },
  // D1.6: Risk Tolerance (1q)
  'A18': { domain: 'D1', subdomain: 'D1.6', driver: 'Appetite' },
  // D1.7: Humor/Levity (4q)
  'A21': { domain: 'D1', subdomain: 'D1.7', driver: 'Appetite' },
  'A22': { domain: 'D1', subdomain: 'D1.7', driver: 'Appetite' },
  'A23': { domain: 'D1', subdomain: 'D1.7', driver: 'Appetite' },
  'A24': { domain: 'D1', subdomain: 'D1.7', driver: 'Appetite' },

  // Approval (D2) — 18 questions
  // D2.1: Public/Social Validation (4q)
  'B1': { domain: 'D2', subdomain: 'D2.1', driver: 'Approval' },
  'B2': { domain: 'D2', subdomain: 'D2.1', driver: 'Approval' },
  'B3': { domain: 'D2', subdomain: 'D2.1', driver: 'Approval' },
  'B4': { domain: 'D2', subdomain: 'D2.1', driver: 'Approval' },
  // D2.2: Peer/Professional Validation (2q)
  'B5': { domain: 'D2', subdomain: 'D2.2', driver: 'Approval' },
  'B6': { domain: 'D2', subdomain: 'D2.2', driver: 'Approval' },
  // D2.3: Relational/Intimate Validation (2q)
  'B8': { domain: 'D2', subdomain: 'D2.3', driver: 'Approval' },
  'B11': { domain: 'D2', subdomain: 'D2.3', driver: 'Approval' },
  // D2.4: Comparison Orientation (2q)
  'B12': { domain: 'D2', subdomain: 'D2.4', driver: 'Approval' },
  'B13': { domain: 'D2', subdomain: 'D2.4', driver: 'Approval' },
  // D2.5: Conflict Avoidance vs. Relational Courage (2q)
  'B15': { domain: 'D2', subdomain: 'D2.5', driver: 'Approval', reverseScored: true },
  'B16': { domain: 'D2', subdomain: 'D2.5', driver: 'Approval', reverseScored: true },
  // D2.6: Belonging/Community (2q)
  'B18': { domain: 'D2', subdomain: 'D2.6', driver: 'Approval' },
  'B19': { domain: 'D2', subdomain: 'D2.6', driver: 'Approval' },
  // D2.7: Rejection Sensitivity (2q)
  'B21': { domain: 'D2', subdomain: 'D2.7', driver: 'Approval' },
  'B22': { domain: 'D2', subdomain: 'D2.7', driver: 'Approval' },

  // Ambition (D3) — 26 questions
  // D3.1: Achievement Orientation (3q)
  'C1': { domain: 'D3', subdomain: 'D3.1', driver: 'Ambition' },
  'C2': { domain: 'D3', subdomain: 'D3.1', driver: 'Ambition' },
  'C3': { domain: 'D3', subdomain: 'D3.1', driver: 'Ambition' },
  // D3.2: Impact/Legacy (4q)
  'C4': { domain: 'D3', subdomain: 'D3.2', driver: 'Ambition' },
  'C5': { domain: 'D3', subdomain: 'D3.2', driver: 'Ambition' },
  'C6': { domain: 'D3', subdomain: 'D3.2', driver: 'Ambition' },
  'C7': { domain: 'D3', subdomain: 'D3.2', driver: 'Ambition' },
  // D3.3: Recognition/Status (4q)
  'C8': { domain: 'D3', subdomain: 'D3.3', driver: 'Ambition' },
  'C9': { domain: 'D3', subdomain: 'D3.3', driver: 'Ambition' },
  'C10': { domain: 'D3', subdomain: 'D3.3', driver: 'Ambition' },
  'C11': { domain: 'D3', subdomain: 'D3.3', driver: 'Ambition' },
  // D3.4: Competitive Orientation (3q)
  'C12': { domain: 'D3', subdomain: 'D3.4', driver: 'Ambition' },
  'C13': { domain: 'D3', subdomain: 'D3.4', driver: 'Ambition' },
  'C14': { domain: 'D3', subdomain: 'D3.4', driver: 'Ambition' },
  // D3.5: Leadership/Influence (3q)
  'C15': { domain: 'D3', subdomain: 'D3.5', driver: 'Ambition' },
  'C16': { domain: 'D3', subdomain: 'D3.5', driver: 'Ambition' },
  'C17': { domain: 'D3', subdomain: 'D3.5', driver: 'Ambition' },
  // D3.6: Mastery/Excellence (3q)
  'C18': { domain: 'D3', subdomain: 'D3.6', driver: 'Ambition' },
  'C19': { domain: 'D3', subdomain: 'D3.6', driver: 'Ambition' },
  'C20': { domain: 'D3', subdomain: 'D3.6', driver: 'Ambition' },
}

/**
 * Normalize a score to 0-100 range
 * @param {number} score - Raw score
 * @param {number} maxScore - Maximum possible score
 * @returns {number} Normalized score 0-100
 */
function normalizeScore(score, maxScore) {
  if (maxScore === 0) return 0
  return Math.round((score / maxScore) * 100)
}

/**
 * Calculate score value accounting for reverse scoring
 * @param {number} responseValue - User's response (1-5)
 * @param {boolean} reverseScored - Whether the question is reverse-scored
 * @returns {number} Adjusted score value
 */
function getScoreValue(responseValue, reverseScored = false) {
  if (reverseScored) {
    return 6 - responseValue // Convert 1→5, 2→4, 3→3, 4→2, 5→1
  }
  return responseValue
}

/**
 * Calculate driver scores from assessment responses
 * @param {object} responses - { questionId: responseValue, ... }
 * @returns {object} Driver profile with scores and ranking
 */
export function calculateDriverScores(responses) {
  const driverScores = {
    Appetite: 0,
    Approval: 0,
    Ambition: 0,
  }

  const driverCounts = {
    Appetite: 0,
    Approval: 0,
    Ambition: 0,
  }

  const subdomainScores = {}

  // Process each response
  Object.entries(responses).forEach(([questionId, responseValue]) => {
    const mapping = QUESTION_DOMAIN_MAP[questionId]
    if (!mapping) {
      console.warn(`Unknown question ID: ${questionId}`)
      return
    }

    const { driver, reverseScored } = mapping
    const scoreValue = getScoreValue(responseValue, reverseScored)

    driverScores[driver] += scoreValue
    driverCounts[driver] += 1

    // Track subdomain scores (for future detailed feedback)
    const subdomainKey = `${driver}-${mapping.subdomain}`
    if (!subdomainScores[subdomainKey]) {
      subdomainScores[subdomainKey] = { sum: 0, count: 0 }
    }
    subdomainScores[subdomainKey].sum += scoreValue
    subdomainScores[subdomainKey].count += 1
  })

  // Calculate normalized scores (0-100)
  const normalizedScores = {}
  const maxScorePerDriver = {
    Appetite: driverCounts['Appetite'] * 5, // 18 questions × 5
    Approval: driverCounts['Approval'] * 5, // 18 questions × 5
    Ambition: driverCounts['Ambition'] * 5, // 26 questions × 5
  }

  Object.keys(driverScores).forEach(driver => {
    normalizedScores[driver] = normalizeScore(driverScores[driver], maxScorePerDriver[driver])
  })

  // Rank drivers
  const rankings = Object.entries(normalizedScores)
    .sort((a, b) => b[1] - a[1])
    .map(([driver, score], index) => ({ driver, score, rank: index + 1 }))

  return {
    raw: driverScores,
    normalized: normalizedScores,
    rankings: rankings,
    primaryDriver: rankings[0].driver,
    secondaryDriver: rankings[1].driver,
    tertiaryDriver: rankings[2].driver,
    responsesCount: Object.keys(responses).length,
    completionPercentage: (Object.keys(responses).length / 62) * 100,
    subdomainScores: Object.entries(subdomainScores).reduce((acc, [key, { sum, count }]) => {
      acc[key] = normalizeScore(sum, count * 5)
      return acc
    }, {}),
  }
}

/**
 * Get a description of a driver score relative to the scale
 * @param {number} score - Normalized score (0-100)
 * @returns {string} Description
 */
export function getScoreDescription(score) {
  if (score >= 80) return 'Very High'
  if (score >= 60) return 'High'
  if (score >= 40) return 'Moderate'
  if (score >= 20) return 'Low'
  return 'Very Low'
}

/**
 * Get insight text for a primary driver
 * @param {string} driver - Driver name (Appetite, Approval, Ambition)
 * @returns {string} Insight text
 */
export function getDriverInsight(driver) {
  const insights = {
    Appetite:
      'You are most energized by experiences, new challenges, and the pleasures of life. You seek stimulation and sensory richness, and you find joy in variety and intensity. You likely thrive in dynamic environments where there's always something new to explore.',
    Approval:
      'You are most motivated by connection and how others perceive you. You care deeply about belonging, being valued, and maintaining harmonious relationships. You are energized by recognition from people who matter to you and influenced by feedback from those you respect.',
    Ambition:
      'You are most driven by achievement, impact, and moving toward meaningful goals. You measure success by lasting effect and excellence. You are motivated by progress, influence, and creating something that matters beyond immediate results.',
  }
  return insights[driver] || ''
}
