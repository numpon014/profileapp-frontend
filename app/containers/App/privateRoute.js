import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { isAuthenticated } from '../../utils/httpClient';

function PrivateRoute({ children, ...rest }) {
  const isAuth = isAuthenticated();

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuth ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

PrivateRoute.propTypes = {
  children: PropTypes.object,
  isAuthenticated: PropTypes.bool,
};

export default PrivateRoute;
