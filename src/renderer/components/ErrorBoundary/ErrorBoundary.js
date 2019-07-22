import React from 'react'
import { PropTypes } from 'prop-types'

export default class ErrorBoundary extends React.Component {
  static propTypes = {
    children: PropTypes.node
  }
  constructor(props) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { error }
  }

  componentDidCatch(/* error, info */) {
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, info)
    // TODO: write to file if env var specified?
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: 20 }}>
          <h1>Something went wrong.</h1>
          <code>
            <pre>{this.state.error.stack}</pre>
          </code>
        </div>
      )
    }

    return this.props.children
  }
}
