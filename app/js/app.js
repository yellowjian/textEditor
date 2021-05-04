import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './stores/configureStore'
import IndexView from './container/indexView'
require('./font/iconfont')
import './utils/polyfill'

const store = configureStore()

function App() {
  return (
    <Provider store={store}>
      <IndexView />
    </Provider>
  )
}

render(<App />, document.getElementById('root'))
