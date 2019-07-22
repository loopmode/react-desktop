import React from 'react'
import { hot } from 'react-hot-loader/root'

import Link from '@/components/Link'
import css from './DemoApp.scss'

// Note the usage of this util.
// It helps use images via http in development and via file path in production
import staticPath from '@/utils/staticPath'

// Example of how to use and unuse global styles (if you really must use global styles...)
import useGlobalStyles from './useGlobalStyles'

function DemoApp() {
  useGlobalStyles()
  return (
    <div className={css.App}>
      <header className="App-header">
        <img
          src={staticPath('./react.svg')}
          className="App-logo react-logo"
          alt="react-logo logo"
        />
        <img
          src={staticPath('electron.png')}
          className="App-logo electron-logo"
          alt="electron logo"
        />
      </header>
      <p>
        Edit <code>src/renderer/App.js</code> and save to reload.
      </p>
      <p>
        <Link href="https://reactjs.org">Learn React</Link>
      </p>
      <p>
        <Link href="https://webpack.electron.build/">
          Learn Electron webpack
        </Link>
      </p>
    </div>
  )
}

export default hot(DemoApp)
