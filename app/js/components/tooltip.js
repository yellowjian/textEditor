import React, { Fragment, useRef, useState, useEffect } from 'react'
import { forwardRef } from 'react'
import cx from 'classnames'
import BaseComponent from './baseComponent'
import withThemeContext from '../hoc/withThemeContext'
import { getCSS } from '../utils/utils'
import Modal from './modal'

const ToolTip = forwardRef((props, ref) => {
  const { 
    className, 
    theme, 
    themeCss = {}, 
    tooltipText, 
    tooltipClassName, 
    isShow = false, 
    position = 'left',
    extraProps = []
  } = props
  const themeConfig = theme.config

  const radioboxClass = cx('tooltip', className)
  const tooltipRef = useRef()
  const [tooltipModal, setTooltipModal] = useState(null)
  const themeStyle = themeConfig? {
      color: getCSS(themeConfig.fontColor),
      backgroundColor: getCSS(themeConfig.tooltip.backgroundColor),
      borderColor: `${getCSS(themeConfig.tooltip.borderColorTop)} ${getCSS(themeConfig.tooltip.borderColorRight)} 
        ${getCSS(themeConfig.tooltip.borderColorBottom)} ${getCSS(themeConfig.tooltip.borderColorLeft)}`,
      '&.top': {
        ':before': {
          borderTopColor: getCSS(themeConfig.tooltip.borderColorRight)
        },
        ':after': {
          borderTopColor: getCSS(themeConfig.tooltip.backgroundColor)
        }
      },
      '&.right': {
        ':before': {
          borderRightColor: getCSS(themeConfig.tooltip.borderColorTop)
        },
        ':after': {
          borderRightColor: getCSS(themeConfig.tooltip.backgroundColor)
        }
      },
      '&.bottom': {
        ':before': {
          borderBottomColor: getCSS(themeConfig.tooltip.borderColorTop)
        },
        ':after': {
          borderBottomColor: getCSS(themeConfig.tooltip.backgroundColor)
        }
      },
      '&.left': {
        ':before': {
          borderLeftColor: getCSS(themeConfig.tooltip.borderColorRight)
        },
        ':after': {
          borderLeftColor: getCSS(themeConfig.tooltip.backgroundColor)
        }
      },
      ...themeCss
    }
  : themeCss

  const modalClass = cx('tooltip-popup', tooltipClassName, position)  
  const onMouseIn = (isShow) => {
    tooltipRef.current.updateShow(isShow)
  }
  useEffect(() => {
    setTooltipModal(renderModal())
  }, [themeConfig])
  const renderModal = () => {
    return (
      <Modal 
        ref={tooltipRef}
        className={modalClass}
        themeCss={themeStyle}
        isShow={isShow}
        modalRoot={ref.current ? ref.current.el: null}
      >
        {tooltipText}
      </Modal>
    )
  }
  const tooltipExtraProps = ['onMouseEnter', 'onMouseLeave'].concat(extraProps)
  return (
    <Fragment>
      <BaseComponent
        {...props}
        className={radioboxClass}
        ref={ref}
        isOperator={false}
        extraProps={tooltipExtraProps}
        onMouseEnter={() => {
          onMouseIn(true)
        }}
        onMouseLeave={() => {
          onMouseIn(false)
        }}
      />
      {tooltipModal}
    </Fragment>
  )
})

export default withThemeContext(ToolTip)