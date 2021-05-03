import { forwardRef, useEffect, useRef, } from 'react'
import { calculateSlider } from './utils'

const Hue = forwardRef((props, ref) => {
  const { hsl, onChange, direction = 'horizontal'} = props
  const sliderRef = useRef()


  useEffect(()=>{
    return ()=>{
      unbindEventListeners()
    }
  }, [])

  const handleChange = (e) => {
    const change = calculateSlider(e, direction, hsl, sliderRef.current)
    change && onChange(change, e)
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
    <div className='hue-content'>
      <div
        className={`hue-${ direction }`}
        ref={ sliderRef }
        onMouseDown={ handleMouseDown }
        onTouchMove={ handleChange }
        onTouchStart={ handleChange }
      >
        <div className='pointer' style={{ left: `${ (hsl.h * 100) / 360 }%` }}>
          <div className='circle' />
        </div>
      </div>
    </div>
  )
})

export default Hue