import produce from 'immer'
import types from '../action/type'

let initState = {
  appTheme: 'dark',
  editor: {},
  menusStatus: {
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
  menusVal: {
    headVal: '',
    listVal: '',
  }
}
const initReducer = (state = initState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.UPDATE_THEME:
        draft.appTheme = action.appTheme
        break
      case types.UPDATE_MENU_VAL:
        draft.menusVal = action.menusVal
        break
      case types.UPDATE_EDITOR:
        draft.editor = action.editor
        break
      case types.UPDATE_MENU_ITEM:
        draft.menusStatus = action.menusStatus
        break
      default:
        break
    }
  })

export default initReducer