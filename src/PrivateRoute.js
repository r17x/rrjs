import React from 'react'
import PropTypes from 'prop-types'
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
  component: PropTypes.func.isRequired,
  topathname: PropTypes.string.isRequired,
  location: PropTypes.string,
}

export default withCookies(PrivateRoute)
