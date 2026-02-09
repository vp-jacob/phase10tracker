import { useState } from 'react'
import { getPhaseDescription, TOTAL_PHASES } from '../utils/phase10'
import ConfirmDialog from '../components/ConfirmDialog'
import './Scoreboard.css'

function Scoreboard({ 
  players, 
  currentRound, 
  gameOver, 
  winner, 
  standings,
  onAddScores, 
  onNewGame 
}) {
  const [showConfirm, setShowConfirm] = useState(false)

  const handleNewGameClick = () => {
    // If game is over, no need to confirm
    if (gameOver) {
      onNewGame()
    } else {
      setShowConfirm(true)
    }
  }

  const handleConfirmNewGame = () => {
    setShowConfirm(false)
    onNewGame()
  }
  // Calculate stats for game over screen
  const getGameStats = () => {
    const totalRounds = currentRound - 1
    const highestScore = Math.max(...players.map(p => p.totalScore))
    const lowestScore = Math.min(...players.map(p => p.totalScore))
    const avgScore = Math.round(players.reduce((sum, p) => sum + p.totalScore, 0) / players.length)
    return { totalRounds, highestScore, lowestScore, avgScore }
  }

  return (
    <div className="scoreboard">
      <div className="container">
        {/* Game Over Screen */}
        {gameOver && winner && (
          <>
            <div className="winner-banner">
              <div className="trophy">🏆</div>
              <h2>{winner.name} Wins!</h2>
              <p>Completed all {TOTAL_PHASES} phases with {winner.totalScore} points</p>
            </div>

            <div className="game-stats">
              <div className="stat">
                <span className="stat-value">{getGameStats().totalRounds}</span>
                <span className="stat-label">Rounds</span>
              </div>
              <div className="stat">
                <span className="stat-value">{getGameStats().avgScore}</span>
                <span className="stat-label">Avg Score</span>
              </div>
            </div>

            <h3 className="final-standings-title">Final Standings</h3>
          </>
        )}

        {/* Round Header (only when game in progress) */}
        {!gameOver && (
          <div className="round-header">
            <span className="round-label">Round</span>
            <span className="round-number">{currentRound}</span>
          </div>
        )}

        {/* Player Cards */}
        <div className="player-cards">
          {standings.map((player, index) => (
            <div 
              key={player.id} 
              className={`player-card ${player.phaseComplete ? 'phase-complete' : ''} ${
                gameOver && winner?.id === player.id ? 'winner' : ''
              }`}
            >
              <div className="player-rank">
                {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
              </div>
              
              <div className="player-info">
                <h3 className="player-name">{player.name}</h3>
                <div className="phase-info">
                  <span className="phase-number">
                    {player.currentPhase === TOTAL_PHASES && player.phaseComplete 
                      ? '✓ Complete!' 
                      : `Phase ${player.currentPhase}`}
                  </span>
                  {player.currentPhase <= TOTAL_PHASES && !player.phaseComplete && (
                    <span className="phase-desc">{getPhaseDescription(player.currentPhase)}</span>
                  )}
                </div>
              </div>

              <div className="player-score">
                <span className="score-value">{player.totalScore}</span>
                <span className="score-label">pts</span>
              </div>

              {player.phaseComplete && !gameOver && (
                <div className="complete-badge">✓</div>
              )}
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="scoreboard-actions">
          {!gameOver && (
            <button className="primary" onClick={onAddScores}>
              Enter Round Scores
            </button>
          )}
          <button className="secondary" onClick={handleNewGameClick}>
            {gameOver ? '🎴 Play Again' : 'New Game'}
          </button>
        </div>
      </div>

      <ConfirmDialog
        isOpen={showConfirm}
        title="Start New Game?"
        message="This will end your current game and all progress will be lost. Are you sure?"
        confirmText="Start New Game"
        cancelText="Keep Playing"
        onConfirm={handleConfirmNewGame}
        onCancel={() => setShowConfirm(false)}
        danger
      />
    </div>
  )
}

export default Scoreboard
