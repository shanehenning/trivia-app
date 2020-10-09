const baseUrl = 'https://opentdb.com/api.php?amount='
import { triviaStructure } from 'lib'

const composeUrl = (questionAmount, category, difficulty) => {
  let url = baseUrl
  if (questionAmount) url += questionAmount
  if (category) url += '&category=' + category
  if (difficulty) url += '&difficulty=' + difficulty.toLowerCase()
  return url
}

const decodeData = content => {
  let area = document.createElement('textarea')
  area.innerHTML = content
  return area.value
}

const decodeResults = data => {
  data.forEach(result => {
    result.question = decodeData(result.question)
    result.correct_answer = decodeData(result.correct_answer)
    result.incorrect_answers = result.incorrect_answers.map(
      answer => (answer = decodeData(answer)),
    )
  })
  return data
}

const determineAnswers = data => {
  data.forEach(item => {
    if (item.type === 'boolean') {
      item.allAnswers = ['True', 'False']
    } else {
      item.allAnswers = item.incorrect_answers.slice()
      item.allAnswers.splice(
        Math.floor(Math.random() * (item.incorrect_answers.length + 1)),
        0,
        item.correct_answer,
      )
    }
    item.answerKey = item.allAnswers.map(answer => {
      if (answer === item.correct_answer) {
        return true
      } else {
        return null
      }
    })
  })
  return data
}

export const formatResponse = data => {
  data = decodeResults(data)
  data = determineAnswers(data)
  return data
}

export const queryTriviaApi = (questionAmount, category, difficulty) => {
  const url = composeUrl(questionAmount, category, difficulty)
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        return new Error(
          `There was a problem retrieving data from the api, please try again.`,
        )
      }
      return response.json().then(data => formatResponse(data.results))
    })
    .catch(error => {
      console.error(error)
    })
}
