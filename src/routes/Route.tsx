import React, { ComponentType } from 'react';
import {
  Route as ReactDOMRoute,
  RouteProps as ReactDOMRouteProps,
  Redirect,
} from 'react-router-dom';

import { useAuth } from '../hooks/auth';

interface RouteProps extends ReactDOMRouteProps {
  isPublic?: boolean;
  component: ComponentType;
}

const Route: React.FC<RouteProps> = ({
  isPublic = false,
  component: Component,
  ...rest
}) => {
  const { user } = useAuth();

  return (
    <ReactDOMRoute
      {...rest}
      render={({ location }) => {
        return isPublic === !user ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: isPublic ? '/dashboard' : '/',
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default Route;
