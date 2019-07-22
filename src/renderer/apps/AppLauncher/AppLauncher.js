import { hot } from 'react-hot-loader/root'
import React from 'react'

import Link from '@/components/Link'
import css from './AppLauncher.scss'

function AppLauncher() {
  return (
    <div className={css.AppLauncher}>
      <h1>AppLauncher</h1>
      <nav>
        <Link to="/demo">Demo</Link>
        <Link to="/demo" target="_blank">
          Demo (new window)
        </Link>
      </nav>
    </div>
  )
}

export default hot(AppLauncher)
