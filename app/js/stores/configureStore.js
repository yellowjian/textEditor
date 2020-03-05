import { createStore, applyMiddleware } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import { createLogger } from 'redux-logger'
import { Iterable } from 'immutable'
import rootReducer from '../reducer'
import textEditorEpic from '../epic'
import { isLocal } from '../utils/utils'

const stateFormat = state => {
  const newState = {}
  for (let key of Object.keys(state)) {
    if (Iterable.isIterable(state[key])) {
      newState[key] = state[key].toJS()
    } else {
      newState[key] = state[key]
    }
  }
  return newState
}
const logger = createLogger({
  stateFormat
})
const epicMiddleware = createEpicMiddleware()
export default function configureStore() {
  let middleware = [epicMiddleware]
  if (isLocal()) {
    middleware = [...middleware, logger]
  }
  const store = createStore(rootReducer, applyMiddleware(...middleware))
  epicMiddleware.run(textEditorEpic.initAppEpic)
  return store
}
