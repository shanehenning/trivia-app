import { createBrowserHistory } from 'history'
import { applyMiddleware, compose, createStore } from 'redux'
import { persistStore } from 'redux-persist'
import { routerMiddleware } from 'connected-react-router'
import createRootReducer from './reducers'
import thunk from 'redux-thunk'
// import loggerMiddleware from './middleware/logger'
// import * as navigationLayer from '../layers/navigation'

export const history = createBrowserHistory()

const middleware = [routerMiddleware(history), thunk]

const enhancers = []

if (process.env.NODE_ENV !== 'production') {
  // middleware.push(loggerMiddleware)

  const devToolsExtensions = window.__REDUX_DEVTOOLS_EXTENSION__
  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension())
  }
}

const rootReducer = createRootReducer(history)
const initialState = {}
const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers)

const store = createStore(rootReducer, initialState, composedEnhancers)
export const persistor = persistStore(store)

export default store
