import { NAVIGATION_EVENT } from './navigation'

const mappedState = {
  [NAVIGATION_EVENT]: 'router',
}

const disable = true
export default store => next => action => {
  const { type: fullType, payload, ...rest } = action
  const [prefix, actionType] = fullType.split('/')
  const type = prefix && actionType ? prefix : fullType
  const getState = () =>
    store.getState()[type] ||
    store.getState()[`${type}Manager`] ||
    store.getState()[mappedState[type]]
  const data = payload || { ...rest }
  const state = getState()
  next(action)
  if (disable) {
    return
  }
  console.groupCollapsed(`Action type: ${fullType}`)
  console.info('Action data: ', data)
  console.info('State before: ', state)
  console.info('State after: ', getState())
  console.groupEnd()
}
