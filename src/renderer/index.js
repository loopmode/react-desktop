import './globals'
import './index.css'

import React from 'react'
import ReactDOM from 'react-dom'

import history from './history'
import App from './App'
import { RESTART } from './utils/restart'

const rootElement = document.getElementById('app')

function renderApp() {
  ReactDOM.render(<App />, rootElement)
}

function restartApp(options = {}) {
  // a place to
  // - abort pending requests/operations
  // - clean up stores
  // - flush caches
  ReactDOM.unmountComponentAtNode(rootElement)
  history.push({
    pathname: options.pathname || '/',
    search: options.pathname,
    hash: options.hash
  })
  renderApp()
}
window.addEventListener(RESTART, restartApp)

// initialize when ready
window.addEventListener('DOMContentLoaded', renderApp)
