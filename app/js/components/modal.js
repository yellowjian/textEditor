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

const Modal = forwardRef((props, ref) => {
  const [show, setShow] = useState(false)
  const [modalPosition, setModalPosition] = useState(null)
  const {
    themeCss = {},
    isShow,
    modalRoot = document.body,
    position,
    children,
    className
  } = props
  const modalClass = cx('modal', className)
  const modalRef = createRef()
  const themeStyle = modalPosition
    ? {
        left: `${modalPosition.left}px`,
        top: `${modalPosition.top}px`
      }
    : themeCss

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

  return modalRoot
    ? createPortal(
        show ? (
          <BaseComponent
            {...props}
            ref={modalRef}
            themeCss={themeStyle}
            className={modalClass}
            renderChildComponent={() => children}
          />
        ) : null,
        modalRoot
      )
    : null
})

export default Modal
