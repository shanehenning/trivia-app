import types from './types'

const fetchingTrivia = () => {
  return {
    type: types.FETCHING_TRIVIA,
  }
}

const fetchingTriviaError = (
  error = 'There was a problem while fetching trivia questions. Please try again later.',
) => {
  return {
    type: types.FETCHING_TRIVIA_ERROR,
    error,
  }
}

const fetchingTriviaSuccess = trivia => {
  return {
    type: types.FETCHING_TRIVIA_SUCCESS,
    trivia,
  }
}

const resetTrivia = () => {
  return {
    type: types.RESET_TRIVIA,
  }
}

export default {
  fetchingTrivia,
  fetchingTriviaError,
  fetchingTriviaSuccess,
  resetTrivia,
}
