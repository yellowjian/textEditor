import { isContain } from './util'

export default class Selection {
  constructor(editor) {
    this.editor = editor
    this.curRange = null
  }
  getSelectionContainerElem(range) {
    range = range || this.curRange
    let elem = void 0
    if (range) {
      elem = range.commonAncestorContainer
      return elem.nodeType === 1 ? elem : elem.parentNode
    }
  }
  getSelectionStartElem(range) {
    range = range || this.curRange
    var elem = void 0
    if (range) {
      elem = range.startContainer
      return elem.nodeType === 1 ? elem : elem.parentNode
    }
  }
  getSelectionEndElem(range) {
    range = range || this.curRange
    var elem = void 0
    if (range) {
      elem = range.endContainer
      return elem.nodeType === 1 ? elem : elem.parentNode
    }
  }
  getRange() {
    return this.curRange
  }
  saveRange(_range) {
    if (_range) {
      // update current range
      this.curRange = _range
      return
    }

    // get current selection
    let selection = window.getSelection()
    if(selection.rangeCount == 0) {
      return
    }
    const range = selection.getRangeAt(0)

    let containerElem = this.getSelectionContainerElem(range)
    if (!containerElem) {
        return
    }

    if (containerElem.getAttribute('contenteditable') == 'false') {
        return
    }

    let editor = this.editor
    let textElem = editor.textElem
    if (isContain(textElem, containerElem)) {
        this.curRange = range
    }
  }
  collapseRange(toStart = false) {
    const range = this.curRange
    if (range) {
      range.collapse(toStart)
    }
  }
  getSelectionText() {
    const range = this.curRange
    if (range) {
      return this.curRange.toString()
    } else {
      return ''
    }
  }
  isSelectionEmpty() {
    const range = this.curRange
    if (range && range.startContainer) {
        if (range.startContainer === range.endContainer) {
            if (range.startOffset === range.endOffset) {
                return true
            }
        }
    }
    return false
  }

  restoreSelection() {
    let selection = window.getSelection()
    selection.removeAllRanges()
    selection.addRange(this.curRange)
  }
  createRangeByElem(elem, toStart, isContent) {
    // elem - 经过封装的 elem
    // toStart - true 开始位置，false 结束位置
    // isContent - 是否选中Elem的内容
    if (!elem) {
      return;
    }
    let range = document.createRange();
    if (isContent) {
      range.selectNodeContents(elem);
    } else {
      range.selectNode(elem);
    }
    if (typeof toStart == 'boolean') {
      range.collapse(toStart);
    }
    // 存储 range
    this.saveRange(range);
  }
}