import cssVar from './cssVar'
import { fromJS } from 'immutable'

const isLocal = () => {
  return !!process.env.isLocal
}

const getCSS = value => {
  return cssVar[value]
}

const updateStateByKeys = (state, keys, data) => {
  const immutableData = fromJS(data)
  if (keys) {
    return state.hasIn(keys)
      ? state.updateIn(keys, () => immutableData)
      : state.setIn(keys, immutableData)
  }
  return state.merge(immutableData)
}

export { isLocal, getCSS, updateStateByKeys }
