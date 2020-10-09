import actions from './actions'
import { operations as gameOperations } from 'store/gameManager'
import { queryTriviaApi, formatResponse } from 'api/trivia'

const baseUrl = 'https://opentdb.com/api.php?amount='

const fetchTrivia = (questionAmount, category, difficulty) => {
  return async dispatch => {
    dispatch(actions.fetchingTrivia())
    try {
      const response = await queryTriviaApi(
        questionAmount,
        category,
        difficulty,
      )
      if (response.length === 0) {
        return dispatch(
          actions.fetchingTriviaError(
            new Error(
              `There are not enough questions of this category and difficulty. Please adjust your settings and try again.`,
            ),
          ),
        )
      }
      dispatch(actions.fetchingTriviaSuccess(response))
      dispatch(gameOperations.determinedQuestionCount(response.length))
    } catch (error) {
      console.error(error)
      dispatch(actions.fetchingTriviaError(error))
    }
  }
}

const resetTrivia = () => {
  return async dispatch => {
    dispatch(actions.resetTrivia())
    dispatch(gameOperations.resetGameData())
  }
}

export default {
  fetchTrivia,
  resetTrivia,
}
