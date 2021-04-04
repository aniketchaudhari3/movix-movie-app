import React from 'react'
import { useAuth } from '../context/authContext'
import { Redirect, Route, useHistory } from 'react-router-dom'

export default function PublicRoute({ component: Component, ...restProps }) {
  const history = useHistory()
  const { currentUser } = useAuth()

  return (
    <Route
      {...restProps}
      render={props => {
        return currentUser ?
          <Redirect to="/profile" />
          : <Component {...props} />
      }}
    />
  )
}
