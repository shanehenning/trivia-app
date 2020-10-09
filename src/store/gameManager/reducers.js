import types from './types'
import selectors from './selectors'

export const initialState = {
  guesses: [],
  scoreCorrect: null,
  totalQuestions: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.DETERMINED_QUESTION_COUNT:
      return {
        ...state,
        totalQuestions: action.count,
      }
    case types.ANSWERED_QUESTION:
      const [guesses, scoreCorrect] = selectors.handleAnswer(
        state,
        action.userAnswer,
      )
      return {
        ...state,
        guesses,
        scoreCorrect,
      }
    case types.RESET_GAME:
      return initialState
    default:
      return state
  }
}
