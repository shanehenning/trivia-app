import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { operations as gameOperations } from 'store/gameManager'
import Question from './component.jsx'

const mapStateToProps = ({ gameManager, triviaManager }, ownProps) => {
  const currentQuestionNumber = parseInt(
    ownProps.match.params.questionNumber,
    10,
  )
  const question = triviaManager.trivia[currentQuestionNumber - 1]
  return {
    currentQuestionNumber,
    data: question,
    guess: gameManager.guesses[currentQuestionNumber],
    isFetching: triviaManager.isFetching,
    totalQuestions: gameManager.totalQuestions,
  }
}

const mapDispatchToProps = {
  answeredQuestion: gameOperations.answeredQuestion,
  push,
}

export default connect(mapStateToProps, mapDispatchToProps)(Question)
