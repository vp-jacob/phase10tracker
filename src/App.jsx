import { useState, useEffect } from 'react'
import './App.css'
import PlayerSetup from './pages/PlayerSetup'
import Scoreboard from './pages/Scoreboard'
import { useGameState } from './hooks/useGameState'

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

  const handleAddScores = () => {
    // TODO: Open score input modal/screen
    // For now, just log
    console.log('Add scores clicked - Score input coming soon')
    alert('Score input component coming soon!')
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
      </main>
    </div>
  )
}

export default App
