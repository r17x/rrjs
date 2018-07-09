import React from 'react'
import {
    string,
    func,
}from 'prop-types'

import {Route, Redirect} from 'react-router-dom'

import {withCookies} from 'react-cookie'

const PrivateRoute = ({
  component: Component,
  topathname: Topathname,
  ...rest
}) => {
  return (
    <Route {...rest}
      render={ (props) => {
        const {user} = rest.allCookies
        return user && user.isAuth ? (<Component {...props} />) :
          ( <Redirect
            to={{
              pathname: Topathname,
              state: {from: props.location},
            }}
          />)
      }
      }
    />
  )
}

PrivateRoute.propTypes = {
  component: func.isRequired,
  topathname: string.isRequired,
  location: string,
}

export default withCookies(PrivateRoute)
