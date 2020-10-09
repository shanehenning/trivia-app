import React from 'react'
import PropTypes from 'prop-types'

const Score = ({ scoreCorrect, scorePossible }) => {
  return (
    <p>
      Score: {scoreCorrect}/{scorePossible}
    </p>
  )
}

Score.propTypes = {
  scoreCorrect: PropTypes.number,
  scorePossible: PropTypes.number,
}

export default Score
