import { fromJS } from 'immutable'
import types from '../action/type'
import { updateStateByKeys } from '../utils/utils'

let initState = fromJS({
  appTheme: 'light',
  editor: {}
})

export default function initReducer(state = initState, action) {
  switch (action.type) {
    case types.UPDATE_DATA:
      state = updateStateByKeys(state, action.keys, action.data)
      break
    case types.UPDATE_THEME:
      state = state.set('appTheme', action.appTheme)
      break
  }
  return state
}
