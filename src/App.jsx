import { useState, useEffect } from 'react'
import './App.css'
import PlayerSetup from './pages/PlayerSetup'
import { useGameState } from './hooks/useGameState'
// import Scoreboard from './pages/Scoreboard'

function App() {
  const [screen, setScreen] = useState('setup') // 'setup' | 'game'
  const {
    players,
    currentRound,
    gameOver,
    winner,
    startGame,
    recordRound,
    getStandings,
    resetGame,
    hasSavedGame
  } = useGameState()

  // Check for saved game on mount
  useEffect(() => {
    if (hasSavedGame() && players.length > 0) {
      setScreen('game')
    }
  }, [hasSavedGame, players.length])

  const handleStartGame = (playerList) => {
    startGame(playerList)
    setScreen('game')
  }

  const handleNewGame = () => {
    resetGame()
    setScreen('setup')
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>🎴 Phase 10 Tracker</h1>
      </header>
      
      <main className="app-main">
        {screen === 'setup' && (
          <PlayerSetup onStartGame={handleStartGame} />
        )}
        
        {screen === 'game' && (
          <div className="container">
            <div className="card">
              <h2>Round {currentRound}</h2>
              {gameOver ? (
                <div className="winner-display">
                  <h3>🏆 {winner?.name} Wins!</h3>
                  <p>Final Score: {winner?.totalScore}</p>
                </div>
              ) : (
                <p>Scoreboard coming soon...</p>
              )}
              
              <div className="standings">
                <h3>Standings</h3>
                {getStandings().map((player, index) => (
                  <div key={player.id} className="player-standing">
                    <span className="rank">#{index + 1}</span>
                    <span className="name">{player.name}</span>
                    <span className="phase">Phase {player.currentPhase}</span>
                    <span className="score">{player.totalScore} pts</span>
                  </div>
                ))}
              </div>
              
              <button className="secondary" onClick={handleNewGame} style={{ marginTop: '1rem' }}>
                New Game
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
