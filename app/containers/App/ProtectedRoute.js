import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const token = localStorage.getItem('customerLogged');
const onboardingStatus = localStorage.getItem('onBoardingStatus');
export const ProtectedRoute = ({ component: Component, ...rest }) => (
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
