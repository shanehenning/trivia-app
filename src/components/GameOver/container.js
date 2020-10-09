import { connect } from 'react-redux'
import GameOver from './component.jsx'

const mapStateToProps = ({ gameManager }) => ({
  scoreCorrect: gameManager.scoreCorrect,
  scorePossible: gameManager.totalQuestions,
})

export default connect(mapStateToProps, null)(GameOver)
