import config from './config'
import Menu from './menu'

function Menus() {
  const configMenus = config.menus || []
  return (
    <div className="menu-list">
      {configMenus.map((item, index) => {
        return <Menu key={`menu_${index}`} type={item} />
      })}
    </div>
  )
}
export default Menus
