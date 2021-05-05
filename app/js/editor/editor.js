import config from './config'
import Command from './command'
import Selection from './selection'
import Text from './text'
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
      vals: {
        headVal: '',
        listVal: '',
      },
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
        link: false,
        list: false,
        table: false
      }
    }
    if (!selectionELem) {
      return
    }
    let nodeName = selectionELem.nodeName
    if (nodeName === 'A') {
      curStatus.status.link = true
    }
    let headReg = /^h/i
    let cmdHeadValue = this.cmd.queryCommandValue('formatBlock')
    let cmdListValue = this.cmd.queryCommandState('insertUnOrderedList') ? 'unsorted-list' :
      (this.cmd.queryCommandState('insertOrderedList') ? 'sorted-list' : '')
    let cmdBoldValue = this.cmd.queryCommandValue('bold')
    let cmdItalicValue = this.cmd.queryCommandState('italic')
    let cmdUnderlineValue = this.cmd.queryCommandState('underline')
    let cmdStrikethroughValue = this.cmd.queryCommandState('strikethrough')
    if (nodeName === 'TD' || nodeName === 'TH') {
      curStatus.status.table = true
    }
    if (headReg.test(cmdHeadValue)) {
      curStatus.status.head = true
      curStatus.vals.headVal = cmdHeadValue
    }
    if (cmdListValue) {
      curStatus.status.list = true
      curStatus.vals.listVal = cmdListValue
    }
    if (cmdBoldValue === 'true') {
      curStatus.status.bold = true
    }
    if (cmdItalicValue) {
      curStatus.status.italic = true
    }
    if (cmdUnderlineValue) {
      curStatus.status.underline = true
    }
    if (cmdStrikethroughValue) {
      curStatus.status.strikeThrough = true
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
