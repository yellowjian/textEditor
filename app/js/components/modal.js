import React, {
  useState,
  createRef,
  useEffect,
  useImperativeHandle
} from 'react'
import { createPortal } from 'react-dom'
import { forwardRef } from 'react'
import cx from 'classnames'
import BaseComponent from './baseComponent'
import { Fragment } from 'react/cjs/react.production.min'
import Button from './button'
import withThemeContext from '../hoc/withThemeContext'
import { getCSS } from '../utils/utils'
import { css } from '@emotion/core'

const Modal = forwardRef((props, ref) => {
  const [show, setShow] = useState(false)
  const [modalPosition, setModalPosition] = useState(null)
  const {
    themeCss = {},
    isShow,
    modalRoot = document.body,
    position,
    children,
    className,
    theme,
    width,
    title,
    onCancel,
    onOk
  } = props
  const modalClass = cx('modal', { 'static-modal': onCancel && onOk}, className)
  const themeConfig = theme.config
  const modalRef = createRef()
  let childComponent = children
  const themeStyle = {
    ... (modalPosition && { 
      left: `${modalPosition.left}px`,
      top: `${modalPosition.top}px`,
    }),
    ...themeCss
  }
  const modalContent = css({
    color: getCSS(themeConfig.modal.fontColor),
    backgroundColor: getCSS(themeConfig.modal.backgroundColor),
    ... (width && { 
      width: `${width}px`,
    }),
  })
  const modalHeader = css({
    borderBottomColor: getCSS(themeConfig.modal.borderColor),
  })
  const modalFooter = css({
    borderTopColor: getCSS(themeConfig.modal.borderColor),
  })
  useEffect(() => {
    setShow(isShow)
  }, [isShow])

  useEffect(() => {
    setModalPosition(position)
  }, [position])

  const updateShow = isShow => {
    setShow(isShow)
  }

  useImperativeHandle(ref, () => ({
    updateShow: isShow => updateShow(isShow),
    el: modalRef.current ? modalRef.current.el : null
  }))
  const getHeader = () => {
    return(
      <div className="modal-header" css={modalHeader}>
        <div className="modal-title">
          {title}
        </div>
      </div>
    )
  }
  const getFooter = () => {
    return(
      <div className="modal-footer" css={modalFooter}>
        <div>
          <Button
            label={'取 消'}
            onClick={e => onCancel(e)}
          />
          <Button
            label={'确 定'}
            onClick={e => onOk(e)}
          />
        </div>
      </div>
    )
  }
  if(onCancel && onOk) {
    let header = getHeader()
    let footer = getFooter()
    childComponent = <div className='modal-content' css={modalContent}>{header}<div className='modal-body'>{children}</div>{footer}</div>
  }
  return modalRoot
    ? createPortal(
        show ? (
          <BaseComponent
            {...props}
            ref={modalRef}
            themeCss={themeStyle}
            className={modalClass}
            renderChildComponent={() => childComponent}
          />
        ) : null,
        modalRoot
      )
    : null
})

export default withThemeContext(Modal)
