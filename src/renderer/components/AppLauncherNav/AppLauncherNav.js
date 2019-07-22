import React from 'react'
import { Route, Switch } from 'react-router-dom'
import env from '@/env'
import Link from '@/components/Link'
import css from './AppLauncherNav.scss'

/**
 * A view with a button to return to the root app.
 *
 * Renders the AppLauncherNav when an app is loaded in the main window.
 * Renders nothing when the app is loaded in a new window.
 * Renders nothing when the AppLauncher app is loaded.
 */
export default function AppLauncherNav() {
  if (!env.isMainWindow) {
    return null
  }
  return (
    <Switch>
      <Route exact path="/" render={null} />
      <Route
        render={() => (
          <div className={css.AppLauncherNav}>
            <Link to="/" with={'button'}>
              Back to AppLauncher
            </Link>
          </div>
        )}
      />
    </Switch>
  )
}
