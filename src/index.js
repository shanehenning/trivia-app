import 'promise-polyfill/src/polyfill'
import ObjectAssign from 'es6-object-assign'
import 'array-from-polyfill'
import 'resize-observer-polyfill/dist/ResizeObserver.global'
import React from 'react'
import ReactDOM from 'react-dom'
import { connect, Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { Redirect, Route, Switch } from 'react-router'
import { ConnectedRouter } from 'connected-react-router'
import store, { history, persistor } from 'store'
import 'regenerator-runtime/runtime'
import { Normalize } from 'styled-normalize'

import App from './App'

ObjectAssign.polyfill()

// const dispatch = store.dispatch

const render = async () => {
  ReactDOM.render(
    <React.Fragment>
      <Provider store={store}>
        {/* <PersistGate loading={null} persistor={persistor}> */}
        <ConnectedRouter history={history}>
          <React.Fragment>
            <Normalize />
            <App />
          </React.Fragment>
        </ConnectedRouter>
        {/* </PersistGate> */}
      </Provider>
    </React.Fragment>,
    document.getElementById('root'),
  )
}

render()
