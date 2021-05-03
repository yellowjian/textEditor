import { forwardRef, Fragment, useState, useEffect, useRef } from 'react'
import cx from 'classnames'
import Saturation from './saturation'
import Hue from './hue'
import Alpha from './alpha'
import ChromeFields from './chromeFields'
import { get } from './utils'
import ColorWrap from './colorWrap'

const ColorPicker = forwardRef((props, ref) => {
  const { width = 225, className, onChange, hsv, hsl, rgb,
    hex = '#22194d', renderers = {}, defaultView, disableAlpha = false } = props
  const pickerClass = cx('color-picker', className)
  // const [hsv, setHsv] = useState({h: 249.99999999999994, s: 0.6666666666666667, v: 0.30000000000000004, a: 1})
  // const [hsl, setHsl] = useState({h: 249.99999999999994, s: 0.5000000000000001, l: 0.2, a: 1})
  // const [rgb, setRgb] = useState({r: 34, g: 25, b: 77, a: 1})
  // const onHsvChange = (data) => {
  //   onChange()
  //   setHsv({
  //     h: data.h,
  //     s: data.s,
  //     v: data.v,
  //     a: data.a
  //   })
  // }
  // const onHslChange = (data) => {
  //   onChange()
  //   setHsl({
  //     h: data.h,
  //     s: data.s,
  //     l: data.l,
  //     a: data.a
  //   })
  // }
  // const onRgbChange = (data) => {
  //   onChange()
  //   setRgb({
  //     r: rgb.r,
  //     g: rgb.g,
  //     b: rgb.b,
  //     a: data.a
  //   })
  // }

  return (
    <div className={pickerClass}>
      <div className='saturation'>
        <Saturation hsl={ hsl } hsv={ hsv } onChange={ onChange }/>
      </div>
      <div className='picker-body'>
        <div className='flexbox-fix'>
          <div className='color'>
            <div className='swatch'>
              <div className='active' style={{ background: `rgba(${ rgb.r }, ${ rgb.g }, ${ rgb.b }, ${ rgb.a })` }}/>
              <div className='checkboard' style={{ background: `url(${ get('transparent', 'rgba(0,0,0,.08)', 8, renderers.canvas) }) center left` }}></div>
            </div>
          </div>
          <div className='slider'>
            <div className='hue'>
              <Hue
                hsl={ hsl }
                onChange={ onChange }
              />
            </div>
            <div className='alpha'>
              <Alpha
                rgb={ rgb }
                hsl={ hsl }
                renderers={ renderers }
                onChange={ onChange }
              />
            </div>
          </div>
        </div>
        <ChromeFields
          rgb={ rgb }
          hsl={ hsl }
          hex={ hex }
          initView={ defaultView }
          onChange={ onChange }
          disableAlpha={ disableAlpha }
        />
      </div>
    </div>
  )
})

export default ColorWrap(ColorPicker)