import { forwardRef, useEffect, useRef, useState } from 'react'
import { calculateAlpha } from './utils'

const ChromeFields = forwardRef((props, ref) => {
  const { hsl, onChange, direction, renderers = {}, initView = 'hex' } = props
  const alphaRef = useRef()
  const [view, setView] = useState('')

  useEffect(()=>{
    if(hsl.a != 1 && initView == "hex") {
      setView('rgb')
    } else {
      setView(initView)
    }
  }, [])

  useEffect(()=>{
    if(hsl.a != 1 && view == "hex") {
      setView('rgb')
    } 
  }, [hsl.a])

  const toggleViews = () => {
    if (this.state.view === 'hex') {
      this.setState({ view: 'rgb' })
    } else if (this.state.view === 'rgb') {
      this.setState({ view: 'hsl' })
    } else if (this.state.view === 'hsl') {
      if (this.props.hsl.a === 1) {
        this.setState({ view: 'hex' })
      } else {
        this.setState({ view: 'rgb' })
      }
    }
  }
  // let fields
  // if (this.state.view === 'hex') {
  //   fields = (<div style={ styles.fields } className="flexbox-fix">
  //     <div style={ styles.field }>
  //       <EditableInput
  //         style={{ input: styles.input, label: styles.label }}
  //         label="hex" value={ this.props.hex }
  //         onChange={ this.handleChange }
  //       />
  //     </div>
  //   </div>)
  // } else if (this.state.view === 'rgb') {
  //   fields = (<div style={ styles.fields } className="flexbox-fix">
  //     <div style={ styles.field }>
  //       <EditableInput
  //         style={{ input: styles.input, label: styles.label }}
  //         label="r"
  //         value={ this.props.rgb.r }
  //         onChange={ this.handleChange }
  //       />
  //     </div>
  //     <div style={ styles.field }>
  //       <EditableInput
  //         style={{ input: styles.input, label: styles.label }}
  //         label="g"
  //         value={ this.props.rgb.g }
  //         onChange={ this.handleChange }
  //       />
  //     </div>
  //     <div style={ styles.field }>
  //       <EditableInput
  //         style={{ input: styles.input, label: styles.label }}
  //         label="b"
  //         value={ this.props.rgb.b }
  //         onChange={ this.handleChange }
  //       />
  //     </div>
  //     <div style={ styles.alpha }>
  //       <EditableInput
  //         style={{ input: styles.input, label: styles.label }}
  //         label="a"
  //         value={ this.props.rgb.a }
  //         arrowOffset={ 0.01 }
  //         onChange={ this.handleChange }
  //       />
  //     </div>
  //   </div>)
  // } else if (this.state.view === 'hsl') {
  //   fields = (<div style={ styles.fields } className="flexbox-fix">
  //     <div style={ styles.field }>
  //       <EditableInput
  //         style={{ input: styles.input, label: styles.label }}
  //         label="h"
  //         value={ Math.round(this.props.hsl.h) }
  //         onChange={ this.handleChange }
  //       />
  //     </div>
  //     <div style={ styles.field }>
  //       <EditableInput
  //         style={{ input: styles.input, label: styles.label }}
  //         label="s"
  //         value={ `${ Math.round(this.props.hsl.s * 100) }%` }
  //         onChange={ this.handleChange }
  //       />
  //     </div>
  //     <div style={ styles.field }>
  //       <EditableInput
  //         style={{ input: styles.input, label: styles.label }}
  //         label="l"
  //         value={ `${ Math.round(this.props.hsl.l * 100) }%` }
  //         onChange={ this.handleChange }
  //       />
  //     </div>
  //     <div style={ styles.alpha }>
  //       <EditableInput
  //         style={{ input: styles.input, label: styles.label }}
  //         label="a"
  //         value={ this.props.hsl.a }
  //         arrowOffset={ 0.01 }
  //         onChange={ this.handleChange }
  //       />
  //     </div>
  //   </div>)
  // }
  return (
    <div className="flexbox-fix">
      <div>
        <div onClick={ toggleViews }>
        </div>
      </div>
    </div>
  )
})

export default ChromeFields