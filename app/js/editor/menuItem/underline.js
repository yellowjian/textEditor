import { connect } from 'react-redux'
import withThemeContext from '../../hoc/withThemeContext'
import { getCSS } from '../../utils/utils'
import { css } from '@emotion/core'

function Underline(props) {
  const { menusStatus, theme } = props
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
  const italicClick = () => {
    let isSeleEmpty = editor.selection.isSelectionEmpty()
    if (isSeleEmpty) {
      editor.selection.createEmptyRange()
    }
    editor.cmd.execCmd('underline')
    if (isSeleEmpty) {
      editor.selection.collapseRange()
      editor.selection.restoreSelection()
    }
  }
  return (
    <div className="underline">
      <i
        className={`menu-icon-underline ` + (menusStatus.underline ? 'active' : '')}
        css={menuIconTheme}
        onClick={italicClick}
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

export default connect(mapStateToProps)(withThemeContext(Underline))
