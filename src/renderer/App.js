import React from 'react'
import { Route } from 'react-router-dom'

import AppShell from './AppShell'

export default function App() {
  return (
    <AppShell>
      <Route
        exact
        path="/"
        component={React.lazy(() => import('@/apps/AppLauncher'))}
      />
      <Route
        path="/demo"
        component={React.lazy(() => import('@/apps/DemoApp'))}
      />
    </AppShell>
  )
}
