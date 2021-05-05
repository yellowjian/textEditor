import { isContain } from './util'
import UA from './ua'

/**
 * 获取编辑的时候的选区
 */
export default class Selection {
  constructor(editor) {
    this.editor = editor
    this.curRange = null
  }
  getSelectionContainerElem(range) {
    range = range || this.curRange
    let elem
    if (range) {
      elem = range.commonAncestorContainer
      return elem.nodeType === 1 ? elem : elem.parentNode
    }
  }
  getSelectionStartElem(range) {
    range = range || this.curRange
    var elem
    if (range) {
      elem = range.startContainer
      return elem.nodeType === 1 ? elem : elem.parentNode
    }
  }
  getSelectionEndElem(range) {
    range = range || this.curRange
    var elem
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
    if (selection.rangeCount === 0) {
      return
    }
    const range = selection.getRangeAt(0)

    let containerElem = this.getSelectionContainerElem(range)
    if (!containerElem) {
      return
    }

    if (containerElem.getAttribute('contenteditable') === 'false') {
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

  createEmptyRange() {
    let editor = this.editor
    let range = this.getRange()
    let elem
    if (!range) {
      return
    }
    if (!this.isSelectionEmpty()) {
      return
    }
    try {
      // 目前只支持 webkit 内核
      if (UA.isWebkit()) {
        // 插入 &#8203
        editor.cmd.execCmd('insertHTML', '&#8203;')
        // 修改 offset 位置
        range.setEnd(range.endContainer, range.endOffset + 1)
        // 存储
        this.saveRange(range)
      } else {
        elem = document.createElement('strong')
        elem.innerText = '&#8203;'
        editor.cmd.execCmd('insertElem', elem)
        this.createRangeByElem(elem, true)
      }
    } catch (ex) {
      // 部分情况下会报错，兼容一下
    }
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
    if (typeof toStart === 'boolean') {
      range.collapse(toStart);
    }
    // 存储 range
    this.saveRange(range);
  }
}