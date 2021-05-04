import constants from './constants'

function Menu(props) {
  const { type } = props
  const menusItem = constants.menusItem || []
  return <div className="menu-item">{menusItem[type]}</div>
}
export default Menu
