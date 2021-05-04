import each from 'lodash/each'
import tinycolor from 'tinycolor2'

const calculateChange = (e, hsl, container) => {
  const { width: containerWidth, height: containerHeight } = container.getBoundingClientRect()
  const x = typeof e.pageX === 'number' ? e.pageX : e.touches[0].pageX
  const y = typeof e.pageY === 'number' ? e.pageY : e.touches[0].pageY
  let left = x - (container.getBoundingClientRect().left + window.pageXOffset)
  let top = y - (container.getBoundingClientRect().top + window.pageYOffset)

  if (left < 0) {
    left = 0
  } else if (left > containerWidth) {
    left = containerWidth
  }

  if (top < 0) {
    top = 0
  } else if (top > containerHeight) {
    top = containerHeight
  }

  const saturation = left / containerWidth
  const bright = 1 - (top / containerHeight)

  return {
    h: hsl.h,
    s: saturation,
    v: bright,
    a: hsl.a,
    source: 'rgb',
  }
}

const checkboardCache = {}

const render = (c1, c2, size, ServerCanvas) => {
  if (typeof document === 'undefined' && !ServerCanvas) {
    return null
  }
  const canvas = ServerCanvas ? new ServerCanvas() : document.createElement('canvas')
  canvas.width = size * 2
  canvas.height = size * 2
  const ctx = canvas.getContext('2d')
  if (!ctx) {
    return null
  } // If no context can be found, return early.
  ctx.fillStyle = c1
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = c2
  ctx.fillRect(0, 0, size, size)
  ctx.translate(size, size)
  ctx.fillRect(0, 0, size, size)
  return canvas.toDataURL()
}

const get = (c1, c2, size, serverCanvas) => {
  const key = `${ c1 }-${ c2 }-${ size }${ serverCanvas ? '-server' : '' }`

  if (checkboardCache[key]) {
    return checkboardCache[key]
  }

  const checkboard = render(c1, c2, size, serverCanvas)
  checkboardCache[key] = checkboard
  return checkboard
}

const calculateSlider = (e, direction, hsl, container) => {
  const containerWidth = container.clientWidth
  const containerHeight = container.clientHeight
  const x = typeof e.pageX === 'number' ? e.pageX : e.touches[0].pageX
  const y = typeof e.pageY === 'number' ? e.pageY : e.touches[0].pageY
  const left = x - (container.getBoundingClientRect().left + window.pageXOffset)
  const top = y - (container.getBoundingClientRect().top + window.pageYOffset)

  if (direction === 'vertical') {
    let h
    if (top < 0) {
      h = 359
    } else if (top > containerHeight) {
      h = 0
    } else {
      const percent = -((top * 100) / containerHeight) + 100
      h = ((360 * percent) / 100)
    }

    if (hsl.h !== h) {
      return {
        h,
        s: hsl.s,
        l: hsl.l,
        a: hsl.a,
        source: 'rgb',
      }
    }
  } else {
    let h
    if (left < 0) {
      h = 0
    } else if (left > containerWidth) {
      h = 359
    } else {
      const percent = (left * 100) / containerWidth
      h = ((360 * percent) / 100)
    }

    if (hsl.h !== h) {
      return {
        h,
        s: hsl.s,
        l: hsl.l,
        a: hsl.a,
        source: 'rgb',
      }
    }
  }
  return null
}

const calculateAlpha = (e, hsl, direction, initialA, container) => {
  const containerWidth = container.clientWidth
  const containerHeight = container.clientHeight
  const x = typeof e.pageX === 'number' ? e.pageX : e.touches[0].pageX
  const y = typeof e.pageY === 'number' ? e.pageY : e.touches[0].pageY
  const left = x - (container.getBoundingClientRect().left + window.pageXOffset)
  const top = y - (container.getBoundingClientRect().top + window.pageYOffset)

  if (direction === 'vertical') {
    let a
    if (top < 0) {
      a = 0
    } else if (top > containerHeight) {
      a = 1
    } else {
      a = Math.round((top * 100) / containerHeight) / 100
    }

    if (hsl.a !== a) {
      return {
        h: hsl.h,
        s: hsl.s,
        l: hsl.l,
        a,
        source: 'rgb',
      }
    }
  } else {
    let a
    if (left < 0) {
      a = 0
    } else if (left > containerWidth) {
      a = 1
    } else {
      a = Math.round((left * 100) / containerWidth) / 100
    }

    if (initialA !== a) {
      return {
        h: hsl.h,
        s: hsl.s,
        l: hsl.l,
        a,
        source: 'rgb',
      }
    }
  }
  return null
}

const simpleCheckForValidColor = (data) => {
  const keysToCheck = ['r', 'g', 'b', 'a', 'h', 's', 'l', 'v']
  let checked = 0
  let passed = 0
  each(keysToCheck, (letter) => {
    if (data[letter]) {
      checked += 1
      if (!isNaN(data[letter])) {
        passed += 1
      }
      if (letter === 's' || letter === 'l') {
        const percentPatt = /^\d+%$/
        if (percentPatt.test(data[letter])) {
          passed += 1
        }
      }
    }
  })
  return (checked === passed) ? data : false
}

const toState = (data, oldHue) => {
  const color = data.hex ? tinycolor(data.hex) : tinycolor(data)
  const hsl = color.toHsl()
  const hsv = color.toHsv()
  const rgb = color.toRgb()
  const hex = color.toHex()
  if (hsl.s === 0) {
    hsl.h = oldHue || 0
    hsv.h = oldHue || 0
  }
  const transparent = hex === '000000' && rgb.a === 0

  return {
    hsl,
    hex: transparent ? 'transparent' : `#${ hex }`,
    rgb,
    hsv,
    oldHue: data.h || oldHue || hsl.h,
    source: data.source,
  }
}

export { calculateChange, get, calculateSlider, calculateAlpha, toState, simpleCheckForValidColor }