import React from 'react'
import PropTypes from 'prop-types'

const Loading = ({ isLoading, message }) => {
  if (!isLoading) return null
  return <div>{message}</div>
}

Loading.propTypes = {
  isLoading: PropTypes.bool,
  message: PropTypes.string,
}

export default Loading
