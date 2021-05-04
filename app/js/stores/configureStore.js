import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import rootReducer from '../reducer'
import { isLocal } from '../utils/utils'

const logger = createLogger()
export default function configureStore() {
  let middleware = []
  if (isLocal()) {
    middleware = [...middleware, logger]
  }
  const store = createStore(rootReducer, applyMiddleware(...middleware))
  return store
}
