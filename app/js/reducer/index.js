import { fromJS } from 'immutable'
import types from '../action/type'
import { updateStateByKeys } from '../utils/utils'

let initState = fromJS({
  appTheme: 'light',
  editor: {},
  menuItemStatus: {
    head: false,
    bold: false,
    fontSize: false,
    fontName: false,
    italic: false,
    underline: false,
    strikeThrough: false,
    foreColor: false,
    backColor: false,
    link: false,
    list: false,
    table: false
  },
  menuItemVal: {
    headVal: '',
    listVal: '',
  }
})

export default function initReducer(state = initState, action) {
  switch (action.type) {
    case types.UPDATE_DATA:
      state = updateStateByKeys(state, action.keys, action.data)
      break
    case types.UPDATE_THEME:
      state = state.set('appTheme', action.appTheme)
      break
    case types.UPDATE_MENU_VAL:
      state = updateStateByKeys(state, ['menuItemVal'], action.menuItemVal)
      break 
    case types.UPDATE_EDITOR:
      state = updateStateByKeys(state, ['editor'], action.editor)
      break
    case types.UPDATE_MENU_ITEM:
      state = updateStateByKeys(state, ['menuItemStatus'], action.menuItemStatus)
  }
  return state
}
