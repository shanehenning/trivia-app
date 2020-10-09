import React from 'react'

const GameOver = ({ scoreCorrect, scorePossible }) => {
  return (
    <div>
      <h2>Game Over</h2>
      <h4>
        You got {scoreCorrect} out of {scorePossible} questions correct!
      </h4>
    </div>
  )
}

export default GameOver
