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
import ButtonGroup from '../../components/buttonGroup'
import Button from '../../components/button'

function Image(props) {
  const { data, theme } = props
  const themeConfig = theme.config
  const editor = data.get('editor')
  const menuIconTheme = css({
    color: getCSS(themeConfig.button.fontColor),
    '&:hover': {
      color: getCSS(themeConfig.button.active.fontColor)
    }
  })
  const [imageUrl, setImageUrl] = useState('')
  const [imageWidth, setImageWidth] = useState('')
  const [imageHeight, setImageHeight] = useState('')
  const [show, setShow] = useState(false)
  const [tab, setTab] = useState('imageMessage')
  const imageRef = useRef()

  const imageClick = (e) => {
    setShow(!show)
  }
  const handleOk = () => {
    setShow(!show)
  }
  const handleCancel = () => {
    setShow(!show)
  }
  const handleTab = (e, option) => {
    setTab(option)
  }
  
  return (
    <div className='image' ref={imageRef}>
      <i
        className={`menu-icon-image`}
        css={menuIconTheme}
        onClick={imageClick}
        title='插入图片'
      ></i>
      <Modal
        isShow={show}
        title={'插入图片'}
        width={600}
        onOk={handleOk}
        onCancel={handleCancel}
        modalRoot={imageRef.current? imageRef.current: null}
      >
        <ButtonGroup
          onClick={handleTab}
          options={constants.imageTabOptions}
          value={tab}
        >
        </ButtonGroup>
        {tab == 'imageMessage' &&
          <Fragment >
            <Input placeholder='URL' value={imageUrl} className='image-input'
              onChange={(e) => {setImageUrl(e.target.value)}}/>
            <Input placeholder='宽度' value={imageWidth}
              onChange={(e) => {setImageWidth(e.target.value)}}/>
            <Input placeholder='高度' value={imageHeight} 
              onChange={(e) => {setImageHeight(e.target.value)}}/>
            <RadioBoxGroup
              className='image-radio'
              onClick={(e, option) => {console.log(e, option)}}
              options={constants.alignOptions}
              value='default'
            >
            </RadioBoxGroup>
          </Fragment>
        }
        {tab == 'imageUpload' &&
          <Fragment >
            <Input id='image' type='file'/>
            <Button label='Upload'/>
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

export default connect(mapStateToProps)(withThemeContext(Image))
