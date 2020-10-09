import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Loading from 'components/Loading'
import Score from 'components/Score'
import { ListItem } from './component.styles'

const initialState = {
  answered: false,
  answeredCorrectly: undefined,
  clickedAnswer: undefined,
  nextQuestionNumber: undefined,
  seconds: undefined,
}

class Question extends Component {
  constructor(props) {
    super(props)
    this.state = initialState
  }

  checkAnswer = e => {
    const { answered } = this.state
    const {
      answeredQuestion,
      currentQuestionNumber,
      data,
      match,
      totalQuestions,
    } = this.props
    const nextQuestionNumber = currentQuestionNumber + 1
    const finalQuestionAnswered = nextQuestionNumber > totalQuestions

    if (answered) return null
    const { allAnswers, correct_answer } = data
    const correctAnswerIndex = allAnswers.indexOf(correct_answer) + 1
    const wasCorrect = e.currentTarget.value === correctAnswerIndex
    answeredQuestion({
      questionNumber: currentQuestionNumber,
      guess: e.currentTarget.value,
      wasCorrect: wasCorrect,
    })
    this.setState({
      answered: true,
      answeredCorrectly: wasCorrect,
      clickedAnswer: e.currentTarget.value,
      finalQuestionAnswered,
      nextQuestionNumber,
    })
    this.startCountdown()
  }

  startCountdown = () => {
    this.setState({ seconds: 3 })
    this.timer = setInterval(this.countdownTimer, 1000)
  }

  countdownTimer = () => {
    const {
      answeredCorrectly,
      clickedAnswer,
      finalQuestionAnswered,
      nextQuestionNumber,
      seconds,
    } = this.state
    const { currentQuestionNumber, push } = this.props

    if (seconds !== 1) {
      this.setState({ seconds: this.state.seconds - 1 })
    } else {
      clearInterval(this.timer)
      if (finalQuestionAnswered) {
        push(`/game-over`)
      } else {
        push(`/question/${nextQuestionNumber}`)
        this.setState(initialState)
      }
    }
  }

  updateWithGuess = guess => {
    this.setState({ answered: true, clickedAnswer: guess })
  }

  render() {
    const { data, guess, isFetching } = this.props
    const { answerKey, question = '', category = '', allAnswers = [] } =
      data || {}
    if (isFetching) {
      return <Loading isLoading={isFetching} message={'Loading...'} />
    }
    // if (guess) {
    //   this.updateWithGuess(guess)
    // }

    return (
      <>
        {/* <Score
        scorePossible={}
        scoreCorrect={}
      /> */}
        <h2>{question}</h2>
        <h3>Category: {category}</h3>
        <ol type="A">
          {allAnswers.map((answer, i) => {
            const { answered, clickedAnswer } = this.state || false
            const isCorrect = answerKey[i]
            const answerGuessed = i + 1 === clickedAnswer
            const className = isCorrect
              ? 'correct'
              : answerGuessed
              ? 'incorrect'
              : null
            return (
              <ListItem
                className={answered && className}
                id={`answer-${i + 1}`}
                key={`question-${i + 1}`}
                onClick={this.checkAnswer}
                value={i + 1}
              >
                {answer}
              </ListItem>
            )
          })}
        </ol>
        {this.state.answered && (
          <>
            <p>You were {this.state.answeredCorrectly ? 'right' : 'wrong'}!</p>
            <p>Next question in {this.state.seconds}</p>
          </>
        )}
        <Score />
      </>
    )
  }
}

Question.propTypes = {
  allAnswers: PropTypes.array,
  category: PropTypes.string,
  match: PropTypes.object,
  question: PropTypes.string,
}

export default Question
