import actions from './actions'

const determinedQuestionCount = count => {
  return async dispatch => {
    dispatch(actions.determinedQuestionCount(count))
  }
}

const answeredQuestion = userAnswer => {
  return async dispatch => {
    dispatch(actions.answeredQuestion(userAnswer))
  }
}

const resetGameData = () => {
  return async dispatch => {
    dispatch(actions.resetGame())
  }
}

export default {
  determinedQuestionCount,
  answeredQuestion,
  resetGameData,
}
