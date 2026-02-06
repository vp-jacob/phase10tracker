import { useState, useCallback, useEffect } from 'react'

const TOTAL_PHASES = 10
const STORAGE_KEY = 'phase10-game-state'

/**
 * Phase 10 Game State Hook
 * 
 * Player object shape:
 * {
 *   id: number,
 *   name: string,
 *   currentPhase: number (1-10),
 *   totalScore: number,
 *   phaseComplete: boolean (completed phase this round)
 * }
 */
export function useGameState(initialPlayers = []) {
  const [players, setPlayers] = useState(initialPlayers)
  const [currentRound, setCurrentRound] = useState(1)
  const [gameOver, setGameOver] = useState(false)
  const [winner, setWinner] = useState(null)

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved && initialPlayers.length === 0) {
      try {
        const parsed = JSON.parse(saved)
        setPlayers(parsed.players || [])
        setCurrentRound(parsed.currentRound || 1)
        setGameOver(parsed.gameOver || false)
        setWinner(parsed.winner || null)
      } catch (e) {
        console.error('Failed to load saved game:', e)
      }
    }
  }, [])

  // Save to localStorage on state change
  useEffect(() => {
    if (players.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        players,
        currentRound,
        gameOver,
        winner
      }))
    }
  }, [players, currentRound, gameOver, winner])

  // Initialize game with players
  const startGame = useCallback((playerList) => {
    const initializedPlayers = playerList.map((p, index) => ({
      id: p.id || index + 1,
      name: p.name,
      currentPhase: 1,
      totalScore: 0,
      phaseComplete: false
    }))
    setPlayers(initializedPlayers)
    setCurrentRound(1)
    setGameOver(false)
    setWinner(null)
  }, [])

  // Record scores for a round
  // roundResults: [{ playerId, score, completedPhase }]
  const recordRound = useCallback((roundResults) => {
    setPlayers(prevPlayers => {
      const updatedPlayers = prevPlayers.map(player => {
        const result = roundResults.find(r => r.playerId === player.id)
        if (!result) return player

        const newScore = player.totalScore + result.score
        const advancePhase = result.completedPhase && player.currentPhase < TOTAL_PHASES
        
        return {
          ...player,
          totalScore: newScore,
          currentPhase: advancePhase ? player.currentPhase + 1 : player.currentPhase,
          phaseComplete: result.completedPhase
        }
      })

      // Check for game end - someone completed Phase 10
      const phase10Completers = updatedPlayers.filter(
        p => p.currentPhase > TOTAL_PHASES || (p.currentPhase === TOTAL_PHASES && p.phaseComplete)
      )

      if (phase10Completers.length > 0) {
        // Game ends - find winner (completed Phase 10 with lowest score)
        // First, find all who completed Phase 10
        const finishers = updatedPlayers.filter(
          p => p.currentPhase > TOTAL_PHASES || (p.currentPhase === TOTAL_PHASES && p.phaseComplete)
        )
        
        // Winner is the one with lowest score among finishers
        const gameWinner = finishers.reduce((lowest, p) => 
          p.totalScore < lowest.totalScore ? p : lowest
        )
        
        setGameOver(true)
        setWinner(gameWinner)
      }

      return updatedPlayers
    })

    setCurrentRound(prev => prev + 1)
  }, [])

  // Get player standings (sorted by phase desc, then score asc)
  const getStandings = useCallback(() => {
    return [...players].sort((a, b) => {
      // Higher phase is better
      if (b.currentPhase !== a.currentPhase) {
        return b.currentPhase - a.currentPhase
      }
      // Lower score is better
      return a.totalScore - b.totalScore
    })
  }, [players])

  // Reset game
  const resetGame = useCallback(() => {
    setPlayers([])
    setCurrentRound(1)
    setGameOver(false)
    setWinner(null)
    localStorage.removeItem(STORAGE_KEY)
  }, [])

  // Check if there's a saved game
  const hasSavedGame = useCallback(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (!saved) return false
    try {
      const parsed = JSON.parse(saved)
      return parsed.players && parsed.players.length > 0
    } catch {
      return false
    }
  }, [])

  return {
    players,
    currentRound,
    gameOver,
    winner,
    startGame,
    recordRound,
    getStandings,
    resetGame,
    hasSavedGame
  }
}

export default useGameState
