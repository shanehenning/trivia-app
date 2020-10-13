import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Loading from 'components/Loading'
import Score from 'components/Score'
import {
  QuestionContainer,
  TitleQuestion,
  TitleClue,
  TitleCategory,
  List,
  ListItem,
} from './component.styles'

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
    const {
      answeredQuestion,
      currentQuestionNumber,
      data,
      match,
      totalQuestions,
    } = this.props
    const nextQuestionNumber = currentQuestionNumber + 1
    const finalQuestionAnswered = nextQuestionNumber > totalQuestions

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
    const { currentQuestionNumber, data, guess, isFetching, match } = this.props
    const { answered } = this.state
    const { answerKey, question = '', category = '', allAnswers = [] } =
      data || {}
    if (isFetching) {
      return <Loading isLoading={isFetching} message={'Loading...'} />
    }
    // if (guess) {
    //   this.updateWithGuess(guess)
    // }

    return (
      <QuestionContainer guessed={answered}>
        {/* <Score
        scorePossible={}
        scoreCorrect={}
      /> */}
        <TitleQuestion>Question #{currentQuestionNumber}</TitleQuestion>
        <TitleCategory>Category: {category}</TitleCategory>
        <TitleClue>{question}</TitleClue>
        <List type="A">
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
                showGuessed={answerGuessed}
                value={i + 1}
                wasCorrect={isCorrect}
              >
                {answer}
              </ListItem>
            )
          })}
        </List>
        {this.state.answered && (
          <>
            <p>You were {this.state.answeredCorrectly ? 'right' : 'wrong'}!</p>
            <p>Next question in {this.state.seconds}</p>
          </>
        )}
        <Score />
      </QuestionContainer>
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
