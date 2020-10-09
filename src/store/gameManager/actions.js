import types from './types'

const determinedQuestionCount = count => {
  return {
    type: types.DETERMINED_QUESTION_COUNT,
    count,
  }
}

const answeredQuestion = userAnswer => {
  return {
    type: types.ANSWERED_QUESTION,
    userAnswer,
  }
}

const resetGame = () => {
  return {
    type: types.RESET_GAME,
  }
}

export default {
  determinedQuestionCount,
  answeredQuestion,
  resetGame,
}
