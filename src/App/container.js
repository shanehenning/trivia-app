import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import App from './App.jsx'
import { operations as triviaOperations } from 'store/triviaManager'

const mapStateToProps = ({ triviaManager }) => ({
  triviaExists: triviaManager.trivia?.length > 0,
})

const mapDispatchToProps = {
  push,
  resetTrivia: triviaOperations.resetTrivia,
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
