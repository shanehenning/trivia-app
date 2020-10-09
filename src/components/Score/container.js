import { connect } from 'react-redux'
import Score from './component.jsx'

const mapStateToProps = ({ gameManager }) => ({
  scorePossible: gameManager.guesses.length || 0,
  scoreCorrect: gameManager.scoreCorrect || 0,
})

export default connect(mapStateToProps, null)(Score)
