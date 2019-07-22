import React from 'react'
import { hot } from 'react-hot-loader/root'
import { Router } from 'react-router-dom'
import { PropTypes } from 'prop-types'

import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'
import history from './history'

const AppLauncherNav = React.lazy(() => import('@/components/AppLauncherNav'))

function AppShell({ children }) {
  return (
    <ErrorBoundary>
      <React.Suspense fallback={null}>
        <Router history={history}>
          <AppLauncherNav />
          {children}
        </Router>
      </React.Suspense>
    </ErrorBoundary>
  )
}
AppShell.propTypes = {
  children: PropTypes.node
}

export default hot(AppShell)
