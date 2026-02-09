import { useState } from 'react'
import ConfirmDialog from '../components/ConfirmDialog'
import './GameHistory.css'

function GameHistory({ games, onBack, onClearHistory }) {
  const [expandedGame, setExpandedGame] = useState(null)
  const [showClearConfirm, setShowClearConfirm] = useState(false)

  const formatDate = (isoString) => {
    const date = new Date(isoString)
    return date.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const toggleExpand = (gameId) => {
    setExpandedGame(expandedGame === gameId ? null : gameId)
  }

  const handleClearHistory = () => {
    setShowClearConfirm(false)
    onClearHistory()
  }

  return (
    <div className="game-history">
      <div className="container">
        <div className="history-header">
          <button className="back-button" onClick={onBack}>
            ← Back
          </button>
          <h2>Game History</h2>
          {games.length > 0 && (
            <button 
              className="clear-button" 
              onClick={() => setShowClearConfirm(true)}
            >
              Clear All
            </button>
          )}
        </div>

        {games.length === 0 ? (
          <div className="no-history">
            <p>No games played yet.</p>
            <p className="hint">Completed games will appear here!</p>
          </div>
        ) : (
          <div className="history-list">
            {games.map(game => (
              <div key={game.id} className="history-card">
                <div 
                  className="history-card-header"
                  onClick={() => toggleExpand(game.id)}
                >
                  <div className="game-summary">
                    <span className="winner-name">🏆 {game.winner}</span>
                    <span className="game-meta">
                      {game.totalRounds} rounds • {game.players.length} players
                    </span>
                  </div>
                  <div className="game-date">{formatDate(game.date)}</div>
                  <div className={`expand-icon ${expandedGame === game.id ? 'expanded' : ''}`}>
                    ▼
                  </div>
                </div>

                {expandedGame === game.id && (
                  <div className="history-card-details">
                    <div className="final-scores">
                      <h4>Final Standings</h4>
                      <table>
                        <thead>
                          <tr>
                            <th>Player</th>
                            <th>Phase</th>
                            <th>Score</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[...game.players]
                            .sort((a, b) => {
                              if (b.finalPhase !== a.finalPhase) return b.finalPhase - a.finalPhase
                              return a.totalScore - b.totalScore
                            })
                            .map((player, idx) => (
                              <tr key={idx} className={player.name === game.winner ? 'winner-row' : ''}>
                                <td>{player.name}</td>
                                <td>{player.finalPhase > 10 ? '✓' : player.finalPhase}</td>
                                <td>{player.totalScore}</td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>

                    {game.roundHistory && game.roundHistory.length > 0 && (
                      <div className="round-breakdown">
                        <h4>Round by Round</h4>
                        <div className="rounds-table-wrapper">
                          <table className="rounds-table">
                            <thead>
                              <tr>
                                <th>Round</th>
                                {game.players.map((p, idx) => (
                                  <th key={idx}>{p.name}</th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {game.roundHistory.map((round, roundIdx) => (
                                <tr key={roundIdx}>
                                  <td className="round-num">{round.round}</td>
                                  {game.players.map((player, pIdx) => {
                                    const score = round.scores.find(s => s.playerName === player.name)
                                    return (
                                      <td key={pIdx} className={score?.completedPhase ? 'phase-complete' : ''}>
                                        {score ? (
                                          <>
                                            <span className="round-score">{score.score}</span>
                                            {score.completedPhase && <span className="phase-badge">✓</span>}
                                          </>
                                        ) : '-'}
                                      </td>
                                    )
                                  })}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <ConfirmDialog
        isOpen={showClearConfirm}
        title="Clear Game History?"
        message="This will permanently delete all game history. This action cannot be undone."
        confirmText="Clear History"
        cancelText="Cancel"
        onConfirm={handleClearHistory}
        onCancel={() => setShowClearConfirm(false)}
        danger
      />
    </div>
  )
}

export default GameHistory
