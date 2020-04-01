import React, { useState, useEffect, useRef, Fragment } from 'react'
import { render } from 'react-dom'
import { connect } from 'react-redux'
import withThemeContext from '../../hoc/withThemeContext'
import { getCSS } from '../../utils/utils'
import { css } from '@emotion/core'
import constants from '../constants'
import Modal from '../../components/modal'
import Input from '../../components/input'
import RadioBoxGroup from '../../components/radioboxGroup'
import Button from '../../components/button'

function Table(props) {
  const { data, theme } = props
  const themeConfig = theme.config
  const initStatus = data.get('menuItemStatus').toJS()
  const editor = data.get('editor')
  const menuIconTheme = css({
    color: getCSS(themeConfig.button.fontColor),
    '&:hover': {
      color: getCSS(themeConfig.button.active.fontColor)
    }
  })
 
  const [show, setShow] = useState(false)
  const [row, setRow] = useState('')
  const [col, setCol] = useState('')
  const [height, setHeight] = useState('')
  const [width, setWidth] = useState('')
  const [title, setTitle] = useState('')
  const tableRef = useRef()

  const tableClick = (e) => {
    setShow(!show)
  }
  const handleOk = () => {
    setShow(!show)
  }
  const handleCancel = () => {
    setShow(!show)
  }

  return (
    <div className='table' ref={tableRef}>
      <i
        className={`menu-icon-table2`}
        css={menuIconTheme}
        onClick={tableClick}
        title='插入表格'
      ></i>
      <Modal
        isShow={show}
        title={initStatus.table ? '编辑表格': '插入表格'}
        width={600}
        onOk={handleOk}
        onCancel={handleCancel}
        modalRoot={tableRef.current? tableRef.current: null}
      >
        {!initStatus.table &&
          <Fragment >
            <Input placeholder='行' value={row} className='table-input'
              onChange={(e) => {setRow(e.target.value)}}/>
            <Input placeholder='列' value={col} className='table-input'
              onChange={(e) => {setCol(e.target.value)}}/>
            <Input placeholder='宽度' value={width} className='table-input'
              onChange={(e) => {setWidth(e.target.value)}}/>
            <Input placeholder='高度' value={height} className='table-input'
              onChange={(e) => {setHeight(e.target.value)}}/>
            <RadioBoxGroup
              className='table-radio'
              onClick={(e, option) => {console.log(e, option)}}
              options={constants.alignOptions}
              value='default'
            >
            </RadioBoxGroup>
            <Input placeholder='标题' value={title} className='title-input'
              onChange={(e) => {setTitle(e.target.value)}}/>
          </Fragment>
        }
        {initStatus.table &&
          <Fragment >
            <Button label='添加行'></Button>
            <Button label='删除行'></Button>
            <Button label='添加列'></Button>
            <Button label='删除列'></Button>
            <Button label='删除表格'></Button>
          </Fragment>
        }
      </Modal> 
    </div>
  ) 
}
const mapStateToProps = (state, ownProps) => {
  return {
    data: state
  }
}

export default connect(mapStateToProps)(withThemeContext(Table))

