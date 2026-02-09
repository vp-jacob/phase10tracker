import { useState, useEffect } from 'react'
import './App.css'
import PlayerSetup from './pages/PlayerSetup'
import Scoreboard from './pages/Scoreboard'
import GameHistory from './pages/GameHistory'
import ScoreInput from './components/ScoreInput'
import { useGameState } from './hooks/useGameState'

function App() {
  const [screen, setScreen] = useState('setup') // 'setup' | 'game' | 'history'
  const [showScoreInput, setShowScoreInput] = useState(false)
  const {
    players,
    currentRound,
    gameOver,
    winner,
    gameHistory,
    startGame,
    recordRound,
    getStandings,
    resetGame,
    hasSavedGame,
    clearGameHistory
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

  const handleAddScores = () => {
    setShowScoreInput(true)
  }

  const handleScoreSubmit = (roundResults) => {
    recordRound(roundResults)
    setShowScoreInput(false)
  }

  const handleScoreCancel = () => {
    setShowScoreInput(false)
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>🎴 Phase 10 Tracker</h1>
        {screen !== 'history' && (
          <button 
            className="history-button" 
            onClick={() => setScreen('history')}
            title="Game History"
          >
            📜
          </button>
        )}
      </header>
      
      <main className="app-main">
        {screen === 'setup' && (
          <PlayerSetup onStartGame={handleStartGame} />
        )}
        
        {screen === 'game' && (
          <Scoreboard
            players={players}
            currentRound={currentRound}
            gameOver={gameOver}
            winner={winner}
            standings={getStandings()}
            onAddScores={handleAddScores}
            onNewGame={handleNewGame}
          />
        )}

        {screen === 'history' && (
          <GameHistory
            games={gameHistory}
            onBack={() => setScreen(players.length > 0 ? 'game' : 'setup')}
            onClearHistory={clearGameHistory}
          />
        )}
      </main>

      {showScoreInput && (
        <ScoreInput
          players={players}
          onSubmit={handleScoreSubmit}
          onCancel={handleScoreCancel}
        />
      )}
    </div>
  )
}

export default App
