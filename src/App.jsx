import { useState } from 'react'
import './App.css'
import PlayerSetup from './pages/PlayerSetup'
// import Scoreboard from './pages/Scoreboard'

function App() {
  const [screen, setScreen] = useState('setup') // 'setup' | 'game'
  const [players, setPlayers] = useState([])

  const handleStartGame = (playerList) => {
    setPlayers(playerList)
    setScreen('game')
  }

  const handleNewGame = () => {
    setPlayers([])
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
              <h2>Game in Progress</h2>
              <p>Players: {players.map(p => p.name).join(', ')}</p>
              <p style={{ marginTop: '1rem', color: 'var(--text-muted)' }}>
                Scoreboard coming soon...
              </p>
              <button className="secondary" onClick={handleNewGame} style={{ marginTop: '1rem' }}>
                Back to Setup
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
