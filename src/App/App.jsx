import React, { Component } from 'react'
import { hot } from 'react-hot-loader/root'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Redirect, Route, Switch } from 'react-router'

import { triviaStructure } from 'lib'
import Intro from 'components/Intro'
import Question from 'components/Question'
import GameOver from 'components/GameOver'

const filterUnique = list => {
  let seen = {}
  return list.filter(item =>
    seen.hasOwnProperty(item) ? false : (seen[item] = true),
  )
}

let allQuestions = {}

const filterAllQuestions = (oldQuestions, newQuestions) => {
  return newQuestions.filter(item =>
    oldQuestions.hasOwnProperty(item.question)
      ? oldQuestions[item]
      : (oldQuestions[item.question] = item),
  )
}

export class App extends Component {
  constructor(props) {
    super(props)
  }

  startOver = () => {
    const { resetTrivia, push } = this.props
    resetTrivia()
    push('/start')
  }

  render = () => {
    const { props, state } = this
    const { triviaExists } = props

    return (
      <>
        <button onClick={this.startOver}>Start Over</button>
        <Switch>
          <Route component={Intro} path={`/start`} />
          <Route
            path={`/question/:questionNumber`}
            render={routerProps => <Question match={routerProps.match} />}
          />
          <Route component={GameOver} path={`/game-over`} />
          <Redirect from={`/`} exact to={`/start`} />
        </Switch>
      </>
    )
  }
}

export default hot(App)
