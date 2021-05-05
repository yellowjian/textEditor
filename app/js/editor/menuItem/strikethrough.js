import { connect } from 'react-redux'
import withThemeContext from '../../hoc/withThemeContext'
import { getCSS } from '../../utils/utils'
import { css } from '@emotion/core'

function Strikethrough(props) {
  const { editor, menusStatus, theme } = props
  const themeConfig = theme.config
  const menuIconTheme = css({
    'color': getCSS(themeConfig.button.fontColor),
    '&:hover': {
      color: getCSS(themeConfig.button.active.fontColor)
    },
    '&.active': {
      color: getCSS(themeConfig.button.visible.fontColor)
    }
  })
  const strikeThroughClick = () => {
    let isSeleEmpty = editor.selection.isSelectionEmpty()
    if (isSeleEmpty) {
      editor.selection.createEmptyRange()
    }
    editor.cmd.execCmd('strikethrough')
    if (isSeleEmpty) {
      editor.selection.collapseRange()
      editor.selection.restoreSelection()
    }
  }
  return (
    <div className="strikethrough">
      <i
        className={`menu-icon-strikethrough ` + (menusStatus.strikeThrough ? 'active' : '')}
        css={menuIconTheme}
        onClick={strikeThroughClick}
      ></i>
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    menusStatus: state.menusStatus,
    editor: state.editor,
  }
}

export default connect(mapStateToProps)(withThemeContext(Strikethrough))
