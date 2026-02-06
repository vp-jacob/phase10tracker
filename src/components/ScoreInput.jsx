import { useState } from 'react'
import { isValidScore, CARD_POINTS } from '../utils/phase10'
import './ScoreInput.css'

function ScoreInput({ players, onSubmit, onCancel }) {
  // Initialize with empty scores and unchecked phase completion
  const [scores, setScores] = useState(
    players.reduce((acc, player) => {
      acc[player.id] = { score: '', completedPhase: false }
      return acc
    }, {})
  )
  const [errors, setErrors] = useState({})

  const handleScoreChange = (playerId, value) => {
    // Allow empty or numeric input
    if (value === '' || /^\d+$/.test(value)) {
      setScores(prev => ({
        ...prev,
        [playerId]: { ...prev[playerId], score: value }
      }))
      // Clear error
      if (errors[playerId]) {
        setErrors(prev => ({ ...prev, [playerId]: null }))
      }
    }
  }

  const handlePhaseToggle = (playerId) => {
    setScores(prev => ({
      ...prev,
      [playerId]: { ...prev[playerId], completedPhase: !prev[playerId].completedPhase }
    }))
  }

  const validate = () => {
    const newErrors = {}
    let isValid = true

    players.forEach(player => {
      const scoreData = scores[player.id]
      if (scoreData.score === '') {
        newErrors[player.id] = 'Enter a score'
        isValid = false
      } else if (!isValidScore(scoreData.score)) {
        newErrors[player.id] = 'Invalid score'
        isValid = false
      } else if (parseInt(scoreData.score, 10) > 500) {
        newErrors[player.id] = 'Score too high'
        isValid = false
      }
    })

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!validate()) return

    const roundResults = players.map(player => ({
      playerId: player.id,
      score: parseInt(scores[player.id].score, 10),
      completedPhase: scores[player.id].completedPhase
    }))

    onSubmit(roundResults)
  }

  return (
    <div className="score-input-overlay">
      <div className="score-input-modal">
        <h2>Enter Round Scores</h2>
        
        <div className="scoring-reference">
          <span>Cards 1-9: <strong>{CARD_POINTS.LOW}</strong></span>
          <span>Cards 10-12: <strong>{CARD_POINTS.HIGH}</strong></span>
          <span>Skip: <strong>{CARD_POINTS.SKIP}</strong></span>
          <span>Wild: <strong>{CARD_POINTS.WILD}</strong></span>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="score-inputs">
            {players.map(player => (
              <div key={player.id} className={`score-row ${errors[player.id] ? 'has-error' : ''}`}>
                <div className="player-info">
                  <span className="player-name">{player.name}</span>
                  <span className="player-phase">Phase {player.currentPhase}</span>
                </div>
                
                <div className="score-field">
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    placeholder="0"
                    value={scores[player.id].score}
                    onChange={(e) => handleScoreChange(player.id, e.target.value)}
                  />
                  {errors[player.id] && (
                    <span className="error-text">{errors[player.id]}</span>
                  )}
                </div>

                <label className="phase-checkbox">
                  <input
                    type="checkbox"
                    checked={scores[player.id].completedPhase}
                    onChange={() => handlePhaseToggle(player.id)}
                  />
                  <span className="checkbox-label">Completed Phase</span>
                </label>
              </div>
            ))}
          </div>

          <div className="modal-actions">
            <button type="button" className="secondary" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="primary">
              Save Scores
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ScoreInput
