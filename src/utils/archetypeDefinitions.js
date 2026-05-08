/**
 * Life Driver Report generation
 * Maps three-driver combinations to archetypes and generates personalized reports
 */

const ARCHETYPES = {
  'Ambition-Appetite-Approval': {
    name: 'Trailblazer',
    primary: 'Ambition',
    secondary: 'Appetite',
    tertiary: 'Approval',
    tagline: 'The visionary who pursues big goals and enjoys the journey',
    summary:
      'You are driven by achievement and impact, with a zest for new experiences and new challenges. You pursue ambitious goals with energy and enthusiasm, savoring the excitement of the pursuit itself. While you value recognition and belonging, your primary focus is on building something meaningful that will outlast your involvement.',
    strengths: [
      'Pursues meaningful, large-scale goals with passion',
      'Energizes others with your enthusiasm and vision',
      'Balances ambition with joy and appreciation for the journey',
      'Brings innovation and excitement to your endeavors',
      'Draws fulfillment from both impact and experience',
    ],
    considerations: [
      'May take on too much, trying to do everything at once',
      'Risk of burnout from constant pursuit of the next goal',
      'Could overlook relational needs in pursuit of ambition',
      'May struggle when forced into routine or slow progress',
    ],
    atWork:
      'You thrive in roles where you can set vision, drive change, and experience growth. You want both meaningful impact and intellectual stimulation. You may struggle in purely administrative or maintenance-focused roles.',
    inRelationships:
      'You bring energy and vision to your relationships but may sometimes prioritize your goals over connection time. You appreciate partners who understand your drive and can join you on your adventures.',
  },

  'Ambition-Approval-Appetite': {
    name: 'Architect',
    primary: 'Ambition',
    secondary: 'Approval',
    tertiary: 'Appetite',
    tagline: 'The builder who leads through relationships and influence',
    summary:
      'You are fundamentally driven by creating lasting impact and moving toward meaningful goals. You lead through people and influence, deeply valuing how others perceive your contributions and whether your leadership serves them. While you appreciate beauty and new experiences, your core focus is on what you can build and the legacy you leave.',
    strengths: [
      'Builds lasting structures and systems that outlast you',
      'Leads through influence and relationship rather than authority',
      'Deeply invested in the success of your team or organization',
      'Combines vision with emotional intelligence',
      'Creates environments where people want to contribute',
    ],
    considerations: [
      'May be overly focused on others\' perception of your leadership',
      'Could struggle with decisions that might create interpersonal friction',
      'Risk of self-doubt when not receiving adequate recognition',
      'May delay action waiting for team consensus',
    ],
    atWork:
      'You excel in leadership roles, especially those with mentoring or team-building components. You want to build something with and through people. You may struggle in roles that isolate you or where impact is unclear.',
    inRelationships:
      'You invest deeply in your closest relationships and want to build something meaningful together. You care about how you\'re perceived and may sometimes hide vulnerabilities to maintain an image of competence.',
  },

  'Appetite-Ambition-Approval': {
    name: 'Pioneer',
    primary: 'Appetite',
    secondary: 'Ambition',
    tertiary: 'Approval',
    tagline: 'The adventurer who pursues ambitious dreams with joy',
    summary:
      'You are driven by the pursuit of new experiences, novel challenges, and the richness of living fully. You bring that zest into ambitious pursuits—you want to build and achieve, but you want to enjoy the process and be energized by what you discover along the way. Recognition matters less to you than the satisfaction of the journey itself.',
    strengths: [
      'Brings enthusiasm and optimism to challenging pursuits',
      'Comfortable with risk and uncertainty',
      'Finds joy and meaning in the work itself, not just the outcome',
      'Inspires others with your energy and sense of possibility',
      'Pursues goals with resilience and adaptability',
    ],
    considerations: [
      'May abandon ambitious goals if they become too routine or predictable',
      'Could prioritize experience over results or completion',
      'Risk of scattered focus across too many interesting things',
      'May not follow through on long-term commitments',
    ],
    atWork:
      'You thrive in dynamic roles with variety, autonomy, and growth. You want work that engages your mind and offers new challenges. You may struggle in rigid, unchanging roles or environments.',
    inRelationships:
      'You bring spontaneity and adventure to your relationships. You appreciate partners who can be flexible and enjoy new experiences. You may sometimes avoid deeper emotional processing in favor of moving on to the next thing.',
  },

  'Appetite-Approval-Ambition': {
    name: 'Catalyst',
    primary: 'Appetite',
    secondary: 'Approval',
    tertiary: 'Ambition',
    tagline: 'The connector who brings people together and creates joy',
    summary:
      'You are energized by experiences, connections, and the presence of others. You create belonging and joy wherever you are, with an instinct for what will bring people together. While you care about achieving things, your primary focus is on the quality of relationships and the experience itself.',
    strengths: [
      'Creates warm, welcoming environments where people feel comfortable',
      'Draws people together naturally and authentically',
      'Brings levity and joy to difficult situations',
      'Genuinely interested in others\' wellbeing and experience',
      'Flexible and responsive to what others need in the moment',
    ],
    considerations: [
      'May prioritize harmony over necessary difficult conversations',
      'Could struggle with ambition when it requires stepping on others',
      'Risk of people-pleasing at the expense of your own needs',
      'May not push hard enough toward goals that require confrontation',
    ],
    atWork:
      'You excel in roles involving people, communication, and collaboration. You bring team cohesion and morale. You may struggle in highly competitive or hierarchical environments.',
    inRelationships:
      'You are warm, present, and genuinely interested in connection. You work hard to maintain harmony. You may sometimes avoid addressing real conflicts in favor of keeping the peace.',
  },

  'Approval-Ambition-Appetite': {
    name: 'Conductor',
    primary: 'Approval',
    secondary: 'Ambition',
    tertiary: 'Appetite',
    tagline: 'The leader who orchestrates through vision and relationship',
    summary:
      'You are fundamentally driven by belonging, being valued, and maintaining strong relationships. Within that framework, you are also ambitious—you want to lead, influence, and create meaningful outcomes. You want to achieve not in isolation, but within a web of relationships and mutual respect.',
    strengths: [
      'Leads with both vision and empathy',
      'Builds trust and loyalty in your networks',
      'Pursues ambitious goals within a relational context',
      'Brings people along with you toward shared vision',
      'Creates cultures of mutual respect and shared purpose',
    ],
    considerations: [
      'May be overly sensitive to others\' perception or criticism',
      'Could hesitate to make unpopular decisions even when necessary',
      'Risk of losing focus on ambition due to relational needs',
      'May struggle with isolation or rejection',
    ],
    atWork:
      'You excel in collaborative leadership roles where you can build culture and relationships alongside pursuing goals. You struggle in isolating roles or environments where you\'re constantly at odds with others.',
    inRelationships:
      'You are deeply invested in being seen, understood, and valued. You work hard to maintain relationships and may sometimes sacrifice your own needs to preserve harmony.',
  },

  'Approval-Appetite-Ambition': {
    name: 'Anchor',
    primary: 'Approval',
    secondary: 'Appetite',
    tertiary: 'Ambition',
    tagline: 'The presence who creates belonging and joy',
    summary:
      'You are driven by connection, belonging, and the warmth of being with others. You create richness through relationships and shared experiences. While you care about accomplishment, your deepest fulfillment comes from being part of something and contributing to the wellbeing of those around you.',
    strengths: [
      'Creates safe, belonging spaces where people feel valued',
      'Brings warmth and authenticity to every interaction',
      'Stays present and engaged with others\' wellbeing',
      'Grounds teams and communities through steady presence',
      'Finds meaning in service and contribution',
    ],
    considerations: [
      'May prioritize others\' needs over your own growth',
      'Could struggle with ambition that requires distance or sacrifice',
      'Risk of losing yourself in relationships',
      'May not pursue your own goals aggressively enough',
    ],
    atWork:
      'You excel in roles involving care, support, collaboration, and community. You bring stability and human connection to teams. You may struggle in highly competitive or achievement-obsessed environments.',
    inRelationships:
      'You are the steady, present one in relationships. You prioritize connection and harmony. You may sometimes struggle with your own needs or goals when they conflict with others\' wellbeing.',
  },
}

/**
 * Get archetype based on driver rankings
 * @param {object} driverProfile - { primaryDriver, secondaryDriver, tertiaryDriver }
 * @returns {object} Archetype definition
 */
export function getArchetype(driverProfile) {
  const { primaryDriver, secondaryDriver, tertiaryDriver } = driverProfile
  const key = `${primaryDriver}-${secondaryDriver}-${tertiaryDriver}`
  return ARCHETYPES[key] || null
}

/**
 * Get all archetypes for reference
 * @returns {object} All archetype definitions
 */
export function getAllArchetypes() {
  return ARCHETYPES
}

/**
 * Get archetype by name
 * @param {string} name - Archetype name (e.g., "Trailblazer")
 * @returns {object} Archetype definition
 */
export function getArchetypeByName(name) {
  return Object.values(ARCHETYPES).find(a => a.name === name) || null
}
