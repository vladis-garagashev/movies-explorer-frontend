import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AppContext } from '../../contexts/AppContext';

const ProtectedRoute = ({ component: Component, ...props }) => {
  const value = useContext(AppContext);
  return (
    <Route>
      {() =>
        value.loggedIn === true ? (
          <Component {...props} />
        ) : (
          <Redirect expact to="/" />
        )
      }
    </Route>
  );
};

export default ProtectedRoute;
