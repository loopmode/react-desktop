/**
 * This is an example of how to use the `usable` feature of style-loader to "unmount" stylesheets.
 * It may beuseful or necessary if you need to load global stylesheets for an app, but
 * you need to unload them again when your app is unmounted.
 *
 * See https://webpack.js.org/concepts/loaders/#inline
 * See https://github.com/webpack-contrib/style-loader#useable
 */

import React from 'react'
import globalStyles from '!!style-loader/useable!css-loader!./global-styles.css'

export default function useGlobalStyles() {
  React.useEffect(() => {
    globalStyles.use()
    return () => globalStyles.unuse()
  }, [])
}
