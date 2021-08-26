import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AppContext } from '../../contexts/AppContext';

const ProtectedRoute = ({ component: Component, ...props }) => {
  const {loggedIn} = useContext(AppContext);
  return (
    <Route>
      {() =>
        loggedIn === true ? (
          <Component {...props} />
        ) : (
          <Redirect exact to="/" />
        )
      }
    </Route>
  );
};

export default ProtectedRoute;
