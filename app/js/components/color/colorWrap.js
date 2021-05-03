import React, { forwardRef, useState, useEffect } from 'react'
import { simpleCheckForValidColor, toState } from './utils'


function ColorWrap(Picker) {
  return forwardRef((props, ref) => {
    const { color = { h: 250, s: 0.50, l: 0.20, a: 1,}, onChange } = props
    const [initColor, setInitColor] = useState(toState(color, 0))
    useEffect(() => {
      setInitColor({
        ...toState(color, initColor.oldHue)
      })
    }, [color])

    const handleChange = (data, event) => {
      const isValidColor = simpleCheckForValidColor(data)
      if (isValidColor) {
        const colors = toState(data, data.h || initColor.oldHue)
        setInitColor(colors)
      }
    }


    return (
      <Picker
        { ...props }
        { ...initColor }
        onChange={(data, event) => handleChange(data, event) }
      /> 
    )
  })
}
export default ColorWrap
