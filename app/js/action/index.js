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
export default {
  initApplication,
  updateData,
  updateTheme
}