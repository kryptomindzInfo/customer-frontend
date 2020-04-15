import React from 'react';
import { Redirect, Route } from 'react-router-dom';

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem('customerLogged');
  const user = JSON.parse(localStorage.getItem('loggedUser'));
  return (
    <Route
      {...rest}
      render={props => {
        if (token) {
          if (props.path === '/dashboard') {
            if (user.status === 1) {
              return <Component {...rest} {...props} />;
            }

            <Redirect
              to={{
                pathname: '/user-verification',
                state: {
                  from: props.location,
                },
              }}
            />;
          }
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
