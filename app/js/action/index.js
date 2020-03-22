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
const updateMenuValue = menuItemVal => ({
  type: Types.UPDATE_MENU_VAL,
  menuItemVal
})
export default {
  initApplication,
  updateData,
  updateTheme,
  updateEditor,
  updateMenuItem,
  updateMenuValue
}