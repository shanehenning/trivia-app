const handleAnswer = (state, userAnswer) => {
  const { questionNumber, guess, wasCorrect } = userAnswer
  const newGuesses = state.guesses.slice()
  const newGuess = {
    guess,
    wasCorrect,
  }
  newGuesses.splice(questionNumber - 1, 1, newGuess)

  let totalCorrect = 0
  newGuesses.forEach(question => {
    if (question.wasCorrect) totalCorrect++
  })
  return [newGuesses, totalCorrect]
}

export default {
  handleAnswer,
}
