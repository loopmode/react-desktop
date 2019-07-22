import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { Link as RouterLink } from 'react-router-dom'

function Link({ href, to, with: ChildWrapper, children, ...props }) {
  return (
    <RouterLink
      rel="noopener noreferrer"
      className={cx(props.className, 'Link')}
      to={to || href}
      {...props}
    >
      {ChildWrapper ? <ChildWrapper>{children}</ChildWrapper> : children}
    </RouterLink>
  )
}
Link.propTypes = {
  children: PropTypes.node,
  with: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  to: PropTypes.any,
  href: PropTypes.string,
  className: PropTypes.string
}

export default React.memo(Link)
