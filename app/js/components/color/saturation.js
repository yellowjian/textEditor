import { forwardRef, useEffect, useRef, } from 'react'
import throttle from 'lodash/throttle'
import { calculateChange } from './utils'

const Saturation = forwardRef((props, ref) => {
  const { hsl, onChange, hsv } = props
  const saturationRef = useRef()
  const saturationThrottle = throttle((fn, data, e) => {
    fn(data, e)
  }, 50)

  useEffect(()=>{
    return ()=>{
      saturationThrottle.cancel()
      unbindEventListeners()
    }
  }, [])

  const handleChange = (e) => {
    saturationThrottle(
      onChange,
      calculateChange(e, hsl, saturationRef.current),
      e,
    )
  }

  const handleMouseUp = () => {
    unbindEventListeners()
  }
  
  const handleMouseDown = (e) => {
    handleChange(e)
    window.addEventListener('mousemove', handleChange)
    window.addEventListener('mouseup', handleMouseUp)
  }

  const unbindEventListeners = () => {
    window.removeEventListener('mousemove', handleChange)
    window.removeEventListener('mouseup', handleMouseUp)
  }

  return (
    <div
      className='saturation-content'
      ref={ saturationRef }
      onMouseDown={ handleMouseDown }
      onTouchMove={ handleChange }
      onTouchStart={ handleChange }
    >
      <div className="white">
        <div className="black" />
        <div className='pointer' style={{ top: `${ -(hsv.v * 100) + 100 }%`, left: `${ hsv.s * 100 }%`}}>
          <div className='circle' />
        </div>
      </div>
    </div>
  )
})

export default Saturation