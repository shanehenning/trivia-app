import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { operations as triviaOperations } from 'store/triviaManager'
import Intro from './component.jsx'

const mapStateToProps = ({ triviaManager }) => ({
  apiError: triviaManager.error,
})

const mapDispatchToProps = {
  fetchTrivia: triviaOperations.fetchTrivia,
  push,
}

export default connect(mapStateToProps, mapDispatchToProps)(Intro)
