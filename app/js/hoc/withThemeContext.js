import React, { forwardRef, useContext } from 'react'
import ThemeContext from '../hooks/themeContext'

function withThemeContext(WrappedComponent) {
  return forwardRef((props, ref) => {
    const { isTheme = true } = props
    const theme = isTheme ? useContext(ThemeContext): ''
    
    return <WrappedComponent {...props} theme={theme} ref={ref} />
  })
}
export default withThemeContext