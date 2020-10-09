import types from './types'

export const initialState = {
  trivia: [],
  error: null,
  isFetching: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.FETCHING_TRIVIA:
      return {
        ...state,
        error: null,
        isFetching: true,
      }

    case types.FETCHING_TRIVIA_SUCCESS:
      return {
        ...state,
        trivia: [...action.trivia],
        error: null,
        isFetching: false,
      }
    case types.FETCHING_TRIVIA_ERROR:
      return {
        ...state,
        error: action.error.message,
        isFetching: false,
      }
    case types.RESET_TRIVIA:
      return initialState
    default:
      return state
  }
}
