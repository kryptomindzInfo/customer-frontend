import React from 'react';
import { Redirect, Route } from 'react-router-dom';

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem('customerLogged');
  return (
    <Route
      {...rest}
      render={props => {
        if (token) {
          return <Component {...rest} {...props} />;
        }
        return (
          <Redirect
            to={{
              pathname: '/',
              state: {
                from: props.location,
              },
            }}
          />
        );
      }}
    />
  );
};
