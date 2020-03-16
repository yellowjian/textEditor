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
  changeMenuItemStatus() {
    const selectionELem = this.selection.getSelectionContainerElem()
    const curStatus = {
      headVal: '',
      status: {
        head: false,
        bold: false,
        fontSize: false,
        fontName: false,
        italic: false,
        underline: false,
        strikeThrough: false,
        foreColor: false,
        backColor: false,
        link: false
      }
    }
    if(!selectionELem) {
      return
    }
    if(selectionELem.nodeName == 'A') {
      curStatus.status.link = true
    }
    let headReg = /^h/i
    let cmdHeadValue = this.cmd.queryCommandValue('formatBlock')
    if(headReg.test(cmdHeadValue)) {
      curStatus.status.head = true
      curStatus.headVal = cmdHeadValue
    }
    return curStatus
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
