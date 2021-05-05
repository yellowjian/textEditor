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
const updateMenuItem = menusStatus => ({
  type: Types.UPDATE_MENU_ITEM,
  menusStatus
})
const updateMenuValue = menusVal => ({
  type: Types.UPDATE_MENU_VAL,
  menusVal
})
export default {
  initApplication,
  updateData,
  updateTheme,
  updateEditor,
  updateMenuItem,
  updateMenuValue
}