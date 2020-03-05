import config from './config'
import Command from './command'
import Selection from './selection'
import Text from './text'
// import Menus from './menus'
let editorId = 0

export default class Editor {
  constructor(toolbarElem, textContainerElem, textElem) {
    this.id = `editor${editorId++}`
    this.config = {}
    this.toolbarElem = toolbarElem
    this.textContainerElem = textContainerElem
    this.textElem = textElem
  }
  initConfig() {
    this.config = Object.assign({}, config)
  }
  initCommand() {
    this.cmd = new Command(this)
  }
  initSelection() {
    this.selection = new Selection(this)
  }
  initText() {
    this.text = new Text(this)
    this.text.init()
  }
  create() {
    this.initConfig()
    this.initCommand()
    this.initSelection()
    this.initText()
  }
}
