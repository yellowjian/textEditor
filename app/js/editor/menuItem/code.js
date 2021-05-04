import React, { useState, useEffect, useRef, Fragment } from 'react'
import { render } from 'react-dom'
import { connect } from 'react-redux'
import withThemeContext from '../../hoc/withThemeContext'
import { getCSS } from '../../utils/utils'
import { escapeHtml, countLines, updateRowNum } from '../util'
import { css } from '@emotion/core'
import constants from '../constants'
import Modal from '../../components/modal'
import TextArea from '../../components/textarea'
import Dropdown from '../../components/dropdown/dropdown'
import hljs from 'highlight.js'
import 'highlight.js/styles/agate.css'


function Code(props) {
  const { editor, theme, pureMenu = false } = props
  const themeConfig = theme.config
  const menuIconTheme = css({
    color: getCSS(themeConfig.button.fontColor),
    '&:hover': {
      color: getCSS(themeConfig.button.active.fontColor)
    }
  })
  const linkRef = useRef()
  const areaRef = useRef()
  const codeRef = useRef()
  const languageRef = useRef()
  const numRef = useRef()
  const [show, setShow] = useState(false)
  const [isFirst, setIsFirst] = useState(false)
  const [code, setCode] = useState('')
  const [rowNumber, setRowNumber] = useState('1')
  const [language, setLanguage] = useState('javascript')
  const codeClick = (e) => {
    setShow(!show)
    let linkelem = void 0

    linkelem = editor.selection.getSelectionContainerElem()
    if(linkelem) {
      return
    }
  }
  const handleOk = () => {
    setShow(!show)
    if (code == '') {
      return 
    }
    editor.cmd.execCmd('insertHTML', `<div class='code-part' contenteditable='false'>${numRef.current.el.outerHTML}<pre>${codeRef.current.outerHTML}</pre></div>`)
  }
  const handleCancel = () => {
    setShow(!show)
  }
  
  const updateCode = (e) => {
    setCode(e.currentTarget.textContent)
  }
  useEffect(() => {
    let codeArea = areaRef.current && areaRef.current.el
    let codeShow = codeRef.current
    if(codeArea && !isFirst) {
      setIsFirst(true)
      const events = ['ready', 'load', 'keyup', 'keydown', 'change']
      events.forEach((item) => {
        codeArea.addEventListener(item, function(event) {
          // handle tab key down 
          if (event.type == 'keydown' && event.which == 9) {
            event.preventDefault()
            handleTab(codeArea)
          }
          correctTextareaHight()
          hightlightSyntax()
        })
      })
    }
  }, [show])

  useEffect(() => {
    if (isFirst) {
      hightlightSyntax()
    }
  }, [language])

  HTMLElement.prototype.html = function(str){
    if(typeof str === 'string') {
        this.innerHTML = str
        return this
    } else { 
        return this.innerHTML
    }
  }

  function correctTextareaHight() {
    let codeArea = areaRef.current.el
    let numEle = numRef.current.el
    let codeShow = codeRef.current
    let outerHeight = codeArea.offsetHeight 
    let innerHeight = codeArea.scrollHeight
    let combinedScrollHeight = innerHeight + 2
    
    if (outerHeight < combinedScrollHeight){
      codeArea.style.height = combinedScrollHeight + 'px'
      codeShow.style.height = combinedScrollHeight + 'px'
      numEle.style.height = (combinedScrollHeight - 12) + 'px'
    }
    codeArea.style.width = codeShow.style.width
  }

  function handleTab(ele) {
    let s = ele.selectionStart
    let e = ele.selectionEnd
    ele.value = ele.value.substring(0, s) + '\t' + ele.value.substring(e)
    ele.selectionEnd = s + 1
  }
  function hightlightSyntax() {
    let content  = areaRef.current.el.value
    let codeHolder = codeRef.current
    var escaped = escapeHtml(content)
    codeHolder.html(escaped)
    hljs.highlightBlock(codeHolder)
  }

  const codeChanged = (val) => {
    setCode(val)
    const numEle = numRef.current.el
		let cntline = countLines(val)
		let tmpArr = numEle.value.split('\n');
		let cntlineOld = parseInt(tmpArr[tmpArr.length - 1], 10)
		// if there was a change in line count
		if (cntline != cntlineOld) {
      setRowNumber(updateRowNum(cntline))
		}
  }

  function scrollChanged() {
    codeRef.current.scrollLeft = areaRef.current.el.scrollLeft
	}

  return (
    <div className='code' ref={linkRef}>
      <i
        className='menu-icon-terminal'
        css={menuIconTheme}
        onClick={codeClick}
        title='插入代码'
      ></i>
      <Modal
        isShow={show}
        title={'插入代码'}
        width={800}
        onOk={handleOk}
        onCancel={handleCancel}
        modalRoot={linkRef.current? linkRef.current: null}
      >
        <div className='code-language' ref={languageRef}>
          <Dropdown
            options={constants.languageOptions}
            width={200}
            value='javascript'
            onChange={val => setLanguage(val)}
          ></Dropdown>
        </div>
        <div className='code-edit-area'>
          <TextArea className='row-number' ref={numRef} cols='3' value={rowNumber} readOnly={true}/>
          <span>
            <TextArea wrap='off' className='text-area scrollbar-y' ref={areaRef} value={code} onChange={(e) => {codeChanged(e.target.value)}} onScroll={scrollChanged}/>
            <pre><code ref={codeRef} className={`syntax-highight scrollbar-y ${language}`}></code></pre>
          </span>
        </div>
      </Modal> 
    </div>
  ) 
}
const mapStateToProps = (state, ownProps) => {
  return {
    editor: state.editor,
  }
}

export default connect(mapStateToProps)(withThemeContext(Code))
