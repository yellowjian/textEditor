import React, { useState, useEffect } from 'react'
import { render } from 'react-dom'
import { connect, Provider } from 'react-redux'
import Actions from './action'
import ThemeContext from './hooks/themeContext'
import THEMECONFIG from './utils/themeConstants'
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
