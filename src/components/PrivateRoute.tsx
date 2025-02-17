import React from 'react';
import { Route, Redirect } from 'react-router-dom';

interface PrivateRouteProps {
  isAuthenticated: boolean;
  exact: boolean;
  path: string;
  children: React.ReactNode; // Ensure children prop is defined here
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ isAuthenticated, children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() =>
        isAuthenticated ? children : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;
