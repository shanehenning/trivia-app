import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { triviaStructure } from 'lib'
import {
  LABEL_QUESTION_COUNT,
  LABEL_CATEGORY,
  LABEL_DIFFICULTY,
} from './constants'

class Intro extends Component {
  constructor(props) {
    super(props)
    this.state = {
      questionAmount: 10,
      category: undefined,
      difficulty: undefined,
    }
  }
  handleInputChange = e => {
    e.preventDefault()
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    const { fetchTrivia, push } = this.props
    const { questionAmount, category, difficulty } = this.state
    fetchTrivia(questionAmount, category, difficulty)
    push('/question/1')
  }

  render() {
    const { apiError } = this.props
    const { questionAmount, category, difficulty } = this.state

    return (
      <div>
        <form onSubmit={e => this.handleSubmit(e)}>
          <label>
            {LABEL_QUESTION_COUNT}
            <input
              name="questionAmount"
              type="number"
              value={questionAmount}
              onChange={e => this.handleInputChange(e)}
              max={50}
            />
          </label>

          <label>
            {LABEL_CATEGORY}
            <select
              name="category"
              value={category}
              onChange={e => this.handleInputChange(e)}
            >
              <option value="0">{'Any Category'}</option>
              {triviaStructure.categories.map(
                ({ categoryName, categoryNumber }, i) => (
                  <option key={categoryNumber + 1} value={categoryNumber + 9}>
                    {categoryName}
                  </option>
                ),
              )}
            </select>
          </label>

          <label>
            {LABEL_DIFFICULTY}
            <select
              name="difficulty"
              value={difficulty}
              onChange={e => this.handleInputChange(e)}
            >
              {triviaStructure.difficulties.map((selectable, i) => (
                <option key={i} value={selectable.toLowerCase()}>
                  {selectable}
                </option>
              ))}
            </select>
          </label>

          <br />
          <p>Ready?</p>
          <button onClick={e => this.handleSubmit(e)}>Submit</button>

          {apiError && <p>{apiError}</p>}
        </form>
      </div>
    )
  }
}

Intro.propTypes = {
  apiError: PropTypes.string,
  fetchTrivia: PropTypes.func,
}

export default Intro
