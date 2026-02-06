import { useState } from 'react'
import './PlayerSetup.css'

const MIN_PLAYERS = 2
const MAX_PLAYERS = 6

function PlayerSetup({ onStartGame }) {
  const [playerCount, setPlayerCount] = useState(2)
  const [names, setNames] = useState(['', ''])
  const [errors, setErrors] = useState([])

  const handlePlayerCountChange = (count) => {
    const newCount = Math.max(MIN_PLAYERS, Math.min(MAX_PLAYERS, count))
    setPlayerCount(newCount)
    
    // Adjust names array
    if (newCount > names.length) {
      setNames([...names, ...Array(newCount - names.length).fill('')])
    } else {
      setNames(names.slice(0, newCount))
    }
    setErrors([])
  }

  const handleNameChange = (index, value) => {
    const newNames = [...names]
    newNames[index] = value
    setNames(newNames)
    
    // Clear error for this field
    if (errors[index]) {
      const newErrors = [...errors]
      newErrors[index] = false
      setErrors(newErrors)
    }
  }

  const validate = () => {
    const newErrors = names.map(name => !name.trim())
    setErrors(newErrors)
    return !newErrors.some(e => e)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!validate()) return
    
    // Create player objects with initial game state
    const players = names.map((name, index) => ({
      id: index + 1,
      name: name.trim(),
      currentPhase: 1,
      totalScore: 0,
      phaseComplete: false
    }))
    
    onStartGame(players)
  }

  return (
    <div className="player-setup">
      <div className="container">
        <div className="card">
          <h2>Game Setup</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="player-count-section">
              <label>Number of Players</label>
              <div className="player-count-controls">
                <button 
                  type="button"
                  className="count-btn"
                  onClick={() => handlePlayerCountChange(playerCount - 1)}
                  disabled={playerCount <= MIN_PLAYERS}
                >
                  −
                </button>
                <span className="count-display">{playerCount}</span>
                <button 
                  type="button"
                  className="count-btn"
                  onClick={() => handlePlayerCountChange(playerCount + 1)}
                  disabled={playerCount >= MAX_PLAYERS}
                >
                  +
                </button>
              </div>
            </div>

            <div className="player-names-section">
              <label>Player Names</label>
              <div className="player-inputs">
                {names.map((name, index) => (
                  <div key={index} className={`player-input ${errors[index] ? 'error' : ''}`}>
                    <span className="player-number">{index + 1}</span>
                    <input
                      type="text"
                      placeholder={`Player ${index + 1}`}
                      value={name}
                      onChange={(e) => handleNameChange(index, e.target.value)}
                      maxLength={20}
                    />
                    {errors[index] && <span className="error-msg">Name required</span>}
                  </div>
                ))}
              </div>
            </div>

            <button type="submit" className="primary start-btn">
              Start Game 🎴
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default PlayerSetup
