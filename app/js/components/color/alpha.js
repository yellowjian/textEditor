import { forwardRef, useEffect, useRef } from 'react'
import { calculateAlpha, get } from './utils'

const Alpha = forwardRef(props => {
  const { hsl, onChange, direction = 'horizontal', a, rgb, renderers = {} } = props
  const alphaRef = useRef()


  useEffect(()=>{
    return ()=>{
      unbindEventListeners()
    }
  }, [])

  const handleChange = (e) => {
    const change = calculateAlpha(e, hsl, direction, a, alphaRef.current)
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
    <div className='alpha-content'>
      <div className='checkboard' style={{ background: `url(${ get('transparent', 'rgba(0,0,0,.08)', 8, renderers.canvas) }) center left` }}></div>
      <div className='gradient' style={{ background: `linear-gradient(to right, rgba(${ rgb.r },${ rgb.g },${ rgb.b }, 0) 0%,
           rgba(${ rgb.r },${ rgb.g },${ rgb.b }, 1) 100%)`}}>
        <div
          className='gradient-content'
          ref={ alphaRef }
          onMouseDown={ handleMouseDown }
          onTouchMove={ handleChange }
          onTouchStart={ handleChange }
        >
          <div className='pointer' style={{ left: `${ rgb.a * 100 }%` }}>
            <div className='circle' />
          </div>
        </div>
      </div>
    </div>
  )
})

export default Alpha