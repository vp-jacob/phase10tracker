import { getPhaseDescription } from '../utils/phase10'
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
  return (
    <div className="scoreboard">
      <div className="container">
        {/* Game Over Banner */}
        {gameOver && winner && (
          <div className="winner-banner">
            <div className="trophy">🏆</div>
            <h2>{winner.name} Wins!</h2>
            <p>Completed all 10 phases with {winner.totalScore} points</p>
          </div>
        )}

        {/* Round Header */}
        <div className="round-header">
          <span className="round-label">Round</span>
          <span className="round-number">{currentRound}</span>
        </div>

        {/* Player Cards */}
        <div className="player-cards">
          {standings.map((player, index) => (
            <div 
              key={player.id} 
              className={`player-card ${player.phaseComplete ? 'phase-complete' : ''} ${
                gameOver && winner?.id === player.id ? 'winner' : ''
              }`}
            >
              <div className="player-rank">#{index + 1}</div>
              
              <div className="player-info">
                <h3 className="player-name">{player.name}</h3>
                <div className="phase-info">
                  <span className="phase-number">Phase {player.currentPhase}</span>
                  <span className="phase-desc">{getPhaseDescription(player.currentPhase)}</span>
                </div>
              </div>

              <div className="player-score">
                <span className="score-value">{player.totalScore}</span>
                <span className="score-label">pts</span>
              </div>

              {player.phaseComplete && (
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
          <button className="secondary" onClick={onNewGame}>
            {gameOver ? 'Play Again' : 'New Game'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Scoreboard
