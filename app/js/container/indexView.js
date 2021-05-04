import { useEffect } from 'react'
import { connect } from 'react-redux'
import Actions from '../action'
import ThemeContext from '../hooks/themeContext'
import THEMECONFIG from '../utils/themeConstants'
import TextEditor from './textEditor'

function IndexView(props) {
  const { appTheme, initApplicationAction } = props
  let themeConfig = THEMECONFIG[appTheme]

  useEffect(() => {
    initApplicationAction()
  }, [])

  return (
    <ThemeContext.Provider value={{ name: appTheme, config: themeConfig }}>
      <div className={`component-${appTheme} text-editor-view`}>
        <TextEditor />
      </div>
    </ThemeContext.Provider>
  )
}

const mapStateToProps = (state) => {
  return {
    appTheme: state.appTheme
  }
}

const mapDispatchToProps = {
  initApplicationAction: Actions.initApplication
}
export default connect(mapStateToProps, mapDispatchToProps)(IndexView)
