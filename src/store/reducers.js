import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import createPersistedReducer from './createPersistedReducer'

import gameManager from './gameManager'
import triviaManager from './triviaManager'

const rootReducer = history =>
  combineReducers({
    gameManager: createPersistedReducer('gameManager', gameManager),
    router: connectRouter(history),
    triviaManager: createPersistedReducer('triviaManager', triviaManager),
  })

export default rootReducer
