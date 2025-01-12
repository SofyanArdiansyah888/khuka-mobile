import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

interface PrivateRouteProps extends RouteProps {
  isAuthenticated: boolean;
  component: React.ComponentType<any>; // Ensure this is correctly typed
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  isAuthenticated,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} /> // Render the protected component
        ) : (
          <Redirect to="/login" /> // Redirect to login if not authenticated
        )
      }
    />
  );
};

export default PrivateRoute;
