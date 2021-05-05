import { connect } from 'react-redux'
import withThemeContext from '../../hoc/withThemeContext'
import { getCSS } from '../../utils/utils'
import { css } from '@emotion/core'

function Undo(props) {
  const { editor, theme } = props
  const themeConfig = theme.config
  const menuIconTheme = css({
    'color': getCSS(themeConfig.button.fontColor),
    '&:hover': {
      color: getCSS(themeConfig.button.active.fontColor)
    }
  })
  const undoClick = () => {
    editor.cmd.execCmd('undo')
  }
  return (
    <div className="undo">
      <i
        className={`menu-icon-undo`}
        css={menuIconTheme}
        onClick={undoClick}
        title='撤销'
      ></i>
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    editor: state.editor,
  }
}

export default connect(mapStateToProps)(withThemeContext(Undo))
