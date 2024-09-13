import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useCurrentUser } from "../contexts/CurrentUserContext"; // Adjust the import path as necessary

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const currentUser = useCurrentUser();

  return (
    <Route
      {...rest}
      render={(props) =>
        currentUser ? (
          <Component {...props} />
        ) : (
          <Redirect to="/signin" /> // Redirect to the sign-in page or another route
        )
      }
    />
  );
};

export default ProtectedRoute;
