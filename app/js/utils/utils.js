import cssVar from './cssVar'

const isLocal = () => {
  return !!process.env.isLocal
}

const getCSS = value => {
  return cssVar[value]
}

export { isLocal, getCSS }
