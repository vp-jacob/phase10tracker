import { useState } from 'react'
import './App.css'

// Pages will be imported here as they're built
// import PlayerSetup from './pages/PlayerSetup'
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
          <div className="container">
            <div className="card">
              <h2>Welcome to Phase 10 Tracker</h2>
              <p>Set up your game to get started.</p>
              <p style={{ marginTop: '1rem', color: 'var(--text-muted)' }}>
                Player setup screen coming soon...
              </p>
            </div>
          </div>
        )}
        
        {screen === 'game' && (
          <div className="container">
            <div className="card">
              <h2>Game in Progress</h2>
              <p>Scoreboard coming soon...</p>
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
