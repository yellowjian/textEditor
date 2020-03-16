import Types from './type'

const initApplication = () => ({
  type: Types.INIT_APP
})

const updateData = (keys, data) => ({
  type: Types.UPDATE_DATA,
  keys, 
  data
})
const updateTheme = appTheme => ({
  type: Types.UPDATE_THEME,
  appTheme
})
const updateEditor = editor => ({
  type: Types.UPDATE_EDITOR,
  editor
})
const updateMenuItem = menuItemStatus => ({
  type: Types.UPDATE_MENU_ITEM,
  menuItemStatus
})
const updateHeadValue = headVal => ({
  type: Types.UPDATE_HEAD_VAL,
  headVal
})
export default {
  initApplication,
  updateData,
  updateTheme,
  updateEditor,
  updateMenuItem,
  updateHeadValue
}