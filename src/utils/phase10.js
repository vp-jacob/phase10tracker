/**
 * Phase 10 Game Constants and Utilities
 */

export const TOTAL_PHASES = 10
export const MIN_PLAYERS = 2
export const MAX_PLAYERS = 6

// Card point values
export const CARD_POINTS = {
  LOW: 5,      // Cards 1-9
  HIGH: 10,    // Cards 10-12
  SKIP: 15,    // Skip cards
  WILD: 25     // Wild cards
}

// Phase descriptions (what you need to complete each phase)
export const PHASES = [
  { number: 1, description: '2 sets of 3' },
  { number: 2, description: '1 set of 3 + 1 run of 4' },
  { number: 3, description: '1 set of 4 + 1 run of 4' },
  { number: 4, description: '1 run of 7' },
  { number: 5, description: '1 run of 8' },
  { number: 6, description: '1 run of 9' },
  { number: 7, description: '2 sets of 4' },
  { number: 8, description: '7 cards of one color' },
  { number: 9, description: '1 set of 5 + 1 set of 2' },
  { number: 10, description: '1 set of 5 + 1 set of 3' }
]

/**
 * Get the description for a phase number
 */
export function getPhaseDescription(phaseNumber) {
  const phase = PHASES.find(p => p.number === phaseNumber)
  return phase ? phase.description : ''
}

/**
 * Validate a score (must be non-negative integer)
 */
export function isValidScore(score) {
  const num = parseInt(score, 10)
  return !isNaN(num) && num >= 0 && num === parseFloat(score)
}

/**
 * Format score for display
 */
export function formatScore(score) {
  return score.toLocaleString()
}

/**
 * Determine winner from list of players who completed Phase 10
 * Winner is the one with lowest score
 */
export function determineWinner(finishers) {
  if (!finishers || finishers.length === 0) return null
  return finishers.reduce((lowest, player) => 
    player.totalScore < lowest.totalScore ? player : lowest
  )
}
